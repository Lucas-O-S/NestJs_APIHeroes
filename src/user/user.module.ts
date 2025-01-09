import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { models} from '../models/index.model';

@Module({
    imports: [SequelizeModule.forFeature(models)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}