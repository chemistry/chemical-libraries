module.exports = {
  "roots": [
      "<rootDir>/packages",
  ],
  testEnvironment: "node",
  collectCoverage: true,
  "transform": {
      "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "coveragePathIgnorePatterns": [
      "/node_modules/", "/dist/"
  ],
  "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
  ],
}
