import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { User } from "src/infrastructure/database/sequelize/models/user.model";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

@Injectable()
export class FindUserAllUseCase {
    
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async getUserAll(): Promise<ApiResponseInterface<User>>{
        const users = await this.userRepository.findAllUser();

        if(!users){
            return {
                status: HttpStatus.NOT_FOUND,
                message: "Dados de usuários não encontrados."
            }
        }
        
        return {
            status: HttpStatus.OK,
            message: "Usuários obtidos com sucesso",
            data:users
        }
    }
}