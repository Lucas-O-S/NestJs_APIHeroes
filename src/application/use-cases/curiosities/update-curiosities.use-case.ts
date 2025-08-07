import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Curiosities } from "src/infrastructure/database/sequelize/models/curiosities.model";
import { CuriosityRepository } from "src/infrastructure/repositories/curiosities.repository";
import { UpdateCuriositiesDto } from "src/interface/dtos/curiosities/curiositiesUpdate.dto";

@Injectable()
export class UpdateCuriosityUseCase {

    constructor(
        private readonly curiosityRepository: CuriosityRepository
    ){}
    
    async updateCuriosity(id:number, curiosityDtio:UpdateCuriositiesDto): Promise<ApiResponseInterface<Curiosities>>{
        const curiosityExists = await this.curiosityRepository.findCuriosityById(id);

        if(!curiosityExists){
            return{
                status:HttpStatus.NOT_FOUND,
                message: "Curiosidade não encontrada."
            }
        }

        await this.curiosityRepository.updateCuriosity(id, curiosityDtio);

        return{
            status: HttpStatus.OK,
            message: "Curiosidade atualizada com sucesso.",
        }
    }
}