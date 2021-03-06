import { Psychologist } from "../../types/psychologist";
import { models } from "../models";
import { getOnePsychologist } from "./psychologist";

const NUMBER_OF_PSYCHOLOGISTS = 1000;

const deleteAll = async () => {
  await models.Psychologist.destroy({ where: {} });
};

const createPsychologists = async () => {
  const psychologists: Psychologist[] = [];

  for (let i = 0; i < NUMBER_OF_PSYCHOLOGISTS; i++) {
    psychologists.push(getOnePsychologist({ id: i }));
  }

  //@ts-ignore
  await models.Psychologist.bulkCreate(psychologists);
};

const createAllData = async () => {
  await deleteAll();
  await Promise.all([createPsychologists()]).catch((err) => console.error(err));
};

createAllData();
