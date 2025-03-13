export class UserProfileDto {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly bio?: string
    ){}
}