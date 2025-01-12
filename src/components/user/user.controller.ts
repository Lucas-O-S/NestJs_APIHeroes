import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/userCreate.dto";
import { UpdateUserDTO } from "./dto/UserUpdate.dto";
import { ApiResponse } from "src/interfaces/APIResponse.interface";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('find-one-user/:id')
    async FindOne(@Param("id",  ParseIntPipe) id) : Promise<ApiResponse>{
        try{
            const result = this.userService.FindOne(id);
    
            return result
        }
        catch(error){
            return { 
                status: 500,
                message: 'Erro inesperado ao registrar estúdio.',
                error: error.message || error,
              };
        }

    }

    @Post("resgister-user")
    async Register(@Body() user : CreateUserDTO) : Promise<ApiResponse>{
        try{

            const result = this.userService.Register(user);

            return result;
        }
        catch(error){
            return { 
                status: 500,
                message: 'Erro inesperado ao registrar estúdio.',
                error: error.message || error,
              };
            }
        }


    @Put("update/:id")
    async Update(@Body() user : UpdateUserDTO, @Param("id", ParseIntPipe) id : number) : Promise<ApiResponse>{
        
        try{
            const result = this.userService.Update(id, user);

            return result
        }
        catch(error){
            return { 
                status: 500,
                message: 'Erro inesperado ao registrar estúdio.',
                error: error.message || error,
              };
        }

    }



}