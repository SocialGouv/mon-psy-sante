import { isAdeliIdValidDepartment } from "../../cron/demarchesSimplifiees";

describe("isAdeliIdValidDepartment", () => {
  it("should return true if adeliId is valid for department", () => {
    expect(isAdeliIdValidDepartment("311234567", "31")).toBe(true);
    expect(isAdeliIdValidDepartment("9A1234567", "971")).toBe(true);
    expect(isAdeliIdValidDepartment("9B1234567", "972")).toBe(true);
    expect(isAdeliIdValidDepartment("031234567", "03")).toBe(true);
  });
  it("should return false if adeliId is not valid for department", () => {
    expect(isAdeliIdValidDepartment("311234567", "971")).toBe(false);
    expect(isAdeliIdValidDepartment("9A1234567", "31")).toBe(false);
    expect(isAdeliIdValidDepartment("9B1234567", "973")).toBe(false);
    expect(isAdeliIdValidDepartment("031234567", "03")).toBe(true);
  });
});
