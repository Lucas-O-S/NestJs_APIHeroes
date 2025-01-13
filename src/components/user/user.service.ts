import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { UpdateUserDTO } from "./dto/UserUpdate.dto";
import { CreateUserDTO } from "./dto/userCreate.dto";
import { ApiResponse } from "src/interfaces/APIResponse.interface";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class UserService{

    constructor(
        @InjectModel(User)
        private readonly userModel : typeof User,
        private authService: AuthService
    ){}

    async FindOne(id : number) : Promise<ApiResponse<User>>{

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
        try{
            //converte a senha encriptografada em hash
            const senhaHash = await this.authService.genarateHash(user.password);
            if(senhaHash){
                user.password = senhaHash;
                //cria o registro no banco de dados
                await this.userModel.create(user)

                return {message: "Registro realizada com sucesso", 
                    status: HttpStatus.CREATED,
                }
            }else{
                return{
                    status: HttpStatus.BAD_REQUEST,
                    message: 'houve um erro na conversão da senha em hash'
                }
            }
            
        }catch(error){
            console.error('Erro ao registrar o usuário:', error);  // Lembre-se de logar o erro para depuração
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Erro ao registrar o usuário.',
            };
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
            status: 200,
        }    
    }

    async Exist(id: number): Promise<boolean>{

        if(await !this.userModel.findOne({where : {id}}))
            return false
        
        return true;
        
    }

    async findOneUser(email: string): Promise<any> {
        return this.userModel.findOne({where:{ firstemail: email}});
    }
}