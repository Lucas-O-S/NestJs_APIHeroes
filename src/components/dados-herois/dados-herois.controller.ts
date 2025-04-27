import { Controller, Post, Body, UseInterceptors, UploadedFiles, BadRequestException, HttpStatus, Get, ParseIntPipe, Param, Put, Delete} from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import {FilesInterceptor } from '@nestjs/platform-express';
import { LogInterceptor } from './LogInterceptor';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import {ApiResponseInterface} from '../../interfaces/APIResponse.interface';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Herois')
@Controller('herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  @ApiTags('Herois')
  @ApiOperation({ summary: 'Cria um novo herói' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados para criar herói + imagens',
    schema: {
      type: 'object',
      properties: {
        imagens: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        // Abaixo você pode colocar os campos que o DTO espera, exemplo:
        nome: { type: 'string' },
        poder: { type: 'string' },
        idade: { type: 'integer' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Herói criado com sucesso' })
  @UseInterceptors(
    FilesInterceptor('imagens'), // Intercepta o upload
    LogInterceptor, // Log de dados
  )
  @Post()
  async insere(
      @UploadedFiles() files: Array<Express.Multer.File>,
      @Body() createDadosHeroisDto: CreateDadosHeroisDto
  ) : Promise<ApiResponseInterface> {
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

  @ApiTags('Herois')
  @ApiOperation({ summary: 'Busca todos os heróis' })
  @ApiResponse({ status: 200, description: 'Lista de heróis' })
  @Get('find-all-heroes')
  async getHeroesAllHeroes(): Promise<ApiResponseInterface> {
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

  @ApiTags('Herois')
  @ApiOperation({ summary: 'Busca herói pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do herói' })
  @ApiResponse({ status: 200, description: 'Herói encontrado' })
  @Get('find-one-hero/:id')
  async getHeroById(@Param("id", ParseIntPipe) id : number): Promise<ApiResponseInterface> {
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

  @ApiTags('Herois')
  @ApiOperation({ summary: 'Atualiza um herói existente' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados para atualizar herói + imagens',
    schema: {
      type: 'object',
      properties: {
        imagens: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        // Campos esperados no DTO:
        nome: { type: 'string' },
        poder: { type: 'string' },
        idade: { type: 'integer' },
      },
    },
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do herói a ser atualizado' })
  @ApiResponse({ status: 200, description: 'Herói atualizado com sucesso' })
  @UseInterceptors(
    FilesInterceptor('imagens'), // Intercepta o upload
    LogInterceptor, // Log de dados
  )
  @Put("Update/:id")
  async Upadate(
    @Param("id", ParseIntPipe) id : number,
    @Body() updateDadosHeroisDto : UpdateDadosHeroisDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    ) : Promise<ApiResponseInterface> {
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

  @ApiTags('Herois')
  @ApiOperation({ summary: 'Remove herói pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do herói a ser removido' })
  @ApiResponse({ status: 200, description: 'Herói removido' })
  @Delete("delete/:id")
  async Delete(@Param("id", ParseIntPipe) id : number) : Promise<ApiResponseInterface>{
      
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
