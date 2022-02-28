import Sequelize, { Op } from "sequelize";

import { models } from "../db/models";
import { SRID } from "../types/const/geometry";
import { FILTER } from "../types/enums/filters";
import { Psychologist } from "../types/psychologist";
import getAddressCoordinates from "./getAddressCoordinates";

export const getOne = async (id: string): Promise<Psychologist> => {
  // @ts-ignore
  return models.Psychologist.findOne({
    raw: true,
    where: { archived: false, id },
  });
};

export const getByInstructor = async (
  group: string
): Promise<Psychologist[]> => {
  // @ts-ignore
  return models.Psychologist.findAll({
    raw: true,
    where: { archived: false, instructorId: group },
  });
};

export const countAll = async () =>
  models.Psychologist.count({ where: { archived: false, visible: true } });

const DEFAULT_PAGE_SIZE = 50;
export const getAll = async (filters: {
  [key in FILTER]?: string | string[];
}): Promise<Psychologist[]> => {
  const query: Sequelize.FindOptions<any> = {
    limit: DEFAULT_PAGE_SIZE,
    offset:
      parseInt(filters[FILTER.PAGE_INDEX] as string, 10) * DEFAULT_PAGE_SIZE,
    raw: true,
    where: { archived: false, visible: true },
  };
  const where: any = {};
  if (filters[FILTER.TELECONSULTATION]) {
    where.teleconsultation = true;
  }

  if (filters[FILTER.PUBLIC]) {
    where.public = {
      [Op.or]: [filters[FILTER.PUBLIC], "Adultes et enfants/adolescents"],
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

  query.where = where;
  //@ts-ignore
  return models.Psychologist.findAll(query);
};

export const saveMany = async (psychologists: Psychologist[]) => {
  //@ts-ignore
  return models.Psychologist.bulkCreate(psychologists);
};

export const update = async (
  id: string,
  psychologist: Partial<Psychologist>
) => {
  const coordinates = await getAddressCoordinates(psychologist.address);
  return models.Psychologist.update(
    {
      address: psychologist.address,
      cdsmsp: psychologist.cdsmsp,
      coordinates: coordinates
        ? {
            coordinates: [coordinates.longitude, coordinates.latitude],
            type: "POINT",
          }
        : null,
      displayEmail: psychologist.displayEmail,
      email: psychologist.email,
      firstName: psychologist.firstName,
      languages: psychologist.languages,
      lastName: psychologist.lastName,
      phone: psychologist.phone,
      public: psychologist.public,
      teleconsultation: psychologist.teleconsultation,
      visible: psychologist.visible,
      website: psychologist.website,
    },
    { where: { id } }
  );
};

export const updateState = async (newStates: Partial<Psychologist>[]) => {
  return Promise.all(
    newStates.map((newState) =>
      models.Psychologist.update(
        {
          archived: newState.archived,
        },
        { where: { id: newState.id } }
      )
    )
  );
};
