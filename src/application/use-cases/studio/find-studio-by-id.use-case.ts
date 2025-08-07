import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Studio } from "src/infrastructure/database/sequelize/models/studio.model";
import { StudioRepository } from "src/infrastructure/repositories/studio.repository";

@Injectable()
export class FindStudioByIdUseCase {

    constructor(
        private readonly studioRepository: StudioRepository
    ){}

    async findStudioById(id: number): Promise<ApiResponseInterface<Studio>>{
        const studio = await this.studioRepository.findStudioById(id);

        if(!studio){
            return {
                status: HttpStatus.NOT_FOUND,
                message: "Nenhum studio foi encontrado."
            }
        }

        return {
            status: HttpStatus.OK,
            message: "Studio encontrado com sucesso.",
            dataUnit: studio
        }
    }
}