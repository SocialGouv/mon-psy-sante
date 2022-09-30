import { validateDossier } from "../../cron/demarchesSimplifiees";
import getAddressCoordinates from "../../services/getAddressCoordinates";
import { AdeliData } from "../../types/adeli";
import { ParsedDSPsychologist, Psychologist } from "../../types/psychologist";

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
    const errors = await validateDossier(psy as ParsedDSPsychologist, []);
    expect(errors).toStrictEqual(["Numéro ADELI invalide : 44123456789"]);
  });

  it("should return error when department does not match", async () => {
    const errors = await validateDossier(
      {
        ...psy,
        department: "35",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );
    expect(errors).toEqual(
      expect.arrayContaining([
        "Le numéro ADELI 44123456789 ne correspond pas au département 35",
      ])
    );
  });

  it("should return error when address is not found", async () => {
    (getAddressCoordinates as jest.MockedFunction<typeof getAddressCoordinates>)
      .mockReset()
      .mockImplementationOnce(async () => {
        return Promise.resolve(null);
      });
    const errors = await validateDossier(
      {
        ...psy,
        address: "test",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );

    expect(errors).toEqual(
      expect.arrayContaining(["Adresse principale non reconnue : test"])
    );
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
    const errors = await validateDossier(
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
    const errors = await validateDossier(
      {
        ...psy,
        address: "valid",
        secondAddress: "valid",
        email: "test@example.org",
      } as ParsedDSPsychologist,
      adeliData as AdeliData[]
    );
    expect(getAddressCoordinates).toHaveBeenCalledTimes(2);
    expect(errors).toStrictEqual([]);
  });
});
