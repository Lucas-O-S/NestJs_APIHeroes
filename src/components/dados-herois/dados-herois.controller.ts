import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UsePipes, ParseIntPipe } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import {Heroes} from '../models/heroes.model';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MinFileSizeValidator } from 'src/validators/min_file.validator';
import { FileValidationPipe } from 'src/validators/FileValidation.validator';
import { FileDtoInterceptor } from 'src/middleware/FileDto.interceptor';
import { LogInterceptor } from './LogInterceptor';

@Controller('herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  //interceptadores para buscar o campo de imagens e o validador de arquivos
  @UseInterceptors(
    FilesInterceptor('imagens'), // Primeiro, processa os arquivos.
    LogInterceptor, // Depois, executa o interceptor de log.
  )
  @Post()
  async insere(
      @UploadedFiles() files: Array<Express.Multer.File>,
      @Body() createDadosHeroisDto: CreateDadosHeroisDto
  ) {
      try {
          createDadosHeroisDto.image1 = files[0];
          createDadosHeroisDto.image2 = files[1];

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
