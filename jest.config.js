module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/node_modules/**',
    '!src/**/test-utils/**',
    '!src/**/types/**',
    '!src/app/layout.tsx',
    '!src/app/loading.tsx',
    '!src/app/not-found.tsx',
    '!src/app/ErrorBoundary.tsx',
    '!src/app/StoreProvider.tsx',
    '!src/app/page.tsx',
    '!src/app/authorization/firebase.ts',
    '!src/store/graphiqlFeatures/graphiqlSlice.ts',
    '!src/store/restfulSlice.ts',
    '!src/app/authorization/validationSchemas.ts',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
};
