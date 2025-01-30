import { Controller, Post, Body, UseInterceptors, UploadedFiles, BadRequestException} from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import {FilesInterceptor } from '@nestjs/platform-express';
import { LogInterceptor } from './LogInterceptor';

@Controller('herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  //interceptadores para buscar o campo de imagens e o validador de arquivos
  @UseInterceptors(
    FilesInterceptor('imagens'), // Intercepta o upload
    LogInterceptor, // Log de dados
  )
  @Post()
  async insere(
      @UploadedFiles() files: Array<Express.Multer.File>,
      @Body() createDadosHeroisDto: CreateDadosHeroisDto
  ) {
      try {
          if (files.length > 0) {
              // Converte arquivos para buffer antes de salvar no banco
              createDadosHeroisDto.image1 = files[0]?.buffer || null;
              createDadosHeroisDto.image2 = files[1]?.buffer || null;
          }
  
          const result = await this.dadosHeroisService.create(createDadosHeroisDto);
  
          return {
              message: `${createDadosHeroisDto.name} foi criado com sucesso`,
              result,
          };
      } catch (ex) {
          throw new BadRequestException(ex.message);
      }
  }
/*
  @Get('heroesByPublisher')
  async getHeroesByPublisher(@Query('publisher') publisher: number): Promise<Heroes[]> {
    return this.dadosHeroisService.getHeroesByPublisher(publisher);
  }
    */
}
