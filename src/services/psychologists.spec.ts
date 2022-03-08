/* eslint-disable jest/no-conditional-expect */
import sinon from "sinon";

import { models } from "../db/models";
import { getOnePsychologist } from "../db/seeds/psychologist";
import { FILTER } from "../types/enums/filters";
import { allPublics, PUBLIC } from "../types/enums/public";
import { Psychologist } from "../types/psychologist";
import * as address from "./getAddressCoordinates";
import {
  countAll,
  getAll,
  getByInstructor,
  saveMany,
  update,
  updateState,
} from "./psychologists";

describe("Service psychologists", () => {
  beforeEach(async () => {
    await models.Psychologist.destroy({ where: {} });
    const states = ["accepte", "en_instruction", "refuse"];
    const archiveds = [true, false];
    const visibles = [true, false];
    const teleconsultations = [true, false];
    const instructorIds = ["1", "2", "3"];

    // 2 x 2 x 2 x 3 x 3 = 72 psys
    const psychologists = archiveds.flatMap((archived) =>
      states.flatMap((state) =>
        visibles.flatMap((visible) =>
          teleconsultations.flatMap((teleconsultation) =>
            instructorIds.flatMap((instructorId) =>
              allPublics.map((p) =>
                getOnePsychologist({
                  archived,
                  instructorId,
                  public: p,
                  state,
                  teleconsultation,
                  visible,
                })
              )
            )
          )
        )
      )
    );

    //@ts-ignore
    await models.Psychologist.bulkCreate(psychologists);
  });

  describe("getByInstructor", () => {
    it("Should return non archived psychologist of an instructor", async () => {
      const results = await getByInstructor("2");
      expect(results.length).toEqual(12);
      results.forEach((psychologist) => {
        expect(psychologist.instructorId).toEqual("2");
        expect(psychologist.archived).toEqual(false);
      });
    });

    it("Should return empty list if instructor does not exists", async () => {
      const results = await getByInstructor("georges");
      expect(results.length).toEqual(0);
    });
  });

  describe("countAll", () => {
    it("Should count non archived psychologists", async () => {
      const results = await countAll();
      expect(results).toEqual(18);
    });
  });

  describe("getAll", () => {
    it("Should return all non archived, visible psychologists", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "0",
        [FILTER.PAGE_SIZE]: "10",
      });
      expect(results.length).toEqual(10);
      results.forEach((result) => expect(result.archived).toBe(false));
      results.forEach((result) => expect(result.visible).toBe(true));
    });

    it("Should return paginated psychologists", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "1",
        [FILTER.PAGE_SIZE]: "10",
      });
      expect(results.length).toEqual(8);
      results.forEach((result) => expect(result.archived).toBe(false));
      results.forEach((result) => expect(result.visible).toBe(true));
    });

    it("Should return empty psychologists if extra page", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "2",
        [FILTER.PAGE_SIZE]: "10",
      });
      expect(results.length).toEqual(0);
    });

    it("Should filter by teleconsultation", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "0",
        [FILTER.TELECONSULTATION]: "true",
      });

      expect(results.length).toEqual(9);
      results.forEach((result) => expect(result.archived).toBe(false));
      results.forEach((result) => expect(result.visible).toBe(true));
      results.forEach((result) => expect(result.teleconsultation).toBe(true));
    });

    it("Should filter by public", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "0",
        [FILTER.PUBLIC]: PUBLIC.ADULTES,
      });

      expect(results.length).toEqual(12);
      results.forEach((result) => expect(result.archived).toBe(false));
      results.forEach((result) => expect(result.visible).toBe(true));
      results.forEach((result) =>
        expect(result.public).not.toBe(PUBLIC.ENFANTS)
      );
    });

    it("Should filter by everything", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "0",
        [FILTER.PUBLIC]: PUBLIC.ENFANTS,
        [FILTER.TELECONSULTATION]: "true",
      });

      expect(results.length).toEqual(6);
      results.forEach((result) => expect(result.archived).toBe(false));
      results.forEach((result) => expect(result.visible).toBe(true));
      results.forEach((result) => expect(result.teleconsultation).toBe(true));
      results.forEach((result) =>
        expect(result.public).not.toBe(PUBLIC.ADULTES)
      );
    });

    it.skip("Should sort by distance", () => {
      // no idea how to do that
    });
  });

  describe("saveMany", () => {
    const instructorId = "saved";

    it("Should save all values", async () => {
      await models.Psychologist.destroy({ where: {} });

      await saveMany([
        getOnePsychologist({ id: 1, instructorId }),
        getOnePsychologist({ id: 2, instructorId }),
      ]);

      // @ts-ignore
      const savedPsychologists: Psychologist[] =
        await models.Psychologist.findAll({
          where: { instructorId },
        });
      expect(savedPsychologists.length).toEqual(2);
      expect(savedPsychologists[0].instructorId).toEqual(instructorId);
      expect(savedPsychologists[1].instructorId).toEqual(instructorId);
    });
  });

  describe("update", () => {
    let getAddressCoordinatesStub;
    beforeEach(() => {
      getAddressCoordinatesStub = sinon.stub(address, "default");
    });

    afterEach(() => {
      getAddressCoordinatesStub.restore();
    });

    it("Should update only updatable fields", async () => {
      getAddressCoordinatesStub.returns({ latitude: 456, longitude: 123 });
      const initialPsy = getOnePsychologist();
      // @ts-ignore
      await models.Psychologist.create(initialPsy);

      const modifiedPsy = getOnePsychologist();
      await update(initialPsy.id.toString(), modifiedPsy);

      const updateableFields = [
        "address",
        "cdsmsp",
        "displayEmail",
        "email",
        "firstName",
        "languages",
        "lastName",
        "phone",
        "public",
        "teleconsultation",
        "visible",
        "website",
      ];

      const updatedPsy = await models.Psychologist.findOne({
        raw: true,
        where: { id: initialPsy.id },
      });

      Object.keys(updatedPsy).forEach((key) => {
        if (key === "coordinates") {
          expect(updatedPsy[key].coordinates).toEqual([123, 456]);
          expect(updatedPsy[key].type).toEqual("Point");
        } else if (updateableFields.includes(key)) {
          expect(updatedPsy[key]).toEqual(modifiedPsy[key]);
        } else if (key !== "createdAt" && key !== "updatedAt") {
          expect(updatedPsy[key]).toEqual(initialPsy[key]);
        }
      });
    });

    it("Should update psy event without coordinates", async () => {
      getAddressCoordinatesStub.returns(null);
      const initialPsy = getOnePsychologist();
      // @ts-ignore
      await models.Psychologist.create(initialPsy);

      await update(initialPsy.id.toString(), initialPsy);

      const updatedPsy = await models.Psychologist.findOne({
        raw: true,
        where: { id: initialPsy.id },
      });

      // @ts-ignore
      expect(updatedPsy.coordinates).toEqual(null);
    });
  });

  describe("updateState", () => {
    const instructorId = "updateState";

    beforeEach(async () => {
      const psychologists = [
        getOnePsychologist({
          archived: true,
          id: 1,
          instructorId,
          state: "initial",
        }),
        getOnePsychologist({
          archived: false,
          id: 2,
          instructorId,
          state: "initial",
        }),
        getOnePsychologist({
          archived: true,
          id: 3,
          instructorId,
          state: "initial",
        }),
        getOnePsychologist({
          archived: false,
          id: 4,
          instructorId,
          state: "initial",
        }),
      ];

      //@ts-ignore
      await models.Psychologist.bulkCreate(psychologists);
    });

    it("Should only update state & archived value", async () => {
      await updateState([
        { archived: true, id: 0, state: "final" },
        { archived: false, id: 1, state: "final" },
        { archived: true, id: 2, state: "final" },
      ]);

      // @ts-ignore
      const psychologists: Psychologist[] = await models.Psychologist.findAll({
        where: { instructorId },
      });

      expect(psychologists.find((psy) => psy.id === 0)).toEqual(undefined);
      expect(psychologists.find((psy) => psy.id === 1).archived).toEqual(false);
      expect(psychologists.find((psy) => psy.id === 1).state).toEqual("final");
      expect(psychologists.find((psy) => psy.id === 2).archived).toEqual(true);
      expect(psychologists.find((psy) => psy.id === 2).state).toEqual("final");
      expect(psychologists.find((psy) => psy.id === 3).archived).toEqual(true);
      expect(psychologists.find((psy) => psy.id === 3).state).toEqual(
        "initial"
      );
      expect(psychologists.find((psy) => psy.id === 4).archived).toEqual(false);
      expect(psychologists.find((psy) => psy.id === 4).state).toEqual(
        "initial"
      );
    });
  });
});
