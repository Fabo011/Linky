"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../Auth/auth.module");
const checkAuthToken_middleware_1 = require("../middleware/checkAuthToken.middleware");
const profile_controller_1 = require("./profile.controller");
const profile_service_1 = require("./profile.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../Auth/user.entity");
const link_entity_1 = require("./link.entity");
const axios_1 = require("@nestjs/axios");
let ProfileModule = class ProfileModule {
    configure(consumer) {
        consumer
            .apply(checkAuthToken_middleware_1.checkAuthTokenMiddleware)
            .forRoutes('profile/v1/addNewLink', 'profile/v1/deleteLink', 'profile/v1/retrieveAllLinks');
    }
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([link_entity_1.Link]),
            axios_1.HttpModule
        ],
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService],
        exports: [profile_service_1.ProfileService]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
;
//# sourceMappingURL=profile.module.js.map