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
    groupeInstructeur: { id: "31", label: "31 - Haute-Garonne" },
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
      lastName: "SMITH",
      state: "Accepted",
      teleconsultation: true,
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://httpbin.org/apiAdresse/?q=12%20Rue%20Neuve%2031000%20Toulouse&limit=1"
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
    const dossierWithEmail = createDossier();
    dossierWithEmail.champs.push({
      id: "Q2hhbXAtMTYwMTE4Ng==",
      label: "Votre email",
      stringValue: input,
    });
    const result = await parseDossierMetadata(dossierWithEmail);

    expect(result.email).toEqual(resultValue);
  });
  it.each`
    input                  | resultValue
    ${undefined}           | ${undefined}
    ${null}                | ${undefined}
    ${"non"}               | ${undefined}
    ${"doctolib"}          | ${undefined}
    ${"doctolib."}         | ${undefined}
    ${"doctolib. com"}     | ${undefined}
    ${"doctolib/com"}      | ${undefined}
    ${"shouldBeValid.com"} | ${undefined}
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
    languages                       | languagesOther | resultValue
    ${undefined}                    | ${undefined}   | ${undefined}
    ${null}                         | ${undefined}   | ${undefined}
    ${""}                           | ${undefined}   | ${undefined}
    ${undefined}                    | ${"Francais"}  | ${undefined}
    ${null}                         | ${"Francais"}  | ${undefined}
    ${""}                           | ${"Francais"}  | ${undefined}
    ${"FRANCAIS"}                   | ${undefined}   | ${undefined}
    ${"Francais"}                   | ${undefined}   | ${undefined}
    ${"francais"}                   | ${undefined}   | ${undefined}
    ${"FRANÇAIS"}                   | ${undefined}   | ${undefined}
    ${"français"}                   | ${undefined}   | ${undefined}
    ${"langue française"}           | ${undefined}   | ${undefined}
    ${"anglais"}                    | ${undefined}   | ${"anglais"}
    ${"Anglais"}                    | ${"espagnol"}  | ${"Anglais, espagnol"}
    ${"other other"}                | ${undefined}   | ${"other other"}
    ${"Anglais, Italien"}           | ${"Japonais"}  | ${"Anglais, Italien, Japonais"}
    ${"Francais, Anglais, Italien"} | ${undefined}   | ${"Anglais, Italien"}
    ${"Francais et Italien"}        | ${undefined}   | ${"Italien"}
  `(
    "should parse languages champs for $languages & $languagesOther",
    async ({ languages, languagesOther, resultValue }) => {
      const dossierWithLangue = createDossier();
      dossierWithLangue.champs.push({
        id: "Q2hhbXAtMTY2MDM0Nw==",
        label: "Langues de réalisation des séances (optionnel) ?",
        stringValue: languages,
      });
      dossierWithLangue.champs.push({
        id: "Q2hhbXAtMjM0NjQzNA==",
        label: "Si autre(s) langue(s), préciser :",
        stringValue: languagesOther,
      });
      const result = await parseDossierMetadata(dossierWithLangue);

      expect(result.languages).toEqual(resultValue);
    }
  );

  it.each`
    input                               | resultValue
    ${"  Laurence  "}                   | ${"Laurence"}
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
      const dossier = createDossier();
      dossier.demandeur.prenom = input;
      const result = await parseDossierMetadata(dossier);

      expect(result.firstName).toEqual(resultValue);
    }
  );

  it.each`
    input                       | resultValue
    ${"  Dupont  "}             | ${"DUPONT"}
    ${"Dupont"}                 | ${"DUPONT"}
    ${"DuPOnt"}                 | ${"DUPONT"}
    ${"DuPOnt de la particule"} | ${"DUPONT DE LA PARTICULE"}
  `(
    "should format lastName champs for $input",
    async ({ input, resultValue }) => {
      const dossier = createDossier();
      dossier.demandeur.nom = input;
      const result = await parseDossierMetadata(dossier);

      expect(result.lastName).toEqual(resultValue);
    }
  );
});
