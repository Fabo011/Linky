import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.entity"
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>,
                 private jwtService: JwtService ){}
    

async create(user: User): Promise<User> {
    const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
    if(!regEx.test(user.username)) throw new Error('Username has not the correct format');

    const Salt = 10;
    const hashedPassword = await bcrypt.hash(user.password, Salt);
    user.password = hashedPassword;

    return this.userRepository.save(user)
}

async getAuthToken(username: string) {
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return token;
}

async findUser(username: string): Promise<User> {
    return this.userRepository.findOneByOrFail({username})
}

async checkPassword(password: string, passwordFromDatabase: string) {
    const isMatch = await bcrypt.compare(password, passwordFromDatabase);
    if(!isMatch) throw new Error('Wrong password!');
}


async checkToken(token: string) {
    const valid = this.jwtService.verify(token);
}

};
