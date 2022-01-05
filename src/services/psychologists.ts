import { Psychologist } from "../../types/psychologist";
import { models } from "../db/models";

export const getAll = async () => {
  return models.Psychologist.findAll({ raw: true });
};

export const saveMany = async (psychologists: Psychologist[]) => {
  return models.Psychologist.bulkCreate(psychologists);
};
