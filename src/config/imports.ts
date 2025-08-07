import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dialect } from "sequelize";
import { AuthModule } from "src/interface/modules/auth.module";
import { MenuPrincipalModule } from "src/interface/modules/menu_principal.module";
import { models } from "src/infrastructure/database/sequelize/models/index.model";
import { ArticleModule } from "src/interface/modules/articles.module";
import { DadosHeroisModule } from "src/interface/modules/dados-herois.module";
import { TeamModule } from "src/interface/modules/team.module";
import { StudioModule } from "src/interface/modules/studio.module";
import { UserModule } from "src/interface/modules/user.module";
import { CuriositiesModule } from "src/interface/modules/curiosities.module";
import { QuizModule } from "src/interface/modules/quiz.module";


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
    QuizModule
]