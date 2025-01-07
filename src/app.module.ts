import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SequelizeModule } from '@nestjs/sequelize';

import {models, defineAssociations} from './models/index.model';
import { DadosHeroisController } from './dados-herois/dados-herois.controller';
import { DadosHeroisModule } from './dados-herois/dados-herois.module';
import { EditoraModule } from './editora/editora.module';
import { EditoraController } from './editora/editora.controller';
import { MenuPrincipalModule } from './menu_principal/menu_principal.module';
import { MenuPrincipalController } from './menu_principal/menu_principal.controller';
import { EquipeModule } from './equipe/equipe.module';
import { EquipeController } from './equipe/equipe.controller';
import { MoralidadeModule } from './moralidade/moralidade.module';
import { MoralidadeController } from './moralidade/moralidade.controller';
import { OrigemModule } from './origem/origem.module';
import { SexoModule } from './sexo/sexo.module';
import { SexoController } from './sexo/sexo.controller';
import { StudioModule } from './studio/studio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite o uso de variáveis globais
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    // Conexão MySQL
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models, // Seus modelos
      autoLoadModels: true,
      synchronize: false, // Desative no ambiente de produção
    }),
    DadosHeroisModule,
    EditoraModule,
    MenuPrincipalModule,
    EquipeModule,
    MoralidadeModule,
    OrigemModule,
    SexoModule,
    StudioModule,
  ],
  controllers: [
    DadosHeroisController,
    EditoraController, 
    MenuPrincipalController, 
    EquipeController, 
    MoralidadeController,
    SexoController
  ],
  providers: [],
})
export class AppModule {
  constructor() {
    defineAssociations();
  }
}
