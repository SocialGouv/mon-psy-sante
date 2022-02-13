import { models } from "../db/models";
import { getOnePsychologist } from "../db/seeds";
import { FILTER } from "../types/enums/filters";
import { Psychologist } from "../types/psychologist";
import {
  countAll,
  getAll,
  getByInstructor,
  saveMany,
  updateState,
} from "./psychologists";

describe("Service psychologists", () => {
  beforeEach(async () => {
    await models.Psychologist.destroy({ where: {} });

    await models.Psychologist.bulkCreate([
      getOnePsychologist({ archived: true, instructorId: "1" }),
      getOnePsychologist({ archived: true, instructorId: "2" }),
      getOnePsychologist({ instructorId: "1", visible: false }),
      getOnePsychologist({ instructorId: "2", visible: false }),
      getOnePsychologist({ archived: false, instructorId: "1" }),
      getOnePsychologist({ archived: false, instructorId: "2" }),
      getOnePsychologist({ archived: false, instructorId: "2" }),
    ]);

    await models.Psychologist.bulkCreate(
      [...Array(20).keys()].map(() =>
        getOnePsychologist({
          archived: false,
          instructorId: "osef",
          visible: true,
        })
      )
    );
  });

  describe("getByInstructor", () => {
    it("Should return non archived psychologist of an instructor", async () => {
      const results = await getByInstructor("2");
      expect(results.length).toEqual(2);
      expect(results[0].instructorId).toEqual("2");
      expect(results[1].instructorId).toEqual("2");
    });

    it("Should return empty list if instructor does not exists", async () => {
      const results = await getByInstructor("georges");
      expect(results.length).toEqual(0);
    });
  });

  describe("countAll", () => {
    it("Should count non archived psychologists", async () => {
      const results = await countAll();
      expect(results).toEqual(23);
    });
  });

  describe("getAll", () => {
    it("Should return all non archived psychologists", async () => {
      const results = await getAll({ [FILTER.PAGE_INDEX]: "0" });
      expect(results.length).toEqual(10);
      results.forEach((result) => expect(result.archived).toBe(false));
    });

    it("Should return paginated psychologists", async () => {
      const results = await getAll({ [FILTER.PAGE_INDEX]: "2" });
      expect(results.length).toEqual(3);
      results.forEach((result) => expect(result.archived).toBe(false));
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

  describe("updateState", () => {
    const instructorId = "updateState";

    beforeEach(async () => {
      await models.Psychologist.bulkCreate([
        getOnePsychologist({ archived: true, id: 1, instructorId }),
        getOnePsychologist({ archived: false, id: 2, instructorId }),
        getOnePsychologist({ archived: true, id: 3, instructorId }),
        getOnePsychologist({ archived: false, id: 4, instructorId }),
      ]);
    });

    it("Should only update archived value", async () => {
      await updateState([
        { archived: true, id: 0 },
        { archived: false, id: 1 },
        { archived: true, id: 2 },
      ]);

      // @ts-ignore
      const psychologists: Psychologist[] = await models.Psychologist.findAll({
        where: { instructorId },
      });

      expect(psychologists.find((psy) => psy.id === 0)).toEqual(undefined);
      expect(psychologists.find((psy) => psy.id === 1).archived).toEqual(false);
      expect(psychologists.find((psy) => psy.id === 2).archived).toEqual(true);
      expect(psychologists.find((psy) => psy.id === 3).archived).toEqual(true);
      expect(psychologists.find((psy) => psy.id === 4).archived).toEqual(false);
    });
  });
});
