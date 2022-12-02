import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { LinkCredentials } from './link.credentials';
import { ProfileService } from './profile.service';
import { Request, Response } from 'express'

@Controller('profile')
export class ProfileController {
    //constructor(private profileService: ProfileService) {}

    @Post('/v1/addNewLink')
    async addNewLink(@Body(ValidationPipe) linkCredentials: LinkCredentials, @Res() res: Response) { 
        const { username } = linkCredentials;

        try {
            // ToDo:
            // 1) save data in database
           console.log(username);
           
        } catch (error) {
            console.log(error);
        }
       
    }

}
