import faker from "faker";

import { Psychologist } from "../../types/psychologist";
import { models } from "../models";

const NUMBER_OF_PSYCHOLOGISTS = 1000;

const deleteAll = async () => {
  await models.Psychologist.destroy({ where: {} });
};

const createPsychologists = async () => {
  const psychologists: Psychologist[] = [];

  for (let i = 0; i < NUMBER_OF_PSYCHOLOGISTS; i++) {
    psychologists.push({
      address: `${faker.address.streetAddress()} ${faker.address.zipCode(
        "#####"
      )} ${faker.address.city()}`,
      archived: false,
      email: faker.internet.email(),
      emailPro: faker.internet.email(),
      firstName: faker.name.firstName(),
      id: i,
      instructorId: faker.datatype.uuid(),
      languages: faker.lorem.word(1),
      lastName: faker.name.lastName(),
      latitude: parseFloat(faker.address.latitude()),
      longitude: parseFloat(faker.address.longitude()),
      phone: faker.phone.phoneNumber("0# ## ## ## ##"),
      teleconsultation: faker.datatype.boolean(),
      website: faker.helpers.randomize([
        faker.internet.domainName(),
        faker.internet.url(),
      ]),
    });
  }

  await models.Psychologist.bulkCreate(psychologists);
};

const createAllData = async () => {
  await deleteAll();

  await createPsychologists();
};

createAllData();
