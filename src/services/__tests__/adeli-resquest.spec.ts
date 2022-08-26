import axios from "axios";

import { requestAdeli } from "../adeli/request";

jest.mock("axios");
describe("requestAdeli", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockReset();
    // @ts-ignore
    axios.get.mockImplementation(() => Promise.resolve({ data: { rows: [] } }));
  });

  it.each`
    input
    ${undefined}
    ${null}
    ${""}
  `("should throw error when adeli is $input", async ({ input }) => {
    await expect(requestAdeli(input)).rejects.toEqual("numeroAdeli empty");
  });

  it.each`
    input            | expected
    ${"123"}         | ${"0000000123"}
    ${"1 2    3"}    | ${"0000000123"}
    ${"1.2...3"}     | ${"0000000123"}
    ${"00/00/01/23"} | ${"0000000123"}
    ${"123zzz"}      | ${"0000000123"}
    ${"9F1234567"}   | ${"09F1234567"}
    ${"2A 1234 567"} | ${"02A1234567"}
  `(
    "should call api endpoint if adeli is $input",
    async ({ input, expected }) => {
      const result = await requestAdeli(input);
      expect(axios.get).toHaveBeenCalledWith(
        "https://datasette-ps-libre-acces.dev.fabrique.social.gouv.fr/PS_LibreAcces/PS_LibreAcces_Personne_activite.json",
        { params: { "Identification nationale PP__exact": expected } }
      );
      expect(result).toEqual([]);
    }
  );
});
