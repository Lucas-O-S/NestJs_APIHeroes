import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Curiosities } from "src/infrastructure/database/sequelize/models/curiosities.model";
import { CuriosityRepository } from "src/infrastructure/repositories/curiosities.repository";

@Injectable()
export class FindCuriosityByIdUseCase {

    constructor(
        private readonly curiosityRepository: CuriosityRepository
    ){}

    async findCuriosityById(id: number): Promise<ApiResponseInterface<Curiosities>>{
        const curiosity = await this.curiosityRepository.findCuriosityById(id);

        if(!curiosity){
            return{
                status: HttpStatus.NOT_FOUND,
                message: "Nenhuma curiosidade encontrada."
            }
        }

        return{
            status: HttpStatus.OK,
            message: "Curiosidade encontrada com sucesso.",
            dataUnit: curiosity
        }
    }
}