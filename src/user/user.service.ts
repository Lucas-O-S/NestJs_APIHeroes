import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { UpdateUserDTO } from "./dto/UserUpdate.dto";


@Injectable()
export class UserService{

    constructor(
        @InjectModel(User)
        private readonly userModel : typeof User
    ){}

    async FindOne(id : number) : Promise<User>{

        //To do: adicionar conexão ao sql
        const result = new User;

        return result;
    }


    async Register(user : User) : Promise<HttpStatus>{
        //To do: adicionar conexão ao sql

        return HttpStatus.CREATED;
    }

    
    async Update(id : number, user : UpdateUserDTO) : Promise<HttpStatus>{
        //To do: adicionar conexão ao sql
        if(!this.Exist){
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.CREATED;
    }

    async Exist(id: number){

        //To do buscar se existe o usuario e depois retornar V ou F

        return true;
        
    }
}