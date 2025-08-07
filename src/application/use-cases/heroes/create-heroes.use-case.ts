import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Heroes } from "src/infrastructure/database/sequelize/models/heroes.model";
import { HeroesRepository } from "src/infrastructure/repositories/heroes.repository";
import { StudioRepository } from "src/infrastructure/repositories/studio.repository";
import { TeamRepository } from "src/infrastructure/repositories/team.repository";
import { CreateDadosHeroisDto } from "src/interface/dtos/dados-herois/create-dados-herois.dto";

@Injectable()
export class CreateHeroesUseCase {

    constructor(
        private readonly teamRepository: TeamRepository,
        private readonly studioRepository: StudioRepository,
        private readonly heroesRepository: HeroesRepository
    ){}

    async create(heroesDto: CreateDadosHeroisDto): Promise<ApiResponseInterface<Heroes>>{
        if(!await this.VerifyForeignKey(heroesDto)){
            return {
                message: "Erro ao adicionar herois",
                status : HttpStatus.BAD_REQUEST
            };
        }

        await this.heroesRepository.create(heroesDto);

        return{
            status : HttpStatus.CREATED,
            message: "Heroi adicionado com sucesso"
        }
    }

    private async VerifyForeignKey(hero){
        const teamExists = await this.teamRepository.findTeamById(hero.team_id);

        if( hero.team_id && !teamExists){
            return {
                status: false,
                message: "Equipe não encontrada."
            }
        }

        const studioExists = await this.studioRepository.findStudioById(hero.studio_id);
    
        if(hero.studio_id && !studioExists){
            return {
                status: false,
                message: "Studio não encontrado."
            }
        }
        return {
            status: true,
            message: "Dados encontrados com sucesso."
        }
        
    }
}