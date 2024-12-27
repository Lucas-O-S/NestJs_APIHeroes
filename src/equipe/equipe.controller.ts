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
      return this.equipeService.findOne(id);;

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
    return this.equipeService.findAll();
  }

  
}
