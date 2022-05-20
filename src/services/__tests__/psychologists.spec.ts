/* eslint-disable jest/no-conditional-expect */
import { expect } from "@jest/globals";
import { stub } from "sinon";

import { models } from "../../db/models";
import { getOnePsychologist } from "../../db/seeds/psychologist";
import { FILTER } from "../../types/enums/filters";
import { allPublics, PUBLIC } from "../../types/enums/public";
import { Psychologist } from "../../types/psychologist";
import * as address from "../getAddressCoordinates";
import {
  countAll,
  getAll,
  getByDepartment,
  getDateLatestAccepte,
  getDateLatestArchived,
  getOne,
  saveMany,
  update,
  updateState,
} from "../psychologists";

describe("Service psychologists", () => {
  let psychologistsList;
  beforeEach(async () => {
    await models.Psychologist.destroy({ where: {} });
    const states = ["accepte", "en_instruction", "refuse"];
    const archiveds = [true, false];
    const visibles = [true, false];
    const teleconsultations = [true, false];
    const departments = ["01", "02", "03"];

    // 2 x 2 x 2 x 3 x 3 = 72 psys
    psychologistsList = archiveds.flatMap((archived) =>
      states.flatMap((state) =>
        visibles.flatMap((visible) =>
          teleconsultations.flatMap((teleconsultation) =>
            departments.flatMap((department) =>
              allPublics.map((p) =>
                getOnePsychologist({
                  archived,
                  department,
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
    await models.Psychologist.bulkCreate(psychologistsList);
  });

  describe("getOne", () => {
    it("Should return the psy with the id", async () => {
      const result = await getOne(psychologistsList[0].id);

      expect(result.department).toEqual(psychologistsList[0].department);
      expect(result.id).toEqual(psychologistsList[0].id);
    });

    it("Should return the psy with the id and the department", async () => {
      const result = await getOne(
        psychologistsList[0].id,
        psychologistsList[0].department
      );

      expect(result.department).toEqual(psychologistsList[0].department);
      expect(result.id).toEqual(psychologistsList[0].id);
    });

    it("Should not return the psy if department is wrong", async () => {
      const result = await getOne(psychologistsList[0].id, "wrong");
      expect(result).toEqual(null);
    });
  });

  describe("getByDepartment", () => {
    it("Should return non archived psychologist of a department", async () => {
      const results = await getByDepartment("02");
      expect(results.length).toEqual(12);
      results.forEach((psychologist) => {
        expect(psychologist.department).toEqual("02");
        expect(psychologist.archived).toEqual(false);
      });
    });

    it("Should return empty list if department does not exists", async () => {
      const results = await getByDepartment("georges");
      expect(results.length).toEqual(0);
    });
  });

  describe("getDateLatestAccepte", () => {
    async function insertInDbAsync(params) {
      const latestAccepte = getOnePsychologist(params);
      // @ts-ignore
      return await models.Psychologist.create(latestAccepte);
    }

    let latestAccepte, latestRefuse, latestAccepteArchived;
    beforeEach(async () => {
      latestAccepte = await insertInDbAsync({
        state: "accepte",
        archived: false,
      });
      latestRefuse = await insertInDbAsync({
        state: "refuse",
        archived: true,
      });
      latestAccepteArchived = await insertInDbAsync({
        state: "accepte",
        archived: true,
      });
    });
    it("validate test data", async () => {
      expect(latestAccepte.getDataValue("createdAt")).not.toEqual(
        latestRefuse.getDataValue("createdAt")
      );
      expect(latestAccepteArchived.getDataValue("createdAt")).not.toEqual(
        latestRefuse.getDataValue("createdAt")
      );
      expect(latestAccepte.getDataValue("createdAt")).not.toEqual(
        latestAccepteArchived.getDataValue("createdAt")
      );
    });

    it("should return the latest inserted psy", async () => {
      const result = await getDateLatestAccepte();
      expect(result).toEqual(latestAccepte.getDataValue("createdAt"));
    });

    it("should return the latest archived psy", async () => {
      const result = await getDateLatestArchived();
      expect(result).toEqual(latestAccepteArchived.getDataValue("createdAt"));
    });
  });

  describe("countAll", () => {
    it("Should count non archived psychologists", async () => {
      const results = await countAll();
      expect(results).toEqual(36);
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
    });

    it("Should return paginated psychologists", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "1",
        [FILTER.PAGE_SIZE]: "10",
      });
      expect(results.length).toEqual(10);
      results.forEach((result) => expect(result.archived).toBe(false));
    });

    it("Should return empty psychologists if extra page", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "4",
        [FILTER.PAGE_SIZE]: "10",
      });
      expect(results.length).toEqual(0);
    });

    it("Should filter by teleconsultation", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "0",
        [FILTER.TELECONSULTATION]: "true",
      });

      expect(results.length).toEqual(18);
      results.forEach((result) => expect(result.archived).toBe(false));
      results.forEach((result) => expect(result.teleconsultation).toBe(true));
    });

    it("Should filter by public", async () => {
      const results = await getAll({
        [FILTER.PAGE_INDEX]: "0",
        [FILTER.PUBLIC]: PUBLIC.ADULTES,
      });

      expect(results.length).toEqual(24);
      results.forEach((result) => expect(result.archived).toBe(false));
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

      expect(results.length).toEqual(12);
      results.forEach((result) => expect(result.archived).toBe(false));
      results.forEach((result) => expect(result.teleconsultation).toBe(true));
      results.forEach((result) =>
        expect(result.public).not.toBe(PUBLIC.ADULTES)
      );
    });
  });

  describe("saveMany", () => {
    const department = "saved";

    it("Should save all values", async () => {
      await models.Psychologist.destroy({ where: {} });

      await saveMany([
        getOnePsychologist({ id: 1, department }),
        getOnePsychologist({ id: 2, department }),
      ]);

      // @ts-ignore
      const savedPsychologists: Psychologist[] =
        await models.Psychologist.findAll({
          where: { department },
        });
      expect(savedPsychologists.length).toEqual(2);
      expect(savedPsychologists[0].department).toEqual(department);
      expect(savedPsychologists[1].department).toEqual(department);
    });
  });

  describe("update", () => {
    let getAddressCoordinatesStub;
    beforeEach(() => {
      getAddressCoordinatesStub = stub(address, "default");
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
        "addressAdditional",
        "secondAddress",
        "secondAddressAdditional",
        "coordinates",
        "cdsmsp",
        "displayEmail",
        "displayPhone",
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

      expect(updatedPsy).toBeDefined();

      Object.keys(updatedPsy).forEach((key) => {
        if (key === "coordinates" || key === "secondAddressCoordinates") {
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
    const department = "updateState";

    beforeEach(async () => {
      const psychologists = [
        getOnePsychologist({
          archived: true,
          id: 1,
          department,
          state: "initial",
        }),
        getOnePsychologist({
          archived: false,
          id: 2,
          department,
          state: "initial",
        }),
        getOnePsychologist({
          archived: true,
          id: 3,
          department,
          state: "initial",
        }),
        getOnePsychologist({
          archived: false,
          id: 4,
          department,
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
        where: { department },
      });

      expect(psychologists.find((psy) => psy.id === 0)).toEqual(undefined);
      expect(psychologists.find((psy) => psy.id === 1)?.archived).toEqual(
        false
      );
      expect(psychologists.find((psy) => psy.id === 1)?.state).toEqual("final");
      expect(psychologists.find((psy) => psy.id === 2)?.archived).toEqual(true);
      expect(psychologists.find((psy) => psy.id === 2)?.state).toEqual("final");
      expect(psychologists.find((psy) => psy.id === 3)?.archived).toEqual(true);
      expect(psychologists.find((psy) => psy.id === 3)?.state).toEqual(
        "initial"
      );
      expect(psychologists.find((psy) => psy.id === 4)?.archived).toEqual(
        false
      );
      expect(psychologists.find((psy) => psy.id === 4)?.state).toEqual(
        "initial"
      );
    });
  });
});
