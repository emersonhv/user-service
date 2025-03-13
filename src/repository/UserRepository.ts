import { LoginUserDto, RegisterUserDto, UserProfileDto } from "@/dtos";

export abstract class UserRepository {

    abstract login(email: string, password: string): Promise<LoginUserDto>;

    abstract register(registerUserDto: RegisterUserDto): Promise<RegisterUserDto>;

    abstract isLogin(tokenUser: string): Promise<boolean>;

    abstract getProfile(userProfileDto: UserProfileDto): Promise<UserProfileDto>;
}