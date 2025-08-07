import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Heroes } from "../database/sequelize/models/heroes.model";
import { CreateDadosHeroisDto } from "src/interface/dtos/dados-herois/create-dados-herois.dto";
import { UpdateDadosHeroisDto } from "src/interface/dtos/dados-herois/update-dados-herois.dto";

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

    async findHeroesById(id: number): Promise<Heroes | null>{
        return await this.heroesModel.findOne({where: {id}});
    }

    async updateHeroes(id:number, heroesDto: UpdateDadosHeroisDto): Promise<void>{
        const hero = new Heroes(heroesDto);
        await this.heroesModel.update(hero, {where: {id}});
    }

    async DeleteHeroes(id: number): Promise<number>{
        return await this.heroesModel.destroy({where: {id}});
    }
}