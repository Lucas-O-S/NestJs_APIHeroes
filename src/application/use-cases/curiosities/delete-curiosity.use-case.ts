import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { CuriosityRepository } from "src/infrastructure/repositories/curiosities.repository";

@Injectable()
export class DeleteCuriosityUseCase {

    constructor(
        private readonly curiosityRepository: CuriosityRepository
    ){}

    async DeleteCuriosity(id:number): Promise<ApiResponseInterface<number>>{
        const curiosityDelete = await this.curiosityRepository.deleteCuriosity(id);

        if(curiosityDelete === 0){
            return {
                status:HttpStatus.NOT_FOUND,
                message: "Não foi encontrado a curiosidade para ser removida"
            }
        }

        return {
            status: HttpStatus.OK,
            message: "Curiosidade removida com sucesso"
        }
    }
}