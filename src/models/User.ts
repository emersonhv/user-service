import { Post } from "./Post";
import { Like } from "./Like";
import { Profile } from "./Profile";

export class User {

    constructor(
        public id: number, 
        public name: string, 
        public email: string, 
        public profile: Profile,
        public password?: string,
        public posts?: Post[],
        public likes?: Like[]
    ) {}
}