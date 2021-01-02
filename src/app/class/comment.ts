import { User } from './user';


export class Comment {

    date: number;
    constructor (public user:User, public message:String) {
        this.date = Date.now();
    }
}
