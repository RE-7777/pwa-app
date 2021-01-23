import { User } from './user';


export class Comment {
    user: User;
    message: string;
    key?: string;
    date: number;
    isEdit: boolean;

    constructor (value: any) {
        this.isEdit = true;
        this.user = value.user;
        this.message = value.message;

        this.date = value.Data || Date.now();
        if (value.key) {
            this.key = value.key;

        }
    }
}
