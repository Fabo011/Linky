import { Body, Controller, HttpCode, Injectable, Post, Res, ValidationPipe } from '@nestjs/common';
import { LinkCredentials } from './link.credentials';
import { ProfileService } from './profile.service';
import { Request, Response } from 'express'
import { ApiTags } from '@nestjs/swagger';
import { Link } from './link.entity';

@Injectable()
@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @ApiTags('profile-controller')
    @HttpCode(200)
    @Post('/v1/addNewLink')
    async addNewLink(@Body(ValidationPipe) linkCredentials: LinkCredentials, @Body() link: Link, @Res() res: Response) { 
        const { username } = linkCredentials;

        try {
            await this.profileService.linkFormChecker(link.link)
            await this.profileService.findUser(username)
            // ToDo:
            // 3) check if user is premium or classic
                // if premium > continue with step 5
                    // else check step 4
            // 4) check with user link counter 
                    // if user > 50 links - error not store link
            // 5) Check link against maleware...        
            await this.profileService.saveLink(link)
           
        } catch (error) {
            console.log(error);
            res.status(401).send('ToDo: Define errors')
        }
       
    };

};
