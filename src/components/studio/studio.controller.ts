import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { StudioService } from './studio.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import {ApiResponse} from './studio.service'

@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Post()
  async registro(@Body() studioDto: CreateStudioDto): Promise<ApiResponse> {
    try {
      const result = await this.studioService.create(studioDto);
      return result;
    } catch (error) {
      return {
        status: 500,
        message: 'Erro inesperado ao registrar estúdio.',
        error: error.message || error,
      };
    }
  }

  @Get('find-all-studio')
  async findAllStudios(): Promise<ApiResponse>{
    try{
      const dadosStudios = await this.studioService.findAll();
      return dadosStudios;
    }catch(error){
      return {
        status: 500,
        message: 'Erro inesperado ao buscar estúdio.',
        error: error.message || error,
      };
    }
  }

  @Delete('delete-one-studio/:id')
  async deleteOneStudio(@Param('id') id: number): Promise<ApiResponse>{
    try{
      const isDeleted = await this.studioService.DeleteOneStudio(id);
      return isDeleted;
    }catch(error){
      return {
        status: 500,
        message: 'Erro inesperado ao deletar estúdio.',
        error: error.message || error,
      };
    }
  }

  @Get('find-one-studio/:id')
  async findOneStudio(@Param('id') id: number): Promise<ApiResponse>{
    try{
      const findStudio = await this.studioService.findOneStudio(id);
      return findStudio;
    }catch(error){
      return {
        status: 500,
        message: 'Erro inesperado ao buscar um estúdio.',
        error: error.message || error,
      };
    }
  }

  @Put('update/:id')
  async updateStudio(@Param('id') id: number, @Body('data') data: CreateStudioDto): Promise<ApiResponse>{
    try{
      const isUpdate = await this.studioService.UpdateStudio(id, data);
      return isUpdate;
    }catch(error){
      return {
        status: 500,
        message: 'Erro inesperado ao atualizar um estúdio.',
        error: error.message || error,
      };
    }
  }

}
