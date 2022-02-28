import faker from "@faker-js/faker";

import { Psychologist } from "../../types/psychologist";

export const groupIds = [...Array(5).keys()].map(() => faker.datatype.uuid());

export const getOnePsychologist = (
  override?: Partial<Psychologist>
): Psychologist => ({
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
    crs: { properties: { name: "EPSG:4326" }, type: "name" },
    type: "POINT",
  },
  displayEmail: faker.datatype.boolean(),
  email: faker.internet.exampleEmail(),
  firstName: faker.name.firstName(),
  id: faker.datatype.number(),
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
  visible: true,
  website: faker.helpers.randomize([
    faker.internet.domainName(),
    faker.internet.url(),
  ]),
  ...override,
});
