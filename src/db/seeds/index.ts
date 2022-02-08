import faker from "faker";

import { SRID } from "../../types/const/geometry";
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
      cdsmsp: faker.lorem.word(5),
      coordinates: {
        coordinates: [
          parseFloat(faker.address.longitude(4, -4)),
          parseFloat(faker.address.latitude(50, 40)),
        ],
        // @ts-ignore
        crs: { properties: { name: `EPSG:${SRID}` }, type: "name" },
        type: "POINT",
      },
      displayEmail: faker.datatype.boolean(),
      email: faker.internet.exampleEmail(),
      firstName: faker.name.firstName(),
      id: i,
      instructorId: faker.datatype.uuid(),
      languages: faker.lorem.word(1),
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumber("0# ## ## ## ##"),
      public: faker.random.arrayElement([
        "Adultes",
        "Adultes et enfants/adolescents",
        "Enfants/adolescents",
      ]),
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
