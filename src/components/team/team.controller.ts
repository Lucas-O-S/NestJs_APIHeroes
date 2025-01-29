import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, ParseIntPipe, HttpStatus, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';
import { UpdateTeamDto } from './dto/update-team.dto';

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
          message: 'Erro inesperado ao registrar time.',
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
          message: 'Erro inesperado ao buscar um Time.',
          error: error.message || error,
        };
      }
    }
  
    @Get('find-all-Team')
    async getAllEquipe() : Promise<ApiResponse>{
      try{
        const result = await this.teamService.findAll();
        return result
      }
      catch(error){
        return {
          status: 500,
          message: 'Erro inesperado ao buscar Time.',
          error: error.message || error,
        };
      }
    }

    @Put("update/:id")
    async update(@Body() team : UpdateTeamDto, @Param("id", ParseIntPipe) id : number ): Promise<ApiResponse> {
      try{
        
        const result = await this.teamService.Update(team, id);
        return result;

      }
      catch(error){
        return {
          status: 500,
          message: 'Erro inesperado ao atualizar Time.',
          error: error.message || error,
        };
      }
  
    }

    @Delete("delete-one-team/:id")
    async Delete(@Param("id", ParseIntPipe) id : number): Promise<ApiResponse>{
      try{
        
        const result = await this.teamService.Delete(id);
        return result;

      }
      catch(error){
        return {
          status: 500,
          message: 'Erro inesperado ao atualizar Time.',
          error: error.message || error,
        };
      }
    }
  
}
