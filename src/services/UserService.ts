import { LoginUserDto, RegisterUserDto, UserProfileDto } from "@/dtos";
import { UserRepository } from "@/repository/UserRepository";

export class UserService {
    
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async loginUser(email: string, password: string): Promise<LoginUserDto | null> {
        return await this.userRepository.login(email, password);
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<RegisterUserDto> {
        return await this.userRepository.register(registerUserDto);
    }

    async getUserProfile(userProfileDto: UserProfileDto): Promise<UserProfileDto | null> {
        return await this.userRepository.getProfile(userProfileDto);
    }

    async isLogin(tokenUser: string): Promise<boolean> {
        return await this.userRepository.isLogin(tokenUser);
    }
}