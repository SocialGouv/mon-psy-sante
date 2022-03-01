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
      firstName: "Anne",
      id: 0,
      instructorId: "123",
      lastName: "Smith",
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api-adresse.data.gouv.fr/search/?q=12%20Rue%20Neuve%2031000%20Toulouse&limit=1"
    );
  });
});
