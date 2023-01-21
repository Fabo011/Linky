import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/Auth/user.entity'
import { Repository } from 'typeorm'
import { Link } from './link.entity'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class ProfileService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Link) private linkRepository: Repository<Link>,
    private readonly httpService: HttpService
    ){}

async linkFormChecker(link: string) {
    const regEx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    if(!regEx.test(link)) throw new Error('Link is invalid')
}

async findUser(username: string): Promise<User> {
    return this.userRepository.findOneByOrFail({username})
}

async saveLink(link: Link): Promise<Link> {
    const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
    if(!regEx.test(link.username)) throw new Error('Username has not the correct format');
    return this.linkRepository.save(link);
}

async retriveAllLinks(username: string) {
    return this.linkRepository.find({where: {username}})
}

async deleteLink(username: string, link: string) {
    return this.linkRepository.delete({ username, link })
}

};
