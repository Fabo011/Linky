import { User } from 'src/Auth/user.entity';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { HttpService } from '@nestjs/axios';
export declare class ProfileService {
    private userRepository;
    private linkRepository;
    private readonly httpService;
    constructor(userRepository: Repository<User>, linkRepository: Repository<Link>, httpService: HttpService);
    linkFormChecker(link: string): Promise<void>;
    findUser(username: string): Promise<User>;
    saveLink(link: Link): Promise<Link>;
    retriveAllLinks(username: string): Promise<Link[]>;
    deleteLink(username: string, link: string): Promise<import("typeorm").DeleteResult>;
}
