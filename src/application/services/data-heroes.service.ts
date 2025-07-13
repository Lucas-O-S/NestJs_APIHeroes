import { Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { CreateDadosHeroisDto } from "src/interface/dtos/dados-herois/create-dados-herois.dto";
import { CreateHeroesUseCase } from "../use-cases/heroes/create-heroes.use-case";
import { Heroes } from "src/infrastructure/database/sequelize/models/heroes.model";
import { FindAllHeroesUseCase } from "../use-cases/heroes/find-all-heroes.use-case";

@Injectable()
export class DataHeroesService {
    
    constructor(
        private readonly createHeroesUseCase: CreateHeroesUseCase,
        private readonly findAllHeroesUseCase: FindAllHeroesUseCase
    ){}

    async create(heroesDto: CreateDadosHeroisDto): Promise<ApiResponseInterface<Heroes>>{
        return await this.createHeroesUseCase.create(heroesDto);
    }

    async findAllHeroes(): Promise<ApiResponseInterface<Heroes>>{
        return await this.findAllHeroesUseCase.findAllHeroes();
    }
}