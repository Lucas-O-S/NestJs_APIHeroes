import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SequelizeModule } from '@nestjs/sequelize';

import {models, defineAssociations} from './models/index.model';
import { DadosHeroisModule } from './components/dados-herois/dados-herois.module';
import { MenuPrincipalModule } from './menu_principal/menu_principal.module';
import { MenuPrincipalController } from './menu_principal/menu_principal.controller';
import { TeamModule } from './components/team/team.module';
import { TeamController } from './components/team/team.controller';
import { StudioModule } from './components/studio/studio.module';
import { DadosHeroisController } from './components/dados-herois/dados-herois.controller';
import { UserModule } from './components/user/user.module';

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
    MenuPrincipalModule,
    TeamModule,
    StudioModule,
    UserModule,
  ],
  controllers: [
    DadosHeroisController,
    MenuPrincipalController, 
    TeamController, 
  ],
  providers: [],
})
export class AppModule {
  constructor() {
    defineAssociations();
  }
}
