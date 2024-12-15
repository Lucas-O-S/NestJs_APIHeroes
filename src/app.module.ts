import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:rootpassword@mongodb:27017/testdb?authSource=admin'), // Conexão com MongoDB
    //MongooseModule.forFeature([{ name: Herois.name, schema: HeroisSchema }]), // Modelos do MongoDB
    
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models, // Modelos do MySQL
      autoLoadModels: true,
      synchronize: false,
    }),
    DadosHeroisModule,
    EditoraModule,
    MenuPrincipalModule,
    EquipeModule,
    MoralidadeModule,
    OrigemModule,
    SexoModule,
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
