import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.entity"
import * as crypto from 'crypto'
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>,
                 private jwtService: JwtService ){}
    

async create(user: User): Promise<User> {
    const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
    if(!regEx.test(user.username)) throw new Error('Username has not the correct format');

    const hashedPassword = crypto.createHash("whirlpool").update(user.password, "binary").digest("hex")
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
    const hash = crypto.createHash("whirlpool").update(password, "binary").digest("hex")
    if(hash !== passwordFromDatabase) throw new Error('Wrong password!')
}


async checkToken(token: string) {
    const valid = this.jwtService.verify(token);
}

};
