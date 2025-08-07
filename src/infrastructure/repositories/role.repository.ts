import { Injectable } from "@nestjs/common";
import { Role } from "../database/sequelize/models/roles.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreationAttributes } from "sequelize";

@Injectable()
export class RoleRepository {
    constructor(
        @InjectModel(Role) private readonly roleModel: typeof Role
    ){}

    async create(role: CreationAttributes<Role>): Promise<Role | null> {
    return this.roleModel.create(role);
    }

}