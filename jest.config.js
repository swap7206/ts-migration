module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/*.types.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.js',
    '!src/setupTests.ts',
    '!src/types/**/*',
    '!src/components/filter/filter.tsx',
    '!src/context/pokemonContext/pokemon.provider.tsx',
    '!**/*.stories.*',
    '!**/stories/**',
    '!src/**/multiSelectdropDown.stories.tsx',
    '!src/**/search.filter.stories.tsx',
    '!src/**/header.stories.tsx',
    '!src/**/loader.stories.tsx',
    '!src/**/pokemonCard.stories.tsx',
    '!src/**/colorfulTag.stories.tsx',
    '!src/**/detailsHeader.stories.tsx',
    '!src/**/evolutionChainCard.stories.tsx',
    '!src/**/propertyCard.stories.tsx',
    '!src/**/statCard.stories.tsx',
    '!src/**/tooltip.stories.tsx'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/src/**/*.stories.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/stories/',
  ],
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/src/**/*.stories.(js|jsx|ts|tsx)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(rsuite|@rsuite)/)',
  ],
};
