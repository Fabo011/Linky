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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_credentials_1 = require("./auth.credentials");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("./user.entity");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(authCredentials, user, res) {
        const { username } = authCredentials;
        try {
            await this.authService.create(user);
            const token = await this.authService.getAuthToken(username);
            res.send(token);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Invalid username or password');
        }
    }
    ;
    async signin(authCredentials, user, res) {
        const { username, password } = authCredentials;
        try {
            const validUser = await this.authService.findUser(username);
            const passwordFromDatabase = validUser.password;
            await this.authService.checkPassword(password, passwordFromDatabase);
            const token = await this.authService.getAuthToken(username);
            res.send(token);
        }
        catch (error) {
            console.log(error);
            res.status(401).send('Wrong username or password');
        }
    }
    ;
};
__decorate([
    (0, swagger_1.ApiTags)('authentication-controller'),
    (0, swagger_1.ApiCreatedResponse)({ type: auth_credentials_1.AuthResponse }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/v1/signup'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_1.AuthCredentials, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiTags)('authentication-controller'),
    (0, swagger_1.ApiCreatedResponse)({ type: auth_credentials_1.AuthResponse }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/v1/signin'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_1.AuthCredentials, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
AuthController = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map