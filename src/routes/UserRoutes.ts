import { Router } from "express";
import { UserController } from "@/controllers/UserControllers";
import { UserRepositoryImpl } from "@/repository/UserRepositoryImpl";
import { AuthMiddleware } from "@/middleware/AuthMiddleware";
import { UserService } from "@/services/UserService";

export class UserRoutes {
    static get routes(): Router {

        const router = Router();
        const userRepositoryImpl = new UserRepositoryImpl();
        const userService = new UserService(userRepositoryImpl);
        const controller = new UserController(userService);

        /**
         * @swagger
         * /login:
         *   post:
         *     summary: Iniciar sesión
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: Inicio de sesión exitoso
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 token:
         *                   type: string
         *       401:
         *         description: Credenciales inválidas
         */
        router.post('/login', controller.loginUser);

        /**
         * @swagger
         * /register:
         *   post:
         *     summary: Registrar un nuevo usuario
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       201:
         *         description: Usuario registrado exitosamente
         *       400:
         *         description: Error en la solicitud
         */
        router.post('/register', controller.registerUser);

        /**
         * @swagger
         * /profile:
         *   get:
         *     summary: Obtener el perfil del usuario
         *     tags: [Users]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Perfil del usuario
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 id:
         *                   type: integer
         *                 name:
         *                   type: string
         *                 email:
         *                   type: string
         *       401:
         *         description: No autorizado
         */
        router.post('/profile', AuthMiddleware.validatwJWT, controller.getProfile);

        return router;
    }
}