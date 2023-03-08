import { AuthCredentials } from './auth.credentials';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(authCredentials: AuthCredentials, user: User, res: Response): Promise<void>;
    signin(authCredentials: AuthCredentials, user: User, res: Response): Promise<void>;
}
