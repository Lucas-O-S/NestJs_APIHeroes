import { Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { CreateDadosHeroisDto } from "src/interface/dtos/dados-herois/create-dados-herois.dto";
import { CreateHeroesUseCase } from "../use-cases/heroes/create-heroes.use-case";
import { Heroes } from "src/infrastructure/database/sequelize/models/heroes.model";
import { FindAllHeroesUseCase } from "../use-cases/heroes/find-all-heroes.use-case";
import { FindHeroesByIdUseCase } from "../use-cases/heroes/find-heroes-by-id.use-case";
import { UpdateHeroesUseCase } from "../use-cases/heroes/update-heroes.use-case";
import { UpdateDadosHeroisDto } from "src/interface/dtos/dados-herois/update-dados-herois.dto";
import { DeleteHeroesUseCase } from "../use-cases/heroes/delete-heroes.use-case";

@Injectable()
export class DataHeroesService {
    
    constructor(
        private readonly createHeroesUseCase: CreateHeroesUseCase,
        private readonly findAllHeroesUseCase: FindAllHeroesUseCase,
        private readonly findHeroesByIdUseCase: FindHeroesByIdUseCase,
        private readonly updateHeroesUseCase: UpdateHeroesUseCase,
        private readonly deleteHeroesUseCase: DeleteHeroesUseCase
    ){}

    async create(heroesDto: CreateDadosHeroisDto): Promise<ApiResponseInterface<Heroes>>{
        return await this.createHeroesUseCase.create(heroesDto);
    }

    async findAllHeroes(): Promise<ApiResponseInterface<Heroes>>{
        return await this.findAllHeroesUseCase.findAllHeroes();
    }

    async findHeroesById(id: number): Promise<ApiResponseInterface<Heroes>>{
        return await this.findHeroesByIdUseCase.findHeroesById(id);
    }

    async updateHeroes(id: number, heroesDto: UpdateDadosHeroisDto): Promise<ApiResponseInterface<any>>{
        return await this.updateHeroesUseCase.updateHeroes(id, heroesDto);
    }

    async DeleteHeroes(id: number): Promise<ApiResponseInterface<number>>{
        return await this.deleteHeroesUseCase.DeleteHeroes(id);
    }
}