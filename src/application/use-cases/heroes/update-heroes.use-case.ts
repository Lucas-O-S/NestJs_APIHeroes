import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Heroes } from "src/infrastructure/database/sequelize/models/heroes.model";
import { HeroesRepository } from "src/infrastructure/repositories/heroes.repository";
import { UpdateDadosHeroisDto } from "src/interface/dtos/dados-herois/update-dados-herois.dto";

@Injectable()
export class UpdateHeroesUseCase {
    
    constructor(
        private readonly heroesRepository: HeroesRepository
    ){}

    async updateHeroes(id: number, heroesDto: UpdateDadosHeroisDto): Promise<ApiResponseInterface<Heroes>>{
        const heroesExists = await this.heroesRepository.findHeroesById(id);

        if(!heroesExists){
            return{
                status: HttpStatus.NOT_FOUND,
                message: "Não existe este herói cadastrado."
            }
        }

        await this.heroesRepository.updateHeroes(id, heroesDto);

        return{
            status: HttpStatus.OK,
            message: "Herói atualizado com sucesso."
        }
    }
}