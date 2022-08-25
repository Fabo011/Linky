import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { pool } from 'src/database/connection';

@Injectable()
export class AuthService {

    async usernameValidation( username: string ) {
        const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
        if(!regEx.test(username) || username.length < 5) throw new Error('Username have not the correct format');
    }

    async passwordValidation( password: string ) {
        if ( password.length <= 9 || password.length > 50 ) throw new Error('Password have not the valid format');
    }

    async hashPassword( password: string ) {
        const hash = createHash('whirlpool').update(password, 'binary').digest('hex');
        return hash; 
    }

    async saveUserInDatabase( username: string, hash: any ) {
        const client = await pool.connect();
        await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash]);
    }

}
