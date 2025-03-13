import { Request, Response } from "express";
import { UserService } from "@/services/UserService";
import { LoginUserDto, RegisterUserDto, UserProfileDto } from "@/dtos";
import { CustomError } from "@/utils/custom-errors";

export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    registerUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password }: RegisterUserDto = (req.body);
            const newUser = await this.userService.registerUser({ name, email, password });

            res.status(201).json(newUser);

        } catch (error) {
            throw CustomError.badRequest('Error registering user');
        }

    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password }: LoginUserDto = req.body;
            const loginUser = await this.userService.loginUser(email, password);

            if (!loginUser) {
                res.status(401).json({ message: 'Invalid credentials' });
            }

            res.status(201).json(loginUser);
        } catch (error) {
            throw CustomError.internalServer('Error logging in');
        }

    }

    isLoginUser = async (req: Request, res: Response) => {
        try {
            const { token } = req.params;

            const isLoginUser = await this.userService.isLogin(token);

            if (!isLoginUser) {
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                res.status(200).json(true);
            }
        } catch (error) {
            throw CustomError.internalServer('Error verifying user');
        }


    }

    getProfile = async (req: Request, res: Response) => {
        try {
            const { name, email }: UserProfileDto = req.body;

            const userProfile = await this.userService.getUserProfile({ name, email });
            if (!userProfile) {
                res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(userProfile);
        } catch (error) {
            throw CustomError.internalServer('Error getting user profile');
        }

    }
}