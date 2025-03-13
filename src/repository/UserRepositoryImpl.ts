import { UserRepository } from "./UserRepository";
import { BcryptAdapter, JwtAdapter } from "@/utils";
import { CustomError } from "@/utils/custom-errors";
import PrismaClient from "@/config/PrismaClient";
import { LoginUserDto, RegisterUserDto, UserProfileDto } from "@/dtos";

export class UserRepositoryImpl implements UserRepository {

    constructor() { }

    async login(email: string, password: string): Promise<LoginUserDto> {

        try {
            const user = await PrismaClient.user.findFirst({ where: { email: email } });

            if (!user) throw CustomError.notFound('User not found');

            const isMatching = BcryptAdapter.compare(password, user.password);

            if (!isMatching) throw CustomError.badRequest('Incorrect credentials');

            const token = await JwtAdapter.generateToken({name: user.name, email: user.email}, '2h');

            return new LoginUserDto(user.email, token!);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<RegisterUserDto> {

        const { name, email, password } = registerUserDto;

        try {

            if (!name || !email || !password) throw CustomError.badRequest('All fields are required');

            const emailExist = await PrismaClient.user.findFirst({ where: { email: email }});
            
            if (emailExist) throw CustomError.badRequest(`User whit email '${email}' already exists`);

            const user = await PrismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: BcryptAdapter.hash(password!),
                    profile: {
                        create: {
                            bio: 'Empty bio'
                        }
                    }
                }
            });

            return new RegisterUserDto(user.name, user.email);
            
        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
            
        }
    }

    async isLogin(tokenUser: string): Promise<boolean> {
        try {
            const tokenIsValid = await JwtAdapter.validateToken(tokenUser);

            if (!tokenIsValid) return false;

            return true;

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getProfile(userProfileDto: UserProfileDto): Promise<UserProfileDto> {
        const { email } = userProfileDto;

        if (!email) throw CustomError.badRequest('Email is required');

        try {
            const user = await PrismaClient.user.findFirst({ 
                where: { email: email },
                include: {
                    profile: true,
                }
            });

            if (!user) throw CustomError.notFound('User not found');

            return new UserProfileDto(user.name, user.email, user.profile!.bio);
             
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}