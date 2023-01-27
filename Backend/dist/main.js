"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const auth_module_1 = require("./Auth/auth.module");
const profile_module_1 = require("./profile/profile.module");
const basicAuth = require("express-basic-auth");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(cookieParser());
    app.use(['/swagger', '/docs-json'], basicAuth({
        challenge: true,
        users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Linky')
        .setDescription('Linky is a useful cloud tool to store your links secure and anonymous. Linky checks links against maleware.')
        .setVersion('1.0')
        .addTag('authentication-controller')
        .addTag('profile-controller')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [auth_module_1.AuthModule, profile_module_1.ProfileModule]
    });
    swagger_1.SwaggerModule.setup('/swagger', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map