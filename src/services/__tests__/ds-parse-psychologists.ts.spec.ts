import axios from "axios";

import { parseDossierMetadata } from "../demarchesSimplifiees/parsePsychologists";

jest.mock("axios");
describe("parseDossierMetadata", () => {
  beforeEach(() => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
  });

  it("should parse dossier as Psychologist", async () => {
    const result = await parseDossierMetadata({
      archived: false,
      champs: [
        {
          id: "Q2hhbXAtMTYyNzkzOQ==",
          label: "Adresse postale de votre cabinet principal",
          stringValue: "12 Rue Neuve 31000 Toulouse",
        },
        {
          id: "Q2hhbXAtMTYzOTUyNA==",
          label: "Faites-vous de la téléconsultation ?",
          stringValue: "true",
        },
      ],
      demandeur: { nom: "Smith", prenom: "Anne" },
      groupeInstructeur: { id: "123", label: "31 - Haute-Garonne" },
      number: 0,
      state: "Accepted",
      usager: { email: "anne@hello" },
    });

    expect(result).toEqual({
      address: "12 Rue Neuve 31000 Toulouse",
      archived: false,
      department: "31",
      displayEmail: false,
      firstName: "Anne",
      id: 0,
      instructorId: "123",
      lastName: "Smith",
      teleconsultation: true,
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api-adresse.data.gouv.fr/search/?q=12%20Rue%20Neuve%2031000%20Toulouse&limit=1"
    );
  });
  it.each`
    input                  | resultValue
    ${undefined}           | ${undefined}
    ${null}                | ${undefined}
    ${"non"}               | ${undefined}
    ${"doctolib"}          | ${undefined}
    ${"https://valid.com"} | ${"https://valid.com"}
  `(
    "should parse website champs for $input",
    async ({ input, resultValue }) => {
      const result = await parseDossierMetadata({
        archived: false,
        champs: [
          {
            id: "Q2hhbXAtMTYyNzkzOQ==",
            label: "Adresse postale de votre cabinet principal",
            stringValue: "12 Rue Neuve 31000 Toulouse",
          },
          {
            id: "Q2hhbXAtMTYzOTUyNA==",
            label: "Faites-vous de la téléconsultation ?",
            stringValue: "true",
          },
          {
            id: "Q2hhbXAtMTYzOTQwMQ==",
            label: "Possédez-vous un site internet ?",
            stringValue: input,
          },
        ],
        demandeur: { nom: "Smith", prenom: "Anne" },
        groupeInstructeur: { id: "123", label: "31 - Haute-Garonne" },
        number: 0,
        state: "Accepted",
        usager: { email: "anne@hello" },
      });

      expect(result.website).toEqual(resultValue);
    }
  );

  it.each`
    input                 | resultValue
    ${undefined}          | ${undefined}
    ${null}               | ${undefined}
    ${""}                 | ${undefined}
    ${"FRANCAIS"}         | ${undefined}
    ${"Francais"}         | ${undefined}
    ${"francais"}         | ${undefined}
    ${"FRANÇAIS"}         | ${undefined}
    ${"français"}         | ${undefined}
    ${"langue française"} | ${undefined}
    ${"anglais"}          | ${"anglais"}
    ${"other other"}      | ${"other other"}
  `(
    "should parse languages champs for $input",
    async ({ input, resultValue }) => {
      const result = await parseDossierMetadata({
        archived: false,
        champs: [
          {
            id: "Q2hhbXAtMTYyNzkzOQ==",
            label: "Adresse postale de votre cabinet principal",
            stringValue: "12 Rue Neuve 31000 Toulouse",
          },
          {
            id: "Q2hhbXAtMTYzOTUyNA==",
            label: "Faites-vous de la téléconsultation ?",
            stringValue: "true",
          },
          {
            id: "Q2hhbXAtMTY2MDM0Nw==",
            label: "Langues de réalisation des séances (optionnel) ?",
            stringValue: input,
          },
        ],
        demandeur: { nom: "Smith", prenom: "Anne" },
        groupeInstructeur: { id: "123", label: "31 - Haute-Garonne" },
        number: 0,
        state: "Accepted",
        usager: { email: "anne@hello" },
      });

      expect(result.languages).toEqual(resultValue);
    }
  );
});