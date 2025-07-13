import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Heroes } from "../database/sequelize/models/heroes.model";
import { CreateDadosHeroisDto } from "src/interface/dtos/dados-herois/create-dados-herois.dto";

@Injectable()
export class HeroesRepository {
    
    constructor(
        @InjectModel(Heroes) private readonly heroesModel: typeof Heroes
    ){}

    async create(heroesDto: CreateDadosHeroisDto): Promise<Heroes | null>{
        return await this.heroesModel.create(heroesDto);
    }

    async findAllHeroes(): Promise<Heroes[] | null>{
        return await this.heroesModel.findAll();
    }
}