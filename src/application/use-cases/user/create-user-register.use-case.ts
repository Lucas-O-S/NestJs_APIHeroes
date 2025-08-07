import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../../services/user.service";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { User } from "src/infrastructure/database/sequelize/models/user.model";
import { CreateUserDTO } from "src/interface/dtos/user/userCreate.dto";
import { RoleService } from "src/application/services/role.service";
import { AuthService } from "src/application/services/auth.service";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

@Injectable()
export class CreateUserRegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    private readonly authService: AuthService
    ) {}

  async register(userDto: CreateUserDTO): Promise<ApiResponseInterface<User>> {
    const exists = await this.userRepository.findByEmail(userDto.firstemail);

    if (exists) {
        return {
        status: HttpStatus.CONFLICT,
        message: 'Usuário já existe',
        };
    }

    const senhaHash = await this.authService.generateHash(userDto.password);

    if (!senhaHash) {
        return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Erro ao gerar hash da senha.',
        };
    }

    userDto.password = senhaHash;

    const userCreated = await this.userRepository.create(userDto);
    
    if (!userCreated) {
        return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro ao criar o usuário.',
        };
    }

    await this.roleService.assignDefaultRole(userCreated.id); 

    return {
        status: HttpStatus.CREATED,
        message: 'Usuário registrado com sucesso',
        dataUnit: userCreated,
    };
  }

}
