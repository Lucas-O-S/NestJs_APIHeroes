import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ParseIntPipe, HttpStatus } from '@nestjs/common';
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
        
        if(result != HttpStatus.CREATED){
          return {message: "Erro ao criar equipe", status : result};
        }
      
        return {Result: result, message: 'Equipe criada com sucesso'};
      
      }catch (error){
        throw error;
      }
    }
  

    @Get(":id")
    async getEquipe(@Param("id", ParseIntPipe) id: number){
      try{
        const result = await this.teamService.findOne(id);
  
        if(result == null){
          return {message: "Equipe não encontrada", error : HttpStatus.NOT_FOUND};
        }
        return {status : HttpStatus.ACCEPTED, result : result}
      }
      catch(error){
        throw error;
      }
    }
  
    @Get()
    async getAllEquipe(){
  
      const result = await this.teamService.findAll();
      return {status : HttpStatus.ACCEPTED, result : result};
    }
  
}
