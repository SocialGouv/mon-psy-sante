import { models } from "../db/models";
import { Psychologist } from "../types/psychologist";

export const getAll = async () => {
  return models.Psychologist.findAll({ raw: true });
};

export const saveMany = async (psychologists: Psychologist[]) => {
  return models.Psychologist.bulkCreate(psychologists);
};
