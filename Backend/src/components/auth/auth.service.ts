import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async usernameValidation( username: string ) {
        const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
        if(!regEx.test(username) || username.length < 5) throw new Error('Username have not the correct format');
    }

}
