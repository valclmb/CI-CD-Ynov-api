module.exports = {
  preset: "jest",

  testEnvironment: "node",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
