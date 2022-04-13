import { importState } from "../../cron/demarchesSimplifiees";
import { models } from "../../db/models";
import { getOnePsychologist } from "../../db/seeds/psychologist";
import { request } from "../../services/demarchesSimplifiees/request";
import { Psychologist } from "../../types/psychologist";

jest.mock("../../services/demarchesSimplifiees/request");

function formatForDS(psy: Psychologist) {
  return Object.assign(
    {
      number: psy.id,
      groupeInstructeur: {
        id: psy.instructorId,
        label: psy.department + " - dep",
      },
      demandeur: { prenom: psy.firstName, nom: psy.lastName },
      champs: [
        {
          id: "Q2hhbXAtMTYwMzgwNQ==",
          stringValue: psy.phone,
        },
        {
          id: "Q2hhbXAtMTYyNzkzOQ==",
          stringValue: psy.address,
        },
        {
          id: "Q2hhbXAtMjMyMzQyMg==",
          label: "Adresse postale d'un autre lieu d'exercice ",
          stringValue: "",
        },
        {
          id: "Q2hhbXAtMjIyMjcwMg==",
          label: "Public",
          stringValue: "",
        },
      ],
      usager: {
        email: psy.email,
      },
    },
    psy
  );
}

const states = ["accepte", "en_instruction", "refuse"];
const archiveds = [true, false];

const psychologistsInDB = archiveds.flatMap((archived) =>
  states.flatMap((state) =>
    getOnePsychologist({
      archived,
      state,
      instructorId: "psyInDB",
    })
  )
);
const psyHasChanged = getOnePsychologist({
  state: "accepte",
  address: "psyHasChanged",
  instructorId: "psyInDB",
});

psychologistsInDB.push(psyHasChanged);
const psychologistsInDS = psychologistsInDB.map((psy) => {
  return formatForDS(psy);
});

const newPsy = formatForDS(
  getOnePsychologist({
    state: "accepte",
    address: "newPsy",
    instructorId: "psyInDB",
  })
);
psychologistsInDS.push(newPsy);
const updatedPsy = formatForDS(psyHasChanged);
updatedPsy.state = "refuse";
psychologistsInDS.push(updatedPsy);

describe("Cron import State", () => {
  beforeEach(async () => {
    await models.Psychologist.destroy({ where: {} });

    //@ts-ignore
    await models.Psychologist.bulkCreate(psychologistsInDB);

    // @ts-ignore
    request.mockImplementationOnce(() =>
      Promise.resolve({
        demarche: { dossiers: { nodes: psychologistsInDS, pageInfo: {} } },
      })
    );

    //@ts-ignore
    request.mockImplementationOnce(() =>
      Promise.resolve({ dossier: updatedPsy })
    );
    //@ts-ignore
    request.mockImplementationOnce(() => Promise.resolve({ dossier: newPsy }));
  });

  it("Should add missing psy", async () => {
    // @ts-ignore
    const psyBefore: Psychologist = await models.Psychologist.findOne({
      where: { id: psyHasChanged.id },
      raw: true,
    });
    expect(psyBefore.state).toEqual("accepte");

    await importState();

    // @ts-ignore
    const psychologists: Psychologist[] = await models.Psychologist.findAll({
      where: { instructorId: "psyInDB" },
      raw: true,
    });

    expect(psychologists.length).toEqual(8);
    expect(psychologists.find((psy) => psy.address === "newPsy").state).toEqual(
      "accepte"
    );
    expect(
      psychologists.find((psy) => psy.address === "psyHasChanged").state
    ).toEqual("refuse");
  });
});
