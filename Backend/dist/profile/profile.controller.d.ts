import { LinkCredentials } from './link.credentials';
import { ProfileService } from './profile.service';
import { Response } from 'express';
import { Link } from './link.entity';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    addNewLink(linkCredentials: LinkCredentials, link: Link, res: Response): Promise<void>;
    retrieveAllLinks(username: string): Promise<Link[]>;
    deleteLink(username: string, link: string, res: Response): Promise<void>;
}
