import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { UpdateUserDTO } from "./dto/UserUpdate.dto";
import { CreateUserDTO } from "./dto/userCreate.dto";
import { ApiResponse } from "src/interfaces/APIResponse.interface";
import { AuthService } from "src/components/auth/auth.service";


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
        try {
            const senhaHash = await this.authService.generateHash(user.password);
            
            if (senhaHash) {
                user.password = senhaHash;
                
                await this.userModel.create(user);
    
                return {
                    message: "Registro realizado com sucesso",
                    status: HttpStatus.CREATED,
                };
            } else {
                return {
                    status: HttpStatus.BAD_REQUEST,  
                    message: 'Houve um erro na conversão da senha em hash.',
                };
            }
        } catch (error) {
            console.error('Erro ao registrar o usuário:', error);
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
        return this.userModel.findOne({where:{firstemail: email}});
    }

    async signIn(email: string, pass: string): Promise<any> {
        try{
            

            const user = await this.findOneUser(email);
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            const match = await this.authService.validatyPassword(pass, user.password);
            if (!match) {
                throw new Error("Credenciais inválidas.");
            }

            return await this.authService.generateToken(user);            
        }catch(error){
            console.error("Erro ao realizar login:", error.message);

            return {
            status: 401,
            message: "Credenciais inválidas ou usuário não encontrado.",
            };
        }
    
    }
}