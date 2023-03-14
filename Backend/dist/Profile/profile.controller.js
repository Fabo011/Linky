"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const link_credentials_1 = require("./link.credentials");
const profile_service_1 = require("./profile.service");
const swagger_1 = require("@nestjs/swagger");
const link_entity_1 = require("./link.entity");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async addNewLink(linkCredentials, link, res) {
        const { username } = linkCredentials;
        try {
            await this.profileService.linkFormChecker(link.link);
            await this.profileService.findUser(username);
            await this.profileService.saveLink(link);
            res.status(200).send('Successfully stored link');
        }
        catch (error) {
            console.log(error);
            res.status(401).send('Link was maleformed or invalid!');
        }
    }
    ;
    async retrieveAllLinks(username) {
        return this.profileService.retriveAllLinks(username);
    }
    ;
    async deleteLink(username, link, res) {
        try {
            await this.profileService.deleteLink(username, link);
            res.status(200).send('Link successfully deleted');
        }
        catch (error) {
            console.error(error);
            res.status(401).send('Invalid action');
        }
    }
    ;
    async retrievePasswordResetToken(username) {
        try {
            const user = await this.profileService.findUser(username);
            const passwordResetToken = user.passwordResetToken;
            return { passwordResetToken };
        }
        catch (error) {
            console.error(error);
            return 'Invalid action';
        }
    }
    ;
};
__decorate([
    (0, swagger_1.ApiTags)('profile-controller'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/v1/addNewLink'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [link_credentials_1.LinkCredentials, link_entity_1.Link, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "addNewLink", null);
__decorate([
    (0, swagger_1.ApiTags)('profile-controller'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/v1/retrieveAllLinks'),
    __param(0, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "retrieveAllLinks", null);
__decorate([
    (0, swagger_1.ApiTags)('profile-controller'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/v1/deleteLink'),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('link')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteLink", null);
__decorate([
    (0, swagger_1.ApiTags)('profile-controller'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/v1/retrievePasswordResetToken'),
    __param(0, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "retrievePasswordResetToken", null);
ProfileController = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
;
//# sourceMappingURL=profile.controller.js.map