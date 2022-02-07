import Sequelize from "sequelize";

import { models } from "../db/models";
import { FILTER } from "../types/enums/filters";
import { Psychologist } from "../types/psychologist";

export const getOne = async (id: string) => {
  return models.Psychologist.findOne({
    raw: true,
    where: { id },
  });
};

export const countAll = async () => models.Psychologist.count();

export const getAll = async (filters: {
  [key in FILTER]?: string | string[];
}): Promise<Psychologist[]> => {
  const query: Sequelize.FindOptions<any> = {
    limit: 10,
    offset: parseInt(filters[FILTER.PAGE_INDEX] as string, 10) * 10,
    raw: true,
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
              4326
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
  return models.Psychologist.bulkCreate(psychologists);
};
