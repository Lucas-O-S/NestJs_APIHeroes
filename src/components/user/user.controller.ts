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
  import { CreateUserDTO } from "../user/dto/UserCreate.dto";
  import { UpdateUserDTO } from "../user/dto/UserUpdate.dto";
  import { ApiResponse } from "../../interfaces/APIResponse.interface";
  import { CreateUserLoginDto } from "../user/dto/UserLoginCreate.dto";
  
  @Controller("user")
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get('find-one-user/:id')
    async FindOne(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse> {
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
    async Register(@Body("data") user: CreateUserDTO): Promise<ApiResponse> {
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
    async Update(
      @Body("data") user: UpdateUserDTO,
      @Param("id", ParseIntPipe) id: number,
    ): Promise<ApiResponse> {
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
    async signIn(@Body("data") signInDto: CreateUserLoginDto): Promise<ApiResponse> {
      try {
        if(!signInDto.email || !signInDto.password){
          return {
            status: 400,
            message: 'Email ou senha não fornecidos!',
          };
        }
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
  