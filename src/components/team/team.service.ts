import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'src/models/equipes.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TeamService {
  constructor(
      @InjectModel(Team) 
      private equipeModel: typeof Team 
    ) {}
  
    async create(equipeDto: CreateTeamDto) : Promise<HttpStatus> {
      const existingEquipe = await this.equipeModel.findOne({
        where: { name: equipeDto.name}
      });
  
      if(existingEquipe){
        return HttpStatus.CONFLICT;
      }
  
      await this.equipeModel.create(equipeDto);
  
      return HttpStatus.CREATED;
    }
  
    async findOne(id: number): Promise<Team>{
      const result : Team = await this.equipeModel.findOne({ where: {id}});

      return result;
    }
  
    async findAll(): Promise<Team[]> {
      return await this.equipeModel.findAll(); // Usar equipeModel
    }
  
    async exists(id: number): Promise<boolean>{
      const equipe = await this.equipeModel.findOne({where: {id}});
      return equipe != null;
    }
}
