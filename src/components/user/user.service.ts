import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { UpdateUserDTO } from "./dto/UserUpdate.dto";
import { CreateUserDTO } from "./dto/userCreate.dto";
import { ApiResponse } from "src/interfaces/APIResponse.interface";


@Injectable()
export class UserService{

    constructor(
        @InjectModel(User)
        private readonly userModel : typeof User
    ){}

    async FindOne(id : number) : Promise<ApiResponse<User>>{

        //To do: adicionar conexão ao sql
        const result = await this.userModel.findOne({where : {id:id}});
        if(!result){
            return { 
                message: "Dado não encontrado", 
                status: HttpStatus.NOT_FOUND,
            };
        }

        return { 
            message: "Busca realizada com sucesso", 
            status: 200,
            dataUnit: result,
        };
    }
        
    


    async Register(user : CreateUserDTO) : Promise<ApiResponse<CreateUserDTO>>{
        const result = await this.userModel.create(user)
        return {message: "Registro realizada com sucesso", 
            status: HttpStatus.CREATED,
        }
    }

    
    async Update(id : number, user : UpdateUserDTO) : Promise<ApiResponse<UpdateUserDTO>>{

        if(await !this.Exist(id)){
            return {message: "Requisição invalida", 
                status: HttpStatus.NOT_FOUND,
            }    
                
        }
        const result = await this.userModel.update(user, {where : {id}});

        return {message: "Alteração realizada com sucesso", 
            status: HttpStatus.CREATED,
        }    
    }

    async Exist(id: number): Promise<boolean>{

        if(await !this.userModel.findOne({where : {id}}))
            return false
        
        return true;
        
    }
}