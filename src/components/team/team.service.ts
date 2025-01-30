import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from 'src/models/equipes.model';
import { InjectModel } from '@nestjs/sequelize';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';

@Injectable()
export class TeamService {
  constructor(
      @InjectModel(Team) 
      private equipeModel: typeof Team 
    ) {}
  
    async create(equipeDto: CreateTeamDto) : Promise<ApiResponse<CreateTeamDto>> {
      const existingEquipe = await this.equipeModel.findOne({
        where: { name: equipeDto.name}
      });
  
      if(existingEquipe){
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
          status: HttpStatus.CONFLICT,
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
          message: 'Nenhum estúdio encontrado.'
        };
      }
      
      return{
        status: HttpStatus.OK,
        message: 'Estúdios encontrados com sucesso.',
        data: result
      }
      
    }
  
    async exists(id: number): Promise<boolean>{
      const equipe = await this.equipeModel.findOne({where: {id}});
      return equipe != null;
    }
}
