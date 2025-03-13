// tests/PrismaClientSingleton.spec.ts
import PrismaClientSingleton from '../../src/config/PrismaClient'; // Ajusta la ruta según tu estructura
import { PrismaClient } from '@prisma/client';

// Mock de PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    // Puedes añadir métodos mockeados de PrismaClient si es necesario
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('PrismaClientSingleton', () => {
  beforeEach(() => {
    // Limpiar todas las instancias y llamadas a constructor
    jest.clearAllMocks();
  });

  test('debería devolver la misma instancia de PrismaClient', () => {
    const instance1 = PrismaClientSingleton;
    const instance2 = PrismaClientSingleton;

    // Verificar que ambas instancias sean iguales
    expect(instance1).toBe(instance2);
  });
});