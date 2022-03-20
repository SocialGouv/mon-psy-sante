import axios from "axios";

import config from "../../services/config";

describe("/api/psychologists", () => {
  it("should return empty array if no params", async () => {
    const result = await axios.get(`${config.nextAuthUrl}/api/psychologists`);

    expect(result.status).toEqual(200);
    expect(result.data).toEqual([]);
  });
});
