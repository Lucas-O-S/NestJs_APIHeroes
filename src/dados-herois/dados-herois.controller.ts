import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UsePipes, ParseIntPipe } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import {Heroes} from '../models/heroes.model';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MinFileSizeValidator } from 'src/validators/min_file.validator';
import { FileValidationPipe } from 'src/validators/FileValidation.validator';
import { FileDtoInterceptor } from 'src/middleware/FileDto.interceptor';

@Controller('herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  //interceptadores para buscar o campo de imagens e o validador de arquivos
  @UseInterceptors(FilesInterceptor("imagens"), FileDtoInterceptor)
  @Post()
  async insere(
    //Salva as variaveis do body dentro do dto
    @Body() createDadosHeroisDto: CreateDadosHeroisDto,)
  {
    try{
      const result = await this.dadosHeroisService.create(createDadosHeroisDto);
      return {"message": `${createDadosHeroisDto.name} foi criado com sucesso` , "result": result};
    }
    catch(ex){
      throw new BadRequestException(ex.message);
      //throw new BadRequestException("Erro ao adicionar heroi");
    }


  }
/*
  @Get('heroesByPublisher')
  async getHeroesByPublisher(@Query('publisher') publisher: number): Promise<Heroes[]> {
    return this.dadosHeroisService.getHeroesByPublisher(publisher);
  }
    */
}
