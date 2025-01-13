import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from 'src/models/index.model';
import { AuthService } from "src/auth/auth.service";

@Module({
    imports: [SequelizeModule.forFeature(models), AuthService],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}