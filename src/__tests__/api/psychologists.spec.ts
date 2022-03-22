import axios from "axios";

import config from "../../services/config";

describe("/api/psychologists", () => {
  it("should return empty array if no params", async () => {
    const result = await axios.get(
      `${config.nextAuthUrl}/api/psychologists?pageindex=0`
    );

    expect(result.status).toEqual(200);
    expect(result.data.length).toBeGreaterThan(1);
  });
  it("should return some results if coordinates passed", async () => {
    const result = await axios.get(
      `${config.nextAuthUrl}/api/psychologists?pageindex=0&longitude=1.4328&latitude=43.6007`
    );

    expect(result.status).toEqual(200);
    expect(result.data.length).toBeGreaterThan(1);
  });
});
