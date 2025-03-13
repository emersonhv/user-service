/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest', // Usar ts-jest para TypeScript
  testEnvironment: 'node', // Entorno de pruebas (node o jsdom)
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Patrón para encontrar archivos de prueba
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};