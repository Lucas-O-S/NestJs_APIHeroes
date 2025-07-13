import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dialect } from "sequelize";
import { AuthModule } from "src/interface/modules/auth.module";
import { DadosHeroisModule } from "src/components/dados-herois/dados-herois.module";
import { StudioModule } from "src/components/studio/studio.module";
import { TeamModule } from "src/components/team/team.module";
import { UserModule } from "../components/user/user.module";
import { MenuPrincipalModule } from "src/interface/modules/menu_principal.module";
import { models } from "src/infrastructure/database/sequelize/models/index.model";
import { CuriositiesModule } from "src/components/curiosities/curiosities.Module";
import { ArticleModule } from "src/interface/modules/articles.Module";


export const Imports = [
    ConfigModule.forRoot({
        envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService): any=>{
            return{
                dialect: 'mysql' as Dialect,
                host: config.get('DB_HOST'),
                port: config.get('DB_PORT'),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_NAME'),
                autoLoadModels: true, 
                synchronize: false, 
                models: models,
            }
        },
        inject: [ConfigService]
    }),
    DadosHeroisModule,
    MenuPrincipalModule,
    TeamModule,
    StudioModule,
    UserModule,
    AuthModule,
    CuriositiesModule,
    ArticleModule,

]