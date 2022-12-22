import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { LinkCredentials } from './link.credentials';
import { ProfileService } from './profile.service';
import { Request, Response } from 'express'
import { ApiTags } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
    //constructor(private profileService: ProfileService) {}

    @ApiTags('profile-controller')
    @Post('/v1/addNewLink')
    async addNewLink(@Body(ValidationPipe) linkCredentials: LinkCredentials, @Res() res: Response) { 
        const { username } = linkCredentials;

        try {
            // ToDo:
            // 1) check if the link is a valid url
            // 2) check if username exists
            // 3) check if user is premium or classic
                // if premium > continue with step 5
                    // else check step 4
            // 4) check with user link counter 
                    // if user > 50 links - error not store link
            // 5) Check link against maleware...        
            // 6) save data in database
           console.log(username);
           
        } catch (error) {
            console.log(error);
        }
       
    }

}
