import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
    constructor( @InjectRepository(User) private userRepository: Repository<User> ){}
    
//async usernameValidation(username: string) {
//    const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
//    if(!regEx.test(username)) throw new Error('Username have not the correct format');
//}

/*async hashPassword(password: string) {
    const Salt = 10;
    const hashedPassword = await bcrypt.hash(password, Salt);
    return hashedPassword;
}*/

create(user: User): Promise<User> {
    return this.userRepository.save(user);
}

//findUser(user: User) {
//    return this.userRepository.findOneBy(user)
//}

}
