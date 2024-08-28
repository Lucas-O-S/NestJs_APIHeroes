import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { MoralidadeService } from './moralidade.service';
import { CreateMoralidadeDto } from './dto/create-moralidade.dto';
import { Moralidades } from '../models/moralidades.model';

@Controller('moralidade')
export class MoralidadeController {
  constructor(private readonly moralidadeService: MoralidadeService) {}

  @Post('criaRegistro')
  async registro(@Body() moralidadeDTO: CreateMoralidadeDto){
    try{
      return await this.moralidadeService.create(moralidadeDTO)
    }catch(error){
      if(error instanceof ConflictException){
        throw new ConflictException('Moralidade com este nome já existe');
      }
      throw error;
    }
  }

  @Get('GetAll')
  async getAllMoralidades(): Promise<Moralidades[]>{
      return this.moralidadeService.findAll();
  }
}
