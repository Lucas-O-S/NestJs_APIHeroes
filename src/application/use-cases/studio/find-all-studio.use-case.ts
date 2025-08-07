import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Studio } from "src/infrastructure/database/sequelize/models/studio.model";
import { StudioRepository } from "src/infrastructure/repositories/studio.repository";

@Injectable()
export class FindAllStudioUseCase{

    constructor(
        private readonly studioRepository: StudioRepository
    ){}

    async findAllStudio(): Promise<ApiResponseInterface<Studio>> {
        const studioAll = await this.studioRepository.findAllStudio();

        if(!studioAll){
            return {
                status: HttpStatus.NOT_FOUND,
                message: "Studios não encontrados."
            }
        }

        return{
            status: HttpStatus.OK,
            message: "Studios encontrados com sucesso.",
            data: studioAll
        }
    }
}