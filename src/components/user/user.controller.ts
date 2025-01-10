import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/userCreate.dto";
import { UpdateUserDTO } from "./dto/UserUpdate.dto";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('find-one-user/:id')
    async FindOne(@Param("id",  ParseIntPipe) id){
        const result = this.userService.FindOne(id);

        if(!result){
            return {status : HttpStatus.BAD_REQUEST, result: result};

        }

        return {status : HttpStatus.ACCEPTED, result: result};
    }

    @Post("resgister-user")
    async Register(@Body() user : CreateUserDTO){
        const result = this.userService.Register(user);

        return{status: result, Message: "Usuario Criado com Sucesso"}
    }


    @Put("update/:id")
    async Update(@Body() user : UpdateUserDTO, @Param("id", ParseIntPipe) id : number){
        const result = this.userService.Update(id, user);

        return{status: result, Message: "Usuario Atualizado com Sucesso"}
    }



}