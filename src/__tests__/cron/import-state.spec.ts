import {
  importArchived,
  importData,
  importFromDS,
} from "../../cron/demarchesSimplifiees";
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
const archived = [true, false];

const psychologistsInDB = archived.flatMap((archived) =>
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

describe("Cron import from DS", () => {
  function mockDSCall(psychologistsInDS) {
    // @ts-ignore
    request.mockImplementationOnce(() =>
      Promise.resolve({
        demarche: { dossiers: { nodes: psychologistsInDS, pageInfo: {} } },
      })
    );
  }

  describe("With no data in DB", () => {
    beforeEach(async () => {
      await models.Psychologist.destroy({ where: {} });
      mockDSCall(psychologistsInDS);
      mockDSCall([]);
    });

    it("Should import all psy", async () => {
      // @ts-ignore
      let psychologists: Psychologist[] = await models.Psychologist.findAll({
        raw: true,
      });
      expect(psychologists.length).toBe(0);

      await importFromDS();

      // @ts-ignore
      psychologists = await models.Psychologist.findAll({ raw: true });

      expect(psychologists.length).toEqual(7);
      const psychologist = psychologists.find(
        (psy) => psy.address === "psyHasChanged"
      );
      expect(psychologist.state).toEqual("accepte");
      expect(psychologist.archived).toEqual(false);
    });
  });

  describe("With data in DB", () => {
    const updatedPsy = formatForDS(psyHasChanged);
    updatedPsy.state = "sans_suite";
    updatedPsy.archived = true;

    const newPsy = formatForDS(
      getOnePsychologist({
        state: "accepte",
        address: "newPsy",
        instructorId: "psyInDB",
      })
    );

    beforeEach(async () => {
      await models.Psychologist.destroy({ where: {} });

      //@ts-ignore
      await models.Psychologist.bulkCreate(psychologistsInDB);

      // @ts-ignore
      request.mockImplementationOnce(() =>
        Promise.resolve({
          demarche: { dossiers: { nodes: [newPsy], pageInfo: {} } },
        })
      );

      // @ts-ignore
      request.mockImplementationOnce(() =>
        Promise.resolve({
          demarche: { dossiers: { nodes: [updatedPsy], pageInfo: {} } },
        })
      );
    });

    it("Should add new psy", async () => {
      // @ts-ignore
      const psyBefore: Psychologist = await models.Psychologist.findOne({
        where: { address: newPsy.address },
        raw: true,
      });
      expect(psyBefore).toEqual(null);

      await importData();
      // @ts-ignore
      const psychologists: Psychologist[] = await models.Psychologist.findAll({
        where: { instructorId: "psyInDB" },
        raw: true,
      });

      expect(psychologists.length).toEqual(8);
      const psychologist = psychologists.find(
        (psy) => psy.address === newPsy.address
      );
      expect(psychologist.state).toEqual("accepte");
      expect(psychologist.archived).toEqual(false);
    });

    it("Should update psy state", async () => {
      // @ts-ignore
      const psyBefore: Psychologist = await models.Psychologist.findOne({
        where: { id: updatedPsy.id },
        raw: true,
      });
      expect(psyBefore.state).toEqual("accepte");

      await importArchived();

      // @ts-ignore
      const psychologists: Psychologist[] = await models.Psychologist.findAll({
        where: { instructorId: "psyInDB" },
        raw: true,
      });

      expect(psychologists.length).toEqual(7);
      const psychologist = psychologists.find(
        (psy) => psy.id === updatedPsy.id
      );
      expect(psychologist.state).toEqual("sans_suite");
      expect(psychologist.archived).toEqual(true);
    });
  });
});
