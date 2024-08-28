import {  Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EditoraController } from "./editora.controller";
import { models } from "../models/index.model";
import { EditoraService } from "./editora.service";

@Module({
    imports: [SequelizeModule.forFeature(models)], 
    controllers: [EditoraController],
    providers: [EditoraService],
    exports: [EditoraService]
})
export class EditoraModule {}