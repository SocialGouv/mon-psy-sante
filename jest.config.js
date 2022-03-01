module.exports = {
  testMatch: ["**/*.spec.ts"],
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/api"],
  moduleDirectories: ["<rootDir>", "node_modules"],
};

jest.setTimeout(30000);
