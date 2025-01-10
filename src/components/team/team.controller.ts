import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'src/models/equipes.model';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
    async registro(@Body() teamDTO: CreateTeamDto){
      try{
        const result = await this.teamService.create(teamDTO);
        return {Result: result, message: 'Equipe criada com sucesso'};
      }catch (error){
        if(error instanceof ConflictException){
          throw new ConflictException('Equipe com este nome já existe');
        }
        throw error;
      }
    }
  
    @Get(":id")
    async getEquipe(@Param("id", ParseIntPipe) id: number): Promise<Team>{
      try{
        return this.teamService.findOne(id);;
  
      }
      catch(error){
        if(error instanceof ConflictException){
          throw new ConflictException('Equipe com este id não existe');
        }
        throw error;
      }
    }
  
    @Get()
    async getAllEquipe(): Promise<Team[]> {
      return this.teamService.findAll();
    }
}
