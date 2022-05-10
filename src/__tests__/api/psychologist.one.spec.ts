/* eslint-disable jest/no-conditional-expect */
import axios from "axios";

import { models } from "../../db/models";
import { getOnePsychologist } from "../../db/seeds/psychologist";
import config from "../../services/config";

const defaultValues = {
  address: "new address",
  cdsmsp: "cdsmsp",
  displayEmail: true,
  email: "me@you.fr",
  firstName: "Georges",
  languages: "Poésie, Rap",
  lastName: "Moustaki",
  phone: "Mon 06",
  public: "Adultes",
  teleconsultation: true,
  visible: true,
  website: "liberte.fr",
};

describe("/api/psychologist/[id]", () => {
  beforeAll(async () => {
    await models.Psychologist.destroy({ where: {} });

    const psy = getOnePsychologist({ id: 1 });
    // @ts-ignore
    await models.Psychologist.create(psy);
  });

  it("should return a 400 if not logged-in", () => {
    try {
      axios.put(`${config.nextAuth.url}/api/admin/psychologists/1`, {
        json: defaultValues,
      });
    } catch (e) {
      expect(e.response.statusCode).toEqual(400);
    }
  });
});
