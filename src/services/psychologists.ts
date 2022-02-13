import Sequelize from "sequelize";

import { models } from "../db/models";
import { SRID } from "../types/const/geometry";
import { FILTER } from "../types/enums/filters";
import { Psychologist } from "../types/psychologist";

export const getOne = async (id: string) => {
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
  models.Psychologist.count({ where: { archived: false } });

export const getAll = async (filters: {
  [key in FILTER]?: string | string[];
}): Promise<Psychologist[]> => {
  const query: Sequelize.FindOptions<any> = {
    limit: 10,
    offset: parseInt(filters[FILTER.PAGE_INDEX] as string, 10) * 10,
    raw: true,
    where: { archived: false },
  };
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
  return models.Psychologist.bulkCreate(psychologists);
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
