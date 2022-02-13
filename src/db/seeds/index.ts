import bcrypt from "bcryptjs";
import faker from "@faker-js/faker";

import { SRID } from "../../types/const/geometry";
import { Psychologist } from "../../types/psychologist";
import { models } from "../models";

const NUMBER_OF_PSYCHOLOGISTS = 1000;

const deleteAll = async () => {
  await models.Psychologist.destroy({ where: {} });
};

const groupIds = [...Array(5).keys()].map(() => faker.datatype.uuid());

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
      instructorId: faker.random.arrayElement(groupIds),
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

  //@ts-ignore
  await models.Psychologist.bulkCreate(psychologists);
};

const createUsers = async () => {
  const salt = await bcrypt.genSalt(10);

  await models.UserAccount.bulkCreate(
    groupIds.map((group, index) => ({
      email: `${index}@test.fr`,
      group,
      password: bcrypt.hashSync(`admin${index}`, salt),
    }))
  );
};

const createAllData = async () => {
  await deleteAll();

  await Promise.all([createPsychologists(), createUsers()]);
};

createAllData();
