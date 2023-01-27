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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
require("dotenv/config");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(user) {
        const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
        if (!regEx.test(user.username))
            throw new Error('Username has not the correct format');
        const Salt = 10;
        const hashedPassword = await bcrypt.hash(user.password, Salt);
        user.password = hashedPassword;
        return this.userRepository.save(user);
    }
    async getAuthToken(username) {
        const payload = { username };
        const token = this.jwtService.sign(payload);
        return token;
    }
    async findUser(username) {
        return this.userRepository.findOneByOrFail({ username });
    }
    async checkPassword(password, passwordFromDatabase) {
        const isMatch = await bcrypt.compare(password, passwordFromDatabase);
        if (!isMatch)
            throw new Error('Wrong password!');
    }
    async checkToken(token) {
        const valid = this.jwtService.verify(token);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
;
//# sourceMappingURL=auth.service.js.map