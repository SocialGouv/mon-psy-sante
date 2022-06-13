const nextJest = require('next/jest');

const createJestConfig = nextJest();

module.exports = createJestConfig({
  testMatch: ["**/*.spec.ts"],
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/api"],
  moduleDirectories: ["<rootDir>", "node_modules"],
  testTimeout: 30000
});


