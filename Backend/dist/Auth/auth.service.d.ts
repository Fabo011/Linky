import { Repository } from "typeorm";
import { User } from "./user.entity";
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(user: User): Promise<User>;
    getAuthToken(username: string): Promise<string>;
    findUser(username: string): Promise<User>;
    checkPassword(password: string, passwordFromDatabase: string): Promise<void>;
    checkToken(token: string): Promise<void>;
}
