import axios from "axios";

import { parseDossierMetadata } from "../demarchesSimplifiees/parse-psychologists";

jest.mock("axios");
describe("parseDossierMetadata", () => {
  beforeEach(() => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
  });

  const dossier = {
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
  };

  it("should parse dossier as Psychologist", async () => {
    const result = await parseDossierMetadata(dossier);

    expect(result).toEqual({
      address: "12 Rue Neuve 31000 Toulouse",
      archived: false,
      department: "31",
      displayEmail: false,
      firstName: "Anne",
      id: 0,
      instructorId: "123",
      lastName: "SMITH",
      state: "Accepted",
      teleconsultation: true,
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api-adresse.data.gouv.fr/search/?q=12%20Rue%20Neuve%2031000%20Toulouse&limit=1"
    );
  });

  const createDossier = () => JSON.parse(JSON.stringify(dossier));

  it.each`
    input                | resultValue
    ${undefined}         | ${undefined}
    ${null}              | ${undefined}
    ${"non"}             | ${undefined}
    ${"wrong:wrong"}     | ${undefined}
    ${"wrong@com"}       | ${undefined}
    ${"valid@email.com"} | ${"valid@email.com"}
    ${"vaLiD@EMAIL.com"} | ${"valid@email.com"}
  `("should parse email champs for $input", async ({ input, resultValue }) => {
    const dossierWithWebsite = createDossier();
    dossierWithWebsite.champs.push({
      id: "Q2hhbXAtMTYwMTE4Ng==",
      label: "Votre email",
      stringValue: input,
    });
    const result = await parseDossierMetadata(dossierWithWebsite);

    expect(result.email).toEqual(resultValue);
  });
  it.each`
    input                  | resultValue
    ${undefined}           | ${undefined}
    ${null}                | ${undefined}
    ${"non"}               | ${undefined}
    ${"doctolib"}          | ${undefined}
    ${"https://valid.com"} | ${"https://valid.com"}
    ${"http://valid.com"}  | ${"http://valid.com"}
    ${"http://VALID.com"}  | ${"http://valid.com"}
  `(
    "should parse website champs for $input",
    async ({ input, resultValue }) => {
      const dossierWithWebsite = createDossier();
      dossierWithWebsite.champs.push({
        id: "Q2hhbXAtMTYzOTQwMQ==",
        label: "Possédez-vous un site internet ?",
        stringValue: input,
      });
      const result = await parseDossierMetadata(dossierWithWebsite);

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
      const dossierWithLangue = createDossier();
      dossierWithLangue.champs.push({
        id: "Q2hhbXAtMTY2MDM0Nw==",
        label: "Langues de réalisation des séances (optionnel) ?",
        stringValue: input,
      });
      const result = await parseDossierMetadata(dossierWithLangue);

      expect(result.languages).toEqual(resultValue);
    }
  );

  it.each`
    input                               | resultValue
    ${"Laurence"}                       | ${"Laurence"}
    ${"lauREnce"}                       | ${"Laurence"}
    ${"Marie-Christine"}                | ${"Marie-Christine"}
    ${"marie-christine"}                | ${"Marie-Christine"}
    ${"MARIE-CHRISTINE"}                | ${"Marie-Christine"}
    ${"MARIE CHRISTINE"}                | ${"Marie Christine"}
    ${"MARIE CHRISTINE Anne-CHARlotte"} | ${"Marie Christine Anne-Charlotte"}
  `(
    "should format firsName champs for $input",
    async ({ input, resultValue }) => {
      const dossierWithLangue = createDossier();
      dossierWithLangue.demandeur.prenom = input;
      const result = await parseDossierMetadata(dossierWithLangue);

      expect(result.firstName).toEqual(resultValue);
    }
  );

  it.each`
    input                       | resultValue
    ${"Dupont"}                 | ${"DUPONT"}
    ${"DuPOnt"}                 | ${"DUPONT"}
    ${"DuPOnt de la particule"} | ${"DUPONT DE LA PARTICULE"}
  `(
    "should format firsName champs for $input",
    async ({ input, resultValue }) => {
      const dossierWithLangue = createDossier();
      dossierWithLangue.demandeur.nom = input;
      const result = await parseDossierMetadata(dossierWithLangue);

      expect(result.lastName).toEqual(resultValue);
    }
  );
});
