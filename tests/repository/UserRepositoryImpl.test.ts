import { UserRepositoryImpl } from "../../src/repository/UserRepositoryImpl";
import { BcryptAdapter } from "../../src/utils/bcrypt-adapter";
import { JwtAdapter } from "../../src/utils/jwt-adapter";
import { CustomError } from "../../src/utils/custom-errors";
import PrismaClient from "../../src/config/PrismaClient";
import { LoginUserDto } from "../../src/dtos/LoginUser.dto";
import { RegisterUserDto } from "../../src/dtos/RegisterUser.dto";
import { UserProfileDto } from "../../src/dtos/UserProfile.dto";

// Mock de PrismaClient
jest.mock('@prisma/client', () => {
    const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword',
        profile: {
            bio: 'Empty bio',
        },
    };
    return {
        PrismaClient: jest.fn(() => ({
            user: {
                findFirst: jest.fn(),
                create: jest.fn(),
            },
        })),
        mockUser,
    };
});

// Mock de BcryptAdapter y JwtAdapter
jest.mock('@/utils', () => ({
    BcryptAdapter: {
        hash: jest.fn().mockReturnValue('hashedPassword'),
        compare: jest.fn().mockReturnValue(true),
    },
    JwtAdapter: {
        generateToken: jest.fn().mockResolvedValue('fakeToken'),
        validateToken: jest.fn().mockResolvedValue({ name: 'John Doe', email: 'john.doe@example.com' }),
    },
}));

describe('UserRepositoryImpl', () => {
    let userRepository: UserRepositoryImpl;
    let prisma = PrismaClient;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();

        // Crear una instancia de UserRepositoryImpl
        userRepository = new UserRepositoryImpl();

        jest.spyOn(BcryptAdapter, "hash").mockReturnValue("hashed_password");
        jest.spyOn(BcryptAdapter, "compare").mockReturnValue(true);
    });

    describe('login', () => {

        test('debería lanzar CustomError.notFound si el usuario no existe', async () => {
            // Mock de PrismaClient.user.findFirst
            (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

            await expect(userRepository.login('nonexistent@example.com', 'password')).rejects.toThrow(
                CustomError.notFound('User not found'),
            );
        });

        
    });

    describe('register', () => {
        test('debería devolver un RegisterUserDto si el registro es exitoso', async () => {
            // Mock de PrismaClient.user.findFirst
            (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

            // Mock de PrismaClient.user.create
            (prisma.user.create as jest.Mock).mockResolvedValue({
                name: 'John Doe',
                email: 'john.doe@example.com',
            });

            const registerUserDto = new RegisterUserDto('John Doe', 'john.doe@example.com', 'password');
            const result = await userRepository.register(registerUserDto);

            expect(result).toBeInstanceOf(RegisterUserDto);
            expect(result.name).toBe('John Doe');
            expect(result.email).toBe('john.doe@example.com');
        });

        test('debería lanzar CustomError.badRequest si faltan campos', async () => {
            const registerUserDto = new RegisterUserDto('', '', '');

            await expect(userRepository.register(registerUserDto)).rejects.toThrow(
                CustomError.badRequest('All fields are required'),
            );
        });

        test('debería lanzar CustomError.badRequest si el email ya existe', async () => {
            // Mock de PrismaClient.user.findFirst
            (prisma.user.findFirst as jest.Mock).mockResolvedValue({
                name: 'John Doe',
                email: 'john.doe@example.com',
            });

            const registerUserDto = new RegisterUserDto('John Doe', 'john.doe@example.com', 'password');

            await expect(userRepository.register(registerUserDto)).rejects.toThrow(
                CustomError.badRequest(`User whit email 'john.doe@example.com' already exists`),
            );
        });
    });

    describe('getProfile', () => {
        test('debería devolver un UserProfileDto si el usuario existe', async () => {
            // Mock de PrismaClient.user.findFirst
            (prisma.user.findFirst as jest.Mock).mockResolvedValue({
                name: 'John Doe',
                email: 'john.doe@example.com',
                profile: {
                    bio: 'Empty bio',
                },
            });

            const userProfileDto = new UserProfileDto('John Doe','john.doe@example.com');
            const result = await userRepository.getProfile(userProfileDto);

            expect(result).toBeInstanceOf(UserProfileDto);
            expect(result.name).toBe('John Doe');
            expect(result.email).toBe('john.doe@example.com');
            expect(result.bio).toBe('Empty bio');
        });

        test('debería lanzar CustomError.badRequest si falta el email', async () => {
            const userProfileDto = new UserProfileDto('John Doe','');

            await expect(userRepository.getProfile(userProfileDto)).rejects.toThrow(
                CustomError.badRequest('Email is required'),
            );
        });

        test('debería lanzar CustomError.notFound si el usuario no existe', async () => {
            // Mock de PrismaClient.user.findFirst
            (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

            const userProfileDto = new UserProfileDto('Non Exist','nonexistent@example.com');

            await expect(userRepository.getProfile(userProfileDto)).rejects.toThrow(
                CustomError.notFound('User not found'),
            );
        });
    });
});
