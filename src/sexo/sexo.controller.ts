import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { Origens } from 'src/models/origem.model';

@Controller('sexo')
export class SexoController {
  constructor(private readonly sexoService: SexoService) {}

  @Post('criaRegistro')
  async registro(@Body() sexoDTO:CreateSexoDto){
    try{
      return await this.sexoService.create(sexoDTO);
    }catch(error){
      if(error instanceof ConflictException){
        throw new ConflictException('Não foi possivel salvar o sexo na tabelas sexos.');
      }
      return error;
    }
  }

  @Get('getAll')
  async getAllSexo(): Promise<Origens[]>{
     return await this.sexoService.findAll();
  }
}
