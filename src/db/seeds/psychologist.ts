// eslint-disable-next-line import/no-named-as-default
import faker from "@faker-js/faker";

import { allPublics } from "../../types/enums/public";
import { Psychologist } from "../../types/psychologist";

export const groupIds = [
  { id: "1", label: "01 - Ain" },
  { id: "2", label: "02 - Aisne" },
  { id: "3", label: "03 - Allier" },
  { id: "4", label: "04 - Alpes de Haute Provence" },
  { id: "5", label: "05 - Hautes-Alpes" },
  { id: "6", label: "06 - Alpes Maritimes" },
];
const languages = [
  "Francais",
  "francais",
  "Français",
  "français",
  "Francais ",
  " Francais",
  "Francais et allemand ",
  "Anglais",
  "",
];

export const getOnePsychologist = (
  override?: Partial<Psychologist>
): Psychologist => {
  const instructor = faker.random.arrayElement(groupIds);

  return {
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
    department: instructor.label,
    displayEmail: faker.datatype.boolean(),
    email: faker.internet.exampleEmail(),
    firstName: faker.name.firstName(),
    id: faker.datatype.number({ max: 2147483647 }),
    instructorId: instructor.id,
    languages: faker.random.arrayElement(languages),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber("0# ## ## ## ##"),
    public: faker.random.arrayElement(allPublics),
    teleconsultation: faker.datatype.boolean(),
    visible: true,
    website: faker.helpers.randomize([
      faker.internet.domainName(),
      faker.internet.url(),
    ]),
    ...override,
  };
};
