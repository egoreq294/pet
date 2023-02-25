/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      babelConfig: {
        comments: false,
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      },
    },
  },
  roots: ['<rootDir>/src/'],
  transform: {
    '^.\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|svg|png|jpeg)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
  },
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!src/**/graphql/**'],
  setupFilesAfterEnv: ['<rootDir>/utils/setuoTests.js'],
  coverageDirectory: 'coverage',
  jestTimeout: 60000,
};
