import { stub } from "sinon";

import { models } from "../db/models";
import { getOnePsychologist } from "../db/seeds/psychologist";
import { updateIfExists } from "../pages/api/admin/psychologists/[id]";
import * as address from "../services/getAddressCoordinates";
import { Psychologist } from "../types/psychologist";

describe("updateIfExists", () => {
  let getAddressCoordinatesStub;
  beforeAll(async () => {
    await models.Psychologist.destroy({ where: {} });

    const psy = await getOnePsychologist({ id: 1, department: "01" });
    // @ts-ignore
    await models.Psychologist.create(psy);
  });
  beforeEach(() => {
    getAddressCoordinatesStub = stub(address, "default");
  });

  afterEach(() => {
    getAddressCoordinatesStub.restore();
  });
  const valideInput = {
    address: "My new adress",
    addressAdditional: "Mon complément d'adresse",
    cdsmsp: "optio",
    displayEmail: true,
    email: "updated@example.net",
    firstName: "CaRmen",
    lastName: "strOMan",
    phone: "02 71 94 65 55",
    displayPhone: false,
    public: "Adultes et enfants/adolescents",
    teleconsultation: true,
    visible: true,
    website: "https://grotesque-proximity.info",
    shouldBeIgnored: "should not failed",
  };

  it("update should undefined if does not exists", async () => {
    expect(await updateIfExists("1111", "", {})).toEqual(undefined);
  });
  it("update should undefined if the department does not match", async () => {
    expect(await updateIfExists("1111", "99", {})).toEqual(undefined);
  });
  it("update should return error if wrong params", async () => {
    let exception;
    await updateIfExists("1", "01", {}).catch((e) => (exception = e));
    expect(exception.details.length).toEqual(9);
    expect(exception.details[0].message).toEqual('"address" is required');
  });
  it("should fail when address is invalid", async () => {
    let exception;
    getAddressCoordinatesStub.returns(null);
    await updateIfExists("1", "01", {
      ...valideInput,
      address: "invalid address",
    }).catch((e) => (exception = e));
    expect(exception.details[0].message).toMatch(/adresse/);
  });
  it("should fail when secondAddress is invalid", async () => {
    let exception;
    getAddressCoordinatesStub
      .onFirstCall()
      .returns({
        latitude: 456,
        longitude: 123,
      })
      .onSecondCall()
      .returns(null);
    await updateIfExists("1", "01", {
      ...valideInput,
      secondAddress: "invalid address",
    }).catch((e) => (exception = e));
    expect(exception.details[0].message).toMatch(/adresse/);
  });
  it("should fail when url is not http or https", async () => {
    let exception;
    await updateIfExists("1", "01", {
      ...valideInput,
      website: "website invalid",
    }).catch((e) => (exception = e));
    expect(exception.details[0].message).toMatch(/https/);
  });
  it("update should update psy in db", async () => {
    let exception;
    getAddressCoordinatesStub.returns({ latitude: 456, longitude: 123 });

    const result = await updateIfExists("1", "01", valideInput).catch(
      (e) => (exception = e)
    );
    expect(exception).toEqual(undefined);
    expect(result).toEqual([1]);

    // @ts-ignore
    const updatedPsy: Psychologist = await models.Psychologist.findOne({
      raw: true,
      where: { email: valideInput.email },
    });
    expect(updatedPsy.firstName).toEqual("Carmen");
    expect(updatedPsy.lastName).toEqual("STROMAN");
    expect(updatedPsy.phone).toEqual("02 71 94 65 55");
    expect(updatedPsy.displayPhone).toEqual(false);
    expect(updatedPsy.public).toEqual("Adultes et enfants/adolescents");
    expect(updatedPsy.addressAdditional).toEqual("Mon complément d'adresse");
    expect(updatedPsy.coordinates.coordinates).toEqual([123, 456]);
    expect(updatedPsy.coordinates.type).toEqual("Point");

    // @ts-ignore
    expect(updatedPsy.shouldBeIgnored).toEqual(undefined);
  });

  it("should empty languages when languages is empty", async () => {
    async function expectUpdatedPsy(expected) {
      const updatedPsy = (await models.Psychologist.findOne({
        where: { email: valideInput.email },
      })) as unknown as Psychologist;
      expect(updatedPsy.languages).toEqual(expected);
    }
    getAddressCoordinatesStub.returns({ latitude: 456, longitude: 123 });
    // Should add language.
    await updateIfExists("1", "01", { ...valideInput, languages: "anglais" });
    await expectUpdatedPsy("anglais");
    // Should not alter language when nothing is provided.
    await updateIfExists("1", "01", valideInput);
    await expectUpdatedPsy("anglais");
    // Should empty language when empty string is provided.
    await updateIfExists("1", "01", { ...valideInput, languages: "" });
    await expectUpdatedPsy(null);
  });
});
