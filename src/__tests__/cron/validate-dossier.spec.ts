import { validateDossier } from "../../cron/demarchesSimplifiees";
import getAddressCoordinates from "../../services/getAddressCoordinates";
import { AdeliData } from "../../types/adeli";
import { ParsedDSPsychologist } from "../../types/psychologist";

jest.mock("../../services/getAddressCoordinates");

describe("validateDossier", () => {
  const psy: Partial<ParsedDSPsychologist> = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "",
    adeliId: "44123456789",
    department: "44",
  };
  const adeliData: Partial<AdeliData>[] = [
    {
      rowid: "",
      "Nom d'exercice": "Doe",
      "Prénom d'exercice": "John",
      "Code profession": "93",
    },
  ];
  it("should return one error when adeliData is missing", async () => {
    const { errors, valids } = await validateDossier(
      psy as ParsedDSPsychologist,
      []
    );
    expect(errors).toStrictEqual([
      "Pas numéro de sécurité sociale fourni",
      "Adresse principale non reconnue : undefined",
      "Numéro ADELI invalide : 44123456789",
    ]);
    expect(valids).toStrictEqual([
      "Le numéro ADELI 44123456789 correspond au département 44",
    ]);
  });

  it("should return error when department does not match", async () => {
    const { errors, valids } = await validateDossier(
      {
        ...psy,
        department: "35",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );
    expect(errors).toStrictEqual([
      "Le numéro ADELI 44123456789 ne correspond pas au département 35",
      "Pas numéro de sécurité sociale fourni",
      "Adresse principale non reconnue : undefined",
      "L'email renseigné () n'est pas valide",
    ]);
    expect(valids).toStrictEqual(["Numéro ADELI valide : 44123456789"]);
  });

  it("should return error when address is not found", async () => {
    (getAddressCoordinates as jest.MockedFunction<typeof getAddressCoordinates>)
      .mockReset()
      .mockImplementationOnce(async () => {
        return Promise.resolve(null);
      });
    const { errors } = await validateDossier(
      {
        ...psy,
        address: "test",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );

    expect(errors).toStrictEqual([
      "Pas numéro de sécurité sociale fourni",
      "Adresse principale non reconnue : test",
      "L'email renseigné () n'est pas valide",
    ]);
  });

  it("should return error when secondAddress is not found", async () => {
    (getAddressCoordinates as jest.MockedFunction<typeof getAddressCoordinates>)
      .mockReset()
      .mockImplementationOnce(async () => {
        return Promise.resolve({
          latitude: 0,
          longitude: 0,
        });
      })
      .mockImplementationOnce(async () => {
        return Promise.resolve(null);
      });
    const { errors } = await validateDossier(
      {
        ...psy,
        address: "valid",
        secondAddress: "invalid",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );
    expect(getAddressCoordinates).toHaveBeenCalledTimes(2);
    expect(errors).toEqual(
      expect.arrayContaining(["Adresse secondaire non reconnue : invalid"])
    );
    expect(errors).toEqual(
      expect.not.arrayContaining(["Adresse principale non reconnue : valid"])
    );
  });

  it.each`
    input                    | isValid
    ${undefined}             | ${true}
    ${null}                  | ${true}
    ${""}                    | ${true}
    ${"non"}                 | ${false}
    ${"doctolib"}            | ${false}
    ${"doctolib."}           | ${false}
    ${"doctolib. com"}       | ${false}
    ${"doctolib/com"}        | ${false}
    ${"example.org"}         | ${true}
    ${"www.example.org"}     | ${true}
    ${"https://example.org"} | ${true}
    ${"http://example.org"}  | ${true}
    ${"http://EXAMPLE.org"}  | ${true}
  `("should handle website error", async ({ input, isValid }) => {
    const errors = await validateDossier(
      {
        ...psy,
        website: input,
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );
    expect(errors).toEqual(
      (isValid ? expect.not : expect).arrayContaining([
        `Le site web renseigné (${input}) n'est pas valide`,
      ])
    );
  });

  it("should not return error when everything is fine", async () => {
    (getAddressCoordinates as jest.MockedFunction<typeof getAddressCoordinates>)
      .mockReset()
      .mockImplementation(async () => {
        return Promise.resolve({
          latitude: 0,
          longitude: 0,
        });
      });
    const { errors, valids } = await validateDossier(
      {
        ...psy,
        address: "valid",
        secondAddress: "valid",
        email: "test@example.org",
        nir: "1234567890123",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );
    expect(getAddressCoordinates).toHaveBeenCalledTimes(2);
    expect(errors).toStrictEqual([]);
    expect(valids).toStrictEqual([
      "Le numéro ADELI 44123456789 correspond au département 44",
      "Le numéro de sécurité sociale 1234567890123 n'est pas déjà utilisé",
      "Adresse principale reconnue : valid",
      "Adresse secondaire reconnue : valid",
      "Numéro ADELI valide : 44123456789",
      "L'email est valide",
      "Données Adeli valides : nom d'exercice, prénom d'exercice et code profession",
    ]);
  });

  it("should return error when no nir", async () => {
    const { errors } = await validateDossier(
      {
        ...psy,
      } as ParsedDSPsychologist,
      adeliData as AdeliData[],
      []
    );
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Pas numéro de sécurité sociale fourni"),
      ])
    );
  });

  it("should return error when nir already exists", async () => {
    const { errors } = await validateDossier(
      {
        ...psy,
        nir: "1234567890123",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[],
      [{ id: 12345, value: "1234567890123" }]
    );
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining("numéro de sécurité sociale"),
      ])
    );
  });

  it("should not return error when nir already exists for same Psychologist", async () => {
    const errors = await validateDossier(
      {
        ...psy,
        nir: "1234567890123",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[],
      [{ id: 1, value: "1234567890123" }]
    );
    expect(errors).toEqual(
      expect.not.arrayContaining([
        expect.stringContaining("numéro de sécurité sociale"),
      ])
    );
  });

  it("should not return error when nir does not exists", async () => {
    const errors = await validateDossier(
      {
        ...psy,
        nir: "1234567890123",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[],
      [
        { id: 123, value: "123" },
        { id: 456, value: "456" },
      ]
    );
    expect(errors).toEqual(
      expect.not.arrayContaining([
        expect.stringContaining("numéro de sécurité sociale"),
      ])
    );
  });
});
