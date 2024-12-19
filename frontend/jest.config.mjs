export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./src/tests/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "mjs"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^/vite\\.svg$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
