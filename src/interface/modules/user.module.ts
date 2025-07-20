import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { AuthModule } from "../../interface/modules/auth.module";
import { UserController } from "../controllers/user.controller";
import { UserService } from "src/application/services/user.service";

@Module({
    imports: [
        SequelizeModule.forFeature(models),
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService, ],
    exports: [UserService]
})
export class UserModule {}