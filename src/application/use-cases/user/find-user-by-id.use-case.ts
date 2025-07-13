import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../../services/user.service";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { User } from "src/infrastructure/database/sequelize/models/user.model";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async getUserById(id: number): Promise<ApiResponseInterface<User>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Dado não encontrado',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Busca realizada com sucesso',
      dataUnit: user,
    };
  }
}
