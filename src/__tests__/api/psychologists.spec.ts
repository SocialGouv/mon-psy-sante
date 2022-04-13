import axios from "axios";

import config from "../../services/config";

describe("/api/psychologists", () => {
  it("should return bad request if pass wrong params in query", async () => {
    let result;
    await axios
      .get(`${config.nextAuthUrl}/api/psychologists?wrong=0`)
      .catch((e) => {
        result = e;
      });
    expect(result.response.status).toEqual(400);
  });
  it("should return empty array if no params", async () => {
    const result = await axios.get(`${config.nextAuthUrl}/api/psychologists`);

    expect(result.status).toEqual(200);
    expect(result.data.length).toBeGreaterThan(1);
  });
  it("should return some results if coordinates passed", async () => {
    const result = await axios.get(
      `${config.nextAuthUrl}/api/psychologists?longitude=1.4328&latitude=43.6007`
    );

    expect(result.status).toEqual(200);
    expect(result.data.length).toBeGreaterThan(1);
  });
});
