import pLimit from "p-limit";
import Sequelize, { Op } from "sequelize";

import { models, sequelize } from "../db/models";
import { SRID } from "../types/const/geometry";
import { FILTER } from "../types/enums/filters";
import { PUBLIC } from "../types/enums/public";
import { Psychologist } from "../types/psychologist";

const limit = pLimit(5);

export const getOne = async (
  id: string,
  dep?: string
): Promise<Psychologist> => {
  // @ts-ignore

  return models.Psychologist.findOne({
    raw: true,
    where: { id, ...(dep ? { department: dep } : {}) },
  });
};
export const getByDepartment = async (dep: string): Promise<Psychologist[]> => {
  // @ts-ignore
  return models.Psychologist.findAll({
    raw: true,
    where: { archived: false, department: dep, state: "accepte" },
    order: [["lastName", "ASC"]],
  });
};

const getDateLatestFor = async (where): Promise<Date> => {
  const psy = await models.Psychologist.findOne({
    attributes: ["created_at", "archived", "state"],
    order: [["created_at", "DESC"]],
    where: where,
  });
  // @ts-ignore
  return psy?.dataValues?.created_at;
};
export const getDateLatestAccepte = async (): Promise<Date> =>
  getDateLatestFor({ state: "accepte", archived: false });

export const getDateLatestArchived = async (): Promise<Date> =>
  getDateLatestFor({ archived: true });

export const countAll = async () =>
  models.Psychologist.count({
    where: { archived: false, state: "accepte" },
  });

const DEFAULT_PAGE_SIZE = 75;
export const getAll = async (filters: {
  [key in FILTER]?: string | string[];
}): Promise<Psychologist[]> => {
  const pageSize = filters[FILTER.PAGE_SIZE]
    ? parseInt(filters[FILTER.PAGE_SIZE] as string, 10)
    : DEFAULT_PAGE_SIZE;

  const pageIndex = filters[FILTER.PAGE_INDEX]
    ? parseInt(filters[FILTER.PAGE_INDEX] as string, 10)
    : 0;

  const where: Sequelize.WhereOptions<Psychologist> = {
    archived: false,
    state: "accepte",
  };
  const query: Sequelize.FindOptions<Psychologist> = {
    limit: pageSize,
    offset: pageIndex * pageSize,
    raw: true,
    where,
  };

  if (filters[FILTER.TELECONSULTATION]) {
    where.teleconsultation = true;
  }

  if (filters[FILTER.PUBLIC]) {
    where.public = {
      [Op.or]: [PUBLIC.ENFANTS, PUBLIC.ADULTES_ADOS_ENFANTS],
    };
  }

  // Search on both psychologists' addresses (via coordinates and second_address_coordinates).
  if (filters[FILTER.LONGITUDE] && filters[FILTER.LATITUDE]) {
    // Get longitude and latitude from filters as `geometry(Point,4326)`.
    const { coordinates } = (await sequelize.query(
      `select ST_SetSRID(ST_MakePoint(:lon,:lat), :srid)::text as coordinates;`,
      {
        replacements: {
          lon: parseFloat(filters[FILTER.LONGITUDE] as string),
          lat: parseFloat(filters[FILTER.LATITUDE] as string),
          srid: SRID,
        },
        type: Sequelize.QueryTypes.SELECT,
        plain: true,
      }
    )) as { coordinates: string };
    // Adds custom attributes about distance to the query (distance and distanceBasedOn)
    query.attributes = {
      include: [
        // Get the nearest address of the psychologist
        // (i.e: choose least distance based on coordinates or second_address_coordinates).
        [
          Sequelize.fn(
            "least",
            Sequelize.fn(
              "ST_Distance",
              Sequelize.col("coordinates"),
              coordinates
            ),
            Sequelize.fn(
              "ST_Distance",
              Sequelize.col("second_address_coordinates"),
              coordinates
            )
          ),
          "distance",
        ],
        // Adds distanceBasedOn in order to know which distance has been prefered
        // (coordinates or second_address_coordinates).
        [
          Sequelize.literal(
            `case
              when second_address_coordinates is null or
                ST_Distance(coordinates, ${sequelize.escape(
                  coordinates
                )}) < ST_Distance(second_address_coordinates, ${sequelize.escape(
              coordinates
            )}) then 'coordinates'
            else 'second_address_coordinates' end`
          ),
          "distanceBasedOn",
        ],
      ],
    };
    query.order = Sequelize.literal("distance ASC");
  }

  //@ts-ignore
  return models.Psychologist.findAll(query);
};

export const saveMany = async (psychologists: Psychologist[]) => {
  //@ts-ignore
  return models.Psychologist.bulkCreate(psychologists, {
    ignoreDuplicates: true,
  });
};
const UPDATABLE_KEYS = [
  "address",
  "addressAdditional",
  "secondAddress",
  "secondAddressAdditional",
  "cdsmsp",
  "coordinates",
  "secondAddressCoordinates",
  "displayEmail",
  "email",
  "firstName",
  "languages",
  "lastName",
  "phone",
  "displayPhone",
  "public",
  "teleconsultation",
  "visible",
  "website",
];

export const filterAllowedKeys = (
  psy: Partial<Psychologist>
): Partial<Psychologist> => {
  return Object.keys(psy)
    .filter((key) => UPDATABLE_KEYS.includes(key))
    .reduce((obj, key) => {
      obj[key] = psy[key];
      return obj;
    }, {});
};
export const update = async (
  id: string,
  psychologist: Partial<Psychologist>
) => {
  return models.Psychologist.update(filterAllowedKeys(psychologist), {
    where: { id },
  });
};

export const updateState = async (newStates: Partial<Psychologist>[]) => {
  return Promise.all(
    newStates.map((newState) =>
      limit(() =>
        models.Psychologist.update(
          {
            archived: newState.archived,
            state: newState.state,
          },
          { where: { id: newState.id } }
        )
      )
    )
  );
};
