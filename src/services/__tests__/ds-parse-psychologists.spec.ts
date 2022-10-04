import axios from "axios";

import { parseDossierMetadata } from "../demarchesSimplifiees/parse-psychologists";

jest.mock("axios");
describe("parseDossierMetadata", () => {
  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockImplementationOnce(
      () => Promise.resolve({ data: {} })
    );
  });

  const dossier = {
    id: "1",
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
        id: "Q2hhbXAtMTg0MzU2Ng==",
        label: "Numéro de sécurité sociale (NIR)", // This is not the real label.
        stringValue: "123456",
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
      demarcheSimplifieesId: "1",
      nir: "123456",
      archived: false,
      department: "31",
      displayEmail: false,
      firstName: "Anne",
      id: 0,
      lastName: "Smith",
      state: "Accepted",
      teleconsultation: true,
    });
  });

  const createDossier = () => JSON.parse(JSON.stringify(dossier));

  it("should parse email champs for $input", async () => {
    const dossierWithEmail = createDossier();
    dossierWithEmail.champs.push({
      id: "Q2hhbXAtMTYwMTE4Ng==",
      label: "Votre email",
      stringValue: "test@example.org",
    });
    const result = await parseDossierMetadata(dossierWithEmail);

    expect(result.email).toEqual("test@example.org");
  });
  it("should parse website champs for $input", async () => {
    const dossierWithWebsite = createDossier();
    dossierWithWebsite.champs.push({
      id: "Q2hhbXAtMTYzOTQwMQ==",
      label: "Possédez-vous un site internet ?",
      stringValue: "http://valid.com",
    });
    const result = await parseDossierMetadata(dossierWithWebsite);

    expect(result.website).toEqual("http://valid.com");
  });

  it.each`
    languages                       | languagesOther | resultValue
    ${undefined}                    | ${undefined}   | ${undefined}
    ${null}                         | ${undefined}   | ${null}
    ${""}                           | ${undefined}   | ${null}
    ${undefined}                    | ${"Francais"}  | ${undefined}
    ${null}                         | ${"Francais"}  | ${null}
    ${""}                           | ${"Francais"}  | ${null}
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
});
