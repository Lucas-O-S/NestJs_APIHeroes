import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { Team } from 'src/models/equipes.model';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  async registro(@Body() equipeDTO: CreateEquipeDto){
    try{
      const result = await this.equipeService.create(equipeDTO);
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
      const result = await this.equipeService.findOne(id);

      if(result == null){
        return {message: "Equipe não encontrada", error : HttpStatus.NOT_FOUND};
      }
      return this.equipeService.findOne(id);
    }
    catch(error){
      throw error;
    }
  }

  @Get()
  async getAllEquipe(): Promise<Team[]> {
    return this.equipeService.findAll();
  }

  
}
