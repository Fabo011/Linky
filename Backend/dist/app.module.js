"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./Auth/auth.module");
const auth_controller_1 = require("./Auth/auth.controller");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const profile_module_1 = require("./profile/profile.module");
require("dotenv/config");
const profile_controller_1 = require("./profile/profile.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                'type': 'postgres',
                'host': '192.168.1.161',
                'port': 5432,
                'username': process.env.DB_USERNAME,
                'password': process.env.DB_PASSWORD,
                'entities': ['dist/**/*.entity{.ts,.js}'],
                "synchronize": true,
            }), auth_module_1.AuthModule, profile_module_1.ProfileModule
        ],
        controllers: [auth_controller_1.AuthController, app_controller_1.AppController, profile_controller_1.ProfileController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map