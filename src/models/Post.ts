import { Like } from "./Like";
import { User } from "./User";

export class Post {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public authorId: number,
        public user?: User,
        public likes?: Like[]
    ) { }
}