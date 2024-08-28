import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { Equipe } from 'src/models/equipes.model';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post('criaRegistro')
  async registro(@Body() equipeDTO: CreateEquipeDto){
    try{
      return await this.equipeService.create(equipeDTO);
    }catch (error){
      if(error instanceof ConflictException){
        throw new ConflictException('Equipe com este nome já existe');
      }
      throw error;
    }
  }

  @Get('getAll')
  async getAllEquipe(): Promise<Equipe[]> {
    return this.equipeService.findAll();
  }

  
}
