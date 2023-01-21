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
            await this.profileService.saveLink(link)
            res.status(200).send('Successfully stored link') 
        } catch (error) {
            console.log(error);
            res.status(401).send('Link was maleformed or invalid!')
        } 
    };


    @ApiTags('profile-controller')
    @HttpCode(200)
    @Post('/v1/retrieveAllLinks')
    async retrieveAllLinks(@Body('username') username: string) {
        return this.profileService.retriveAllLinks(username)
    };


    @ApiTags('profile-controller')
    @HttpCode(200)
    @Post('/v1/deleteLink/')
    async deleteLink(@Body('username') username: string, @Body('link') link: string, @Res() res: Response) {
        try {
            await this.profileService.deleteLink(username, link)
            res.status(200).send('Link successfully deleted') 
        } catch (error) {
            console.error(error)
            res.status(401).send('Invalid action')
        }
    };

};
