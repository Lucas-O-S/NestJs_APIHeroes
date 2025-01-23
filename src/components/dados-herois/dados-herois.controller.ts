import { Controller, Post, Body, UseInterceptors, UploadedFiles, BadRequestException, HttpStatus, Get, ParseIntPipe, Param} from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import {FilesInterceptor } from '@nestjs/platform-express';
import { LogInterceptor } from './LogInterceptor';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';

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
  ) : Promise<ApiResponse> {
      try {
          if (files.length > 0) {
              // Converte arquivos para buffer antes de salvar no banco
              createDadosHeroisDto.image1 = files[0]?.buffer || null;
              createDadosHeroisDto.image2 = files[1]?.buffer || null;
          }
  
          const result = await this.dadosHeroisService.create(createDadosHeroisDto);
    
          return result;
      } catch (error) {
        return {
          status: 500,
          message: 'Erro inesperado ao atualizar um estúdio.',
          error: error.message || error,
        };      
      }
  }



  @Get('find-all-heroes')
  async getHeroesAllHeroes(): Promise<ApiResponse> {
    try{
      const result = await this.dadosHeroisService.findAll();
      return result;
    }
    catch(error){
      return {
        status: 500,
        message: 'Erro inesperado ao atualizar um estúdio.',
        error: error.message || error,
      };      
    }
  }

  @Get('find-one-studio/:id')
  async getHeroById(@Param("id", ParseIntPipe) id : number): Promise<ApiResponse> {
    try{
      const result = await this.dadosHeroisService.findOne(id);
      return result;
    }
    catch(error){
      return {
        status: 500,
        message: 'Erro inesperado ao atualizar um estúdio.',
        error: error.message || error,
      };  

    }
  
  }
}
