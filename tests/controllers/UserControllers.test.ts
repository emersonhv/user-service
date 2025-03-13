import { UserController } from "../../src/controllers/UserControllers";
import { UserService } from "../../src/services/UserService";
import { UserRepositoryImpl } from "../../src/repository/UserRepositoryImpl";
import { Request, Response } from "express";
import { CustomError } from "../../src/utils/custom-errors";

jest.mock("@/services/UserService");

describe("UserController", () => {
    let userController: UserController;
    let userRepository: jest.Mocked<UserRepositoryImpl>;
    let userService: jest.Mocked<UserService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        userRepository = new UserRepositoryImpl() as jest.Mocked<UserRepositoryImpl>;
        userService = new UserService(userRepository) as jest.Mocked<UserService>;
        userController = new UserController(userService);

        jsonMock = jest.fn();
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jsonMock,
        };
    });

    test("registerUser - debe registrar un usuario y retornar status 201", async () => {
        const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
        userService.registerUser.mockResolvedValue(mockUser);

        mockRequest = {
            body: { name: "John Doe", email: "john@example.com", password: "123456" },
        };

        await userController.registerUser(mockRequest as Request, mockResponse as Response);

        expect(userService.registerUser).toHaveBeenCalledWith({
            name: "John Doe",
            email: "john@example.com",
            password: "123456",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    test("loginUser - debe devolver un token si las credenciales son válidas", async () => {
        const mockToken = { email: "john@example.com", password: "123456", token: "valid-token" };
        userService.loginUser.mockResolvedValue(mockToken);

        mockRequest = {
            body: { email: "john@example.com", password: "123456"},
        };

        await userController.loginUser(mockRequest as Request, mockResponse as Response);

        expect(userService.loginUser).toHaveBeenCalledWith("john@example.com", "123456");
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockToken);
    });

    test("loginUser - debe devolver 401 si las credenciales son inválidas", async () => {
        userService.loginUser.mockResolvedValue(null);

        mockRequest = {
            body: { email: "wrong@example.com", password: "wrongpassword" },
        };

        await userController.loginUser(mockRequest as Request, mockResponse as Response);

        expect(userService.loginUser).toHaveBeenCalledWith("wrong@example.com", "wrongpassword");
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    test("isLoginUser - debe devolver 200 si el usuario está autenticado", async () => {
        userService.isLogin.mockResolvedValue(true);

        mockRequest = { params: { token: "valid-token" } };

        await userController.isLoginUser(mockRequest as Request, mockResponse as Response);

        expect(userService.isLogin).toHaveBeenCalledWith("valid-token");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(true);
    });

    test("isLoginUser - debe devolver 401 si el usuario no está autenticado", async () => {
        userService.isLogin.mockResolvedValue(false);

        mockRequest = { params: { token: "invalid-token" } };

        await userController.isLoginUser(mockRequest as Request, mockResponse as Response);

        expect(userService.isLogin).toHaveBeenCalledWith("invalid-token");
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    });

    test("getProfile - debe devolver 200 si el usuario existe", async () => {
        const mockUserProfile = { name: "John Doe", email: "john@example.com" };
        userService.getUserProfile.mockResolvedValue(mockUserProfile);

        mockRequest = {
            body: { name: "John Doe", email: "john@example.com" },
        };

        await userController.getProfile(mockRequest as Request, mockResponse as Response);

        expect(userService.getUserProfile).toHaveBeenCalledWith({
            name: "John Doe",
            email: "john@example.com",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUserProfile);
    });

    test("getProfile - debe devolver 404 si el usuario no existe", async () => {
        userService.getUserProfile.mockResolvedValue(null);

        mockRequest = {
            body: { name: "Nonexistent", email: "nonexistent@example.com" },
        };

        await userController.getProfile(mockRequest as Request, mockResponse as Response);

        expect(userService.getUserProfile).toHaveBeenCalledWith({
            name: "Nonexistent",
            email: "nonexistent@example.com",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "User not found" });
    });
});
