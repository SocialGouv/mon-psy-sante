import axios from "axios";

import getAddressCoordinates from "../getAddressCoordinates";

jest.mock("axios");
describe("getAddressCoordinates.ts", () => {
  it.each`
    title              | features     | resultValue
    ${"no results"}    | ${undefined} | ${null}
    ${"empty results"} | ${[]}        | ${null}
    ${"valid results"} | ${[{
    geometry: { coordinates: [1, 2] },
    properties: { score: 0.8 },
  }]} | ${{ latitude: 2, longitude: 1 }}
    ${"score too small"} | ${[{
    geometry: { coordinates: [1, 2] },
    properties: { score: 0.1 },
  }]} | ${null}
  `(
    "should handle api response for $title",
    async ({ features, resultValue }) => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: { features: features } })
      );
      const result = await getAddressCoordinates("123", "My Address");

      expect(result).toEqual(resultValue);
    }
  );
});
