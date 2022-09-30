import { DSPsychologist } from "../../types/psychologist";
import filterDossiersToVerif from "../demarchesSimplifiees/dossiers";

describe("Dossier service", () => {
  const dossier: Partial<DSPsychologist> = {
    archived: false,
    number: 123,
    state: "en construction",
    groupeInstructeur: {
      id: "string",
      label: "string",
    },
    usager: {
      email: "string",
    },
    demandeur: {
      nom: "string",
      prenom: "string",
    },
    champs: [
      {
        id: "string",
        label: "string",
        stringValue: "string",
      },
    ],
    annotations: [
      {
        id: "string",
        label: "string",
        stringValue: "string",
      },
    ],
  };

  const listDossier = [dossier];
  listDossier.push(
    {
      ...dossier,
      annotations: [
        {
          id: "1",
          label: "Conclusions Vérifications automatiques",
          stringValue: "",
        },
      ],
    },
    {
      ...dossier,
      annotations: [
        {
          id: "1",
          label: "Conclusions Vérifications automatiques",
          stringValue: "Deja traité",
        },
      ],
    }
  );

  it('should filter dossiers with no text in "Conclusions Vérifications automatiques" annotations and no messages', () => {
    const result = filterDossiersToVerif(listDossier as DSPsychologist[]);
    expect(result.length).toEqual(1);
    expect(result[0].annotations[0].stringValue).toEqual("");
  });
});
