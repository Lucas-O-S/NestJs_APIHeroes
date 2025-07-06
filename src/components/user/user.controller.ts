import { 
  BadRequestException,
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put 
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/userCreate.dto";
import { UpdateUserDTO } from "./dto/userUpdate.dto";
import { ApiResponseInterface } from "../../interfaces/APIResponse.interface";
import { CreateUserLoginDto } from "./dto/userLoginCreate.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
  
 @ApiTags('Users') 
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('find-one-user/:id')
  @ApiOperation({ summary: 'Buscar usuário pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar usuário' })
  async FindOne(@Param("id", ParseIntPipe) id: number): Promise<ApiResponseInterface> {
    try {
      const result = await this.userService.FindOne(id); // Adicionado 'await'
  
      return result;
    } catch (error) {
      return {
        status: 500,
        message: 'Erro ao buscar usuário.',
        error: error.message || error,
      };
    }
  }
  
  @Post("register-user") 
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro ao registrar usuário' })
  async Register(@Body("data") user: CreateUserDTO): Promise<ApiResponseInterface> {
    try {
      const result = await this.userService.Register(user); 
  
      return result;
    } catch (error) {
      return {
        status: 500,
        message: 'Erro ao registrar usuário.',
        error: error.message || error,
      };
    }
  }
  
  @Put("update/:id")
  @ApiOperation({ summary: 'Atualizar usuário pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar usuário' })
  async Update(
    @Body("data") user: UpdateUserDTO,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ApiResponseInterface> {
    try {
      const result = await this.userService.Update(id, user); 
  
      return result;
    } catch (error) {
      return {
        status: 500,
        message: 'Erro ao atualizar usuário.',
        error: error.message || error,
      };
    }
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ type: CreateUserLoginDto })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Email ou senha não fornecidos' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async signIn(@Body("data") signInDto: CreateUserLoginDto): Promise<ApiResponseInterface> {
    try {
      if(!signInDto.email || !signInDto.password){
        return {
          status: 400,
          message: 'Email ou senha não fornecidos!',
        };
      }

      console.log("signInDto", signInDto);
      const result = await this.userService.signIn(signInDto.email, signInDto.password);
  
      return result;
    } catch (error) {
      throw new BadRequestException({
        status: 401,
        message: `Credenciais inválidas. (controller): ${error.message}`,
      });
    }
  }

  @Get('find-all-user')
  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
  @ApiResponse({ status: 401, description: 'Erro na busca de usuários' })
  async findAllUser(){
    try{
      const result = await this.userService.findAllUser();
      return result
    }catch(error){
      throw new BadRequestException({
        status: 401,
        message: `Erro na busca de usuarios (controller): ${error.message}`,
      });
    }
  }
}
  