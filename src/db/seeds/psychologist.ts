import { faker } from "@faker-js/faker";

import { allPublics } from "../../types/enums/public";
import { Psychologist } from "../../types/psychologist";

export const groups = [
  { id: "01", label: "01 - Ain" },
  { id: "02", label: "02 - Aisne" },
  { id: "03", label: "03 - Allier" },
  { id: "04", label: "04 - Alpes de Haute Provence" },
  { id: "05", label: "05 - Hautes-Alpes" },
  { id: "06", label: "06 - Alpes Maritimes" },
  { id: "31", label: "31 - Haute-Garonne" },
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
  const instructor = faker.helpers.arrayElement(groups);

  return {
    address: `${faker.address.streetAddress()} ${faker.address.zipCode(
      "#####"
    )} ${faker.address.city()}`,
    addressAdditional: faker.datatype.string(10),
    secondAddress: `${faker.address.streetAddress()} ${faker.address.zipCode(
      "#####"
    )} ${faker.address.city()}`,
    secondAddressAdditional: faker.datatype.string(10),
    archived: false,
    cdsmsp: faker.lorem.word(5),
    coordinates: {
      coordinates: [
        parseFloat(faker.address.longitude(4, -4)),
        parseFloat(faker.address.latitude(50, 40)),
      ],
      crs: { properties: { name: "EPSG:4326" }, type: "name" },
      type: "POINT",
    },
    secondAddressCoordinates: {
      coordinates: [
        parseFloat(faker.address.longitude(4, -4)),
        parseFloat(faker.address.latitude(50, 40)),
      ],
      crs: { properties: { name: "EPSG:4326" }, type: "name" },
      type: "POINT",
    },
    department: instructor.id,
    displayPhone: faker.datatype.boolean(),
    displayEmail: faker.datatype.boolean(),
    email: faker.internet.exampleEmail(),
    firstName: faker.name.firstName(),
    id: faker.datatype.number({ max: 2147483647 }),
    adeliId: faker.phone.phoneNumber("## ## ## ## ##"),
    languages: faker.helpers.arrayElement(languages),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber("0# ## ## ## ##"),
    public: faker.helpers.arrayElement(allPublics),
    state: "accepte",
    teleconsultation: faker.datatype.boolean(),
    visible: true,
    website: faker.helpers.arrayElement([
      faker.internet.domainName(),
      faker.internet.url(),
    ]),
    ...override,
  };
};
