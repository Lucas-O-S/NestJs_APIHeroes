import { InjectModel } from "@nestjs/sequelize";
import { User } from "../database/sequelize/models/user.model";
import { Injectable } from "@nestjs/common";
import { Role } from "../database/sequelize/models/roles.model";

@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        @InjectModel(Role) private readonly roleModel: typeof Role
    ){}

    async findByEmail(email: string): Promise<User>{
        return await this.userModel.findOne({where: {firstemail: email}}) 
    }

    async findRoleByUserId(usuario_id: number): Promise<Role>{
        return await this.roleModel.findOne({where: {usuario_id}});
    }

    async findUserById(id:number): Promise<User>{
        return await this.userModel.findOne({where:{id}});
    }
}