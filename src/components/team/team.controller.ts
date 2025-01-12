import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
    async registro(@Body() teamDTO: CreateTeamDto): Promise<ApiResponse>{
      try{
        const result = await this.teamService.create(teamDTO);
        
      
        return result;
      
      }catch (error){

        return {
          status: 500,
          message: 'Erro inesperado ao registrar Team.',
          error: error.message || error,
        };

      }
    }
  

    @Get('find-one-studio/:id')
    async getEquipe(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse>{
      try{
        const result = await this.teamService.findOne(id);

        return result;
      }
      catch(error){
        return {
          status: 500,
          message: 'Erro inesperado ao buscar um estúdio.',
          error: error.message || error,
        };
      }
    }
  
    @Get('find-all-Team')
    async getAllEquipe(){
      try{
        const result = await this.teamService.findAll();
        return result
      }
      catch(error){
        return {
          status: 500,
          message: 'Erro inesperado ao buscar estúdio.',
          error: error.message || error,
        };
      }
    }
  
}
