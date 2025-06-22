import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "src/models/user.model";
import { Role } from "src/models/roles.model";

import { UpdateUserDTO } from "./dto/userUpdate.dto";
import { CreateUserDTO } from "./dto/userCreate.dto";
import { ApiResponseInterface } from "src/interfaces/APIResponse.interface";

import { AuthService } from "src/components/auth/auth.service";



@Injectable()
export class UserService{

    constructor(
        @InjectModel(User)
        private readonly userModel : typeof User,
        private authService: AuthService,
        @InjectModel(Role)
        private readonly roleModel : typeof Role
    ){}

    async FindOne(id : number) : Promise<ApiResponseInterface<User>>{

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

    async Register(user : CreateUserDTO) : Promise<ApiResponseInterface<CreateUserDTO>>{
        try {
            const senhaHash = await this.authService.generateHash(user.password);
            
            if (senhaHash) {
                user.password = senhaHash;
                
                await this.userModel.create({
                    ...user,
                    created_at: new Date()
                });
    
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

    
    async Update(id : number, user : UpdateUserDTO) : Promise<ApiResponseInterface<UpdateUserDTO>>{

        try{
            if(await !this.Exist(id)){
                return {message: "Requisição invalida", 
                    status: HttpStatus.NOT_FOUND,
                }    
                    
            }
    
            if(user.password === null){
                delete user.password;
                await this.userModel.update(user, {where : {id}});
            }else{
                const senhaHash = await this.authService.generateHash(user.password);
    
                if (senhaHash) {
                    user.password = senhaHash;
                    await this.userModel.update(user, {where : {id}});
                }else{
                    return {
                        status: HttpStatus.BAD_REQUEST,  
                        message: 'Houve um erro na conversão da senha em hash.',
                    };
                }
            }
            
    
            return {message: "Alteração realizada com sucesso", 
                status: 200,
            }    
        }catch(error){
            console.error("Erro ao realizar login:", error.message);

            throw new Error(`Credenciais inválidas ou usuário não encontrado: ${error}`)
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

            const role = await this.roleModel.findOne({where:{usuario_id:user.dataValues.id}});

            const match = await this.authService.validatyPassword(pass, user.dataValues.password);

            if (!match) {
                throw new Error("Credenciais inválidas.");
            }

            if(role){

            }

            return {
                acess_token: await this.authService.generateToken(user),
                refresh_token: await this.authService.generateRefreshToken(user),
                role, user_id: user.dataValues.id
            };        
        }catch(error){
            console.error("Erro ao realizar login:", error.message);

            throw new Error(`Credenciais inválidas ou usuário não encontrado: ${error}`)
        }
    
    }

    async findAllUser(): Promise<any> {
        try {
          const users = await this.userModel.findAll({
            attributes: ['id', 'fullname', 'firstemail', 'nickname',],
          });
          const roles = await this.roleModel.findAll();
      
          const usersWithRoles = users.map((user: any) => {
            const matchedRole = roles.find((role: any) => role.usuario_id === user.id);
      
            return {
              ...user.dataValues, 
              role: matchedRole ? matchedRole.role : null, 
            };
          });
      
          return usersWithRoles;
        } catch (error) {
          console.error("Erro ao buscar usuários e roles:", error);
          throw new Error("Erro ao processar usuários e roles.");
        }
    }
      
}