import axios from "axios";

import { formatPsychologist } from "../format-psychologists";

jest.mock("axios");
describe("formatPsychologist", () => {
  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockImplementation(
      () => Promise.resolve({ data: {} })
    );
  });

  const partial = {
    address: "12 Rue Neuve 31000 Toulouse",
    demarcheSimplifieesId: "1",
    archived: false,
    department: "31",
    displayEmail: false,
    firstName: "Anne",
    id: 0,
    lastName: "Smith",
    state: "Accepted",
    teleconsultation: true,
  };

  it("should format psychologist", async () => {
    const result = await formatPsychologist(partial);
    expect(result).toStrictEqual({
      address: "12 Rue Neuve 31000 Toulouse",
      archived: false,
      coordinates: null,
      demarcheSimplifieesId: "1",
      department: "31",
      displayEmail: false,
      firstName: "Anne",
      id: 0,
      lastName: "SMITH",
      state: "Accepted",
      teleconsultation: true,
    });
  });

  it("should call coordinates once", async () => {
    await formatPsychologist(partial);
    expect(axios.get).toHaveBeenCalledWith(
      "https://httpbin.org/apiAdresse/?q=12%20Rue%20Neuve%2031000%20Toulouse&limit=1"
    );
  });

  it("should call coordinates twice", async () => {
    const result = await formatPsychologist({
      ...partial,
      address: "11 Rue Neuve 31000 Toulouse",
      secondAddress: "14 Rue Neuve 31000 Toulouse",
    });
    expect(result.secondAddress).toBe("14 Rue Neuve 31000 Toulouse");
    expect(axios.get).toHaveBeenCalledWith(
      "https://httpbin.org/apiAdresse/?q=11%20Rue%20Neuve%2031000%20Toulouse&limit=1"
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://httpbin.org/apiAdresse/?q=14%20Rue%20Neuve%2031000%20Toulouse&limit=1"
    );
  });

  it.each`
    input                | resultValue
    ${undefined}         | ${undefined}
    ${null}              | ${undefined}
    ${"non"}             | ${undefined}
    ${"wrong:wrong"}     | ${undefined}
    ${"wrong@com"}       | ${undefined}
    ${"valid@email.com"} | ${"valid@email.com"}
    ${"vaLiD@EMAIL.com"} | ${"valid@email.com"}
  `("should format email champs for $input", async ({ input, resultValue }) => {
    const result = await formatPsychologist({
      ...partial,
      email: input,
    });

    expect(result.email).toEqual(resultValue);
  });

  it.each`
    input                  | resultValue
    ${undefined}           | ${undefined}
    ${null}                | ${undefined}
    ${"non"}               | ${undefined}
    ${"doctolib"}          | ${undefined}
    ${"doctolib."}         | ${undefined}
    ${"doctolib. com"}     | ${undefined}
    ${"doctolib/com"}      | ${undefined}
    ${"shouldBeValid.com"} | ${undefined}
    ${"https://valid.com"} | ${"https://valid.com"}
    ${"http://valid.com"}  | ${"http://valid.com"}
    ${"http://VALID.com"}  | ${"http://valid.com"}
  `(
    "should parse website champs for $input",
    async ({ input, resultValue }) => {
      const result = await formatPsychologist({
        ...partial,
        website: input,
      });

      expect(result.website).toEqual(resultValue);
    }
  );

  it.each`
    input                               | resultValue
    ${"  Laurence  "}                   | ${"Laurence"}
    ${"Laurence"}                       | ${"Laurence"}
    ${"lauREnce"}                       | ${"Laurence"}
    ${"Marie-Christine"}                | ${"Marie-Christine"}
    ${"marie-christine"}                | ${"Marie-Christine"}
    ${"MARIE-CHRISTINE"}                | ${"Marie-Christine"}
    ${"MARIE CHRISTINE"}                | ${"Marie Christine"}
    ${"MARIE CHRISTINE Anne-CHARlotte"} | ${"Marie Christine Anne-Charlotte"}
  `(
    "should format firsName champs for $input",
    async ({ input, resultValue }) => {
      const result = await formatPsychologist({
        ...partial,
        firstName: input,
      });

      expect(result.firstName).toEqual(resultValue);
    }
  );

  it.each`
    input                       | resultValue
    ${"  Dupont  "}             | ${"DUPONT"}
    ${"Dupont"}                 | ${"DUPONT"}
    ${"DuPOnt"}                 | ${"DUPONT"}
    ${"DuPOnt de la particule"} | ${"DUPONT DE LA PARTICULE"}
  `(
    "should format lastName champs for $input",
    async ({ input, resultValue }) => {
      const result = await formatPsychologist({
        ...partial,
        lastName: input,
      });

      expect(result.lastName).toEqual(resultValue);
    }
  );
});
