import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UsePipes, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

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

      if(result == HttpStatus.BAD_REQUEST){
        return {message: "Erro ao adicionar herois", status : result};
      }

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
