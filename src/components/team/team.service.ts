import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from 'src/models/equipes.model';
import { InjectModel } from '@nestjs/sequelize';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Op, where } from 'sequelize';

@Injectable()
export class TeamService {
  constructor(
      @InjectModel(Team) 
      private equipeModel: typeof Team 
    ) {}
  
    async create(equipeDto: CreateTeamDto) : Promise<ApiResponse<CreateTeamDto>> {

      if(await this.VerifyName(equipeDto.name)){
        return {
          status: HttpStatus.CONFLICT,
          message:'Já existe um registro na tabela Equipe com este nome.'
        }      
      }
  
      await this.equipeModel.create(equipeDto);
  
      return {
        status: HttpStatus.CREATED,
        message: "Registro criado com sucesso!"
      };
    }
  
    async findOne(id: number): Promise<ApiResponse<Team>>{
      const result : Team = await this.equipeModel.findOne({ where: {id}});
      
      if(!result){
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Não foi possivel encontrar o registro desejado.'
        }
      }
      return  {
        status:HttpStatus.OK,
        message: 'Registro encontrado com sucesso!',
        dataUnit: result
      };
    }
  
    async findAll(): Promise<ApiResponse<Team>> {
      const result = await this.equipeModel.findAll();

      if(result.length === 0){
        return {
          status: HttpStatus.NO_CONTENT,
          message: 'Nenhum registro encontrado.'
        };
      }
      
      
      return{
        status: HttpStatus.OK,
        message: 'Registro encontrados com sucesso.',
        data: result
      }
      
    }

    async Update(team :  UpdateTeamDto, id : number): Promise<ApiResponse>{
      
      if(!(await this.exists(id))){
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Nenhum registro encontrado.'
        };
      }

      if(await this.VerifyName(team.name, id)){
        return {
          status: HttpStatus.CONFLICT,
          message:'Já existe um registro na tabela Equipe com este nome.'
        }      
      }

      const result = this.equipeModel.update(team, {where : {id}} )

      return {message : "Atualização feita com sucesso", status: HttpStatus.OK}


    }

    async Delete(id : number) : Promise<ApiResponse>{
      if(!(await this.exists(id))){
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Não foi possivel encontrar o registro desejado.'
        }
      }
      
      await this.equipeModel.destroy({ where: {id}});

      return  {
        status:HttpStatus.OK,
        message: 'Registro deletado com sucesso!',
      };

      
    }

    
  
    async exists(id: number): Promise<boolean>{
      const equipe = await this.equipeModel.findOne({where: {id}});
      return equipe != null;
    }

    async VerifyName(name: string, id? : number): Promise<boolean>{
      
      if (!id){
        id = 0
      }
      
      const existingEquipe = await this.equipeModel.findOne({
        where: { 
          name: name, 
          id: { [Op.ne] : id }}
      });
      
      if(!existingEquipe)
        return false;


      return true;

    }
}
