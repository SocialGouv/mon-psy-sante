import pLimit from "p-limit";
import Sequelize, { Op } from "sequelize";

import { models } from "../db/models";
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

const DEFAULT_PAGE_SIZE = 50;
export const getAll = async (filters: {
  [key in FILTER]?: string | string[];
}): Promise<Psychologist[]> => {
  const pageSize = filters[FILTER.PAGE_SIZE]
    ? parseInt(filters[FILTER.PAGE_SIZE] as string, 10)
    : DEFAULT_PAGE_SIZE;

  const pageIndex = filters[FILTER.PAGE_INDEX]
    ? parseInt(filters[FILTER.PAGE_INDEX] as string, 10)
    : 0;

  const where: any = { archived: false, state: "accepte" };
  const query: Sequelize.FindOptions<any> = {
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
      [Op.or]: [filters[FILTER.PUBLIC], PUBLIC.BOTH],
    };
  }

  if (filters[FILTER.LONGITUDE] && filters[FILTER.LATITUDE]) {
    query.attributes = {
      include: [
        [
          Sequelize.fn(
            "ST_Distance",
            Sequelize.col("coordinates"),
            Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn(
                "ST_MakePoint",
                filters[FILTER.LONGITUDE],
                filters[FILTER.LATITUDE]
              ),
              SRID
            )
          ),
          "distance",
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
