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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkCredentials = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LinkCredentials {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(12, { message: 'Username is too long' }),
    __metadata("design:type", String)
], LinkCredentials.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Linkname must have atleast 3 characters!' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Linkname is too long, make sure that you have not more then 20 characters!' }),
    __metadata("design:type", String)
], LinkCredentials.prototype, "linkname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Linkdescription must have atleast 3 characters!' }),
    (0, class_validator_1.MaxLength)(60, { message: 'Linkdescription is too long, make sure that you have not more then 60 characters!' }),
    __metadata("design:type", String)
], LinkCredentials.prototype, "linkdescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5, { message: 'Link must have atleast 5 characters!' }),
    (0, class_validator_1.MaxLength)(800, { message: 'link is too long, make sure that you have not more then 20 characters!' }),
    __metadata("design:type", String)
], LinkCredentials.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Category must have atleast 3 characters!' }),
    (0, class_validator_1.MaxLength)(15, { message: 'Category naming is too long, make sure that you have not more then 15 characters!' }),
    __metadata("design:type", String)
], LinkCredentials.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LinkCredentials.prototype, "token", void 0);
exports.LinkCredentials = LinkCredentials;
//# sourceMappingURL=link.credentials.js.map