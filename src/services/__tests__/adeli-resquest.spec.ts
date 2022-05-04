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
    input
    ${"123"}
    ${"1 2    3"}
    ${"1.2...3"}
    ${"00/00/01/23"}
  `("should call api endpoint if adeli is $input", async ({ input }) => {
    const result = await requestAdeli(input);
    expect(axios.get).toHaveBeenCalledWith(
      "https://datasette-ps-libre-acces.dev.fabrique.social.gouv.fr/PS_LibreAcces/PS_LibreAcces_Personne_activite.json",
      { params: { "Identification nationale PP__exact": "0000000123" } }
    );
    expect(result).toEqual([]);
  });
});
