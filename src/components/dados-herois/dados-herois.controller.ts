import { Controller, Post, Body, UseInterceptors, UploadedFiles, BadRequestException, HttpStatus, Get, ParseIntPipe, Param, Put, Delete} from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import {FilesInterceptor } from '@nestjs/platform-express';
import { LogInterceptor } from './LogInterceptor';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';

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
        message: 'Erro inesperado.',
        error: error.message || error,
      };      
    }
  }

  @Get('find-one-hero/:id')
  async getHeroById(@Param("id", ParseIntPipe) id : number): Promise<ApiResponse> {
    try{
      const result = await this.dadosHeroisService.findOne(id);
      return result;
    }
    catch(error){
      return {
        status: 500,
        message: 'Erro inesperado.',
        error: error.message || error,
      };  

    }
  
  }

  @UseInterceptors(
    FilesInterceptor('imagens'), // Intercepta o upload
    LogInterceptor, // Log de dados
  )
  @Put("Update/:id")
  async Upadate(
    @Param("id", ParseIntPipe) id : number,
    @Body() updateDadosHeroisDto : UpdateDadosHeroisDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    ) : Promise<ApiResponse> {
    try{

      if (files.length > 0) {
        // Converte arquivos para buffer antes de salvar no banco
        updateDadosHeroisDto.image1 = files[0]?.buffer || null;
        updateDadosHeroisDto.image2 = files[1]?.buffer || null;
    }
      const result = await this.dadosHeroisService.update(id, updateDadosHeroisDto);
      return result;

    }
    catch(error){
      return {
        status: 500,
        message: 'Erro inesperado.',
        error: error.message || error,
      }; 

    }
  }

  @Delete("delete/:id")
  async Delete(@Param("id", ParseIntPipe) id : number) : Promise<ApiResponse>{
      
    try{
    
      const result = this.dadosHeroisService.remove(id);
    

      return result;

    }

    catch(error){

      return { 

        status: 500,

        message: 'Erro inesperado ao registrar estúdio.',

        error: error.message || error,

      };

    }
  }
      
}
