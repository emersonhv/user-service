import { Post } from "./Post";
import { User } from "./User";

export class Like {
    constructor(
        public id: number,
        public userId: string,
        public postId: string,
        public user?: User
    ) { }
}