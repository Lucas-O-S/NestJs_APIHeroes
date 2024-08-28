import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { OrigemService } from './origem.service';
import { CreateOrigemDto } from './dto/create-origem.dto';
import { UpdateOrigemDto } from './dto/update-origem.dto';

@Controller('origem')
export class OrigemController {
  constructor(private readonly origemService: OrigemService) {}

  @Post('criaRegistro')
  async registro(@Body() origemDTO: CreateOrigemDto){
    try{
      return await this.origemService.create(origemDTO);
    }catch(error){
      if(error instanceof ConflictException){
        throw new ConflictException('Não foi possivel criar um novo registro na tabela origem')
      }
    }
  }
}
