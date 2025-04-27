
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import { ApiResponseInterface } from 'src/interfaces/APIResponse.interface'; 
import { StudioService } from './studio.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Studio')
@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo estúdio' })
  @ApiResponse({ status: 201, description: 'Estúdio criado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro inesperado ao registrar estúdio' })
  async registro(@Body() studioDto: CreateStudioDto): Promise<ApiResponseInterface<CreateStudioDto>> {
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
  @ApiOperation({ summary: 'Busca todos os estúdios' })
  @ApiResponse({ status: 200, description: 'Lista de estúdios retornada com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro inesperado ao buscar estúdio' })
  async findAllStudios(): Promise<ApiResponseInterface<CreateStudioDto>>{
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
  @ApiOperation({ summary: 'Deleta um estúdio pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do estúdio' })
  @ApiResponse({ status: 200, description: 'Estúdio deletado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro inesperado ao deletar estúdio' })
  async deleteOneStudio(@Param('id') id: number): Promise<ApiResponseInterface<CreateStudioDto>>{
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
  @ApiOperation({ summary: 'Busca um estúdio pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do estúdio' })
  @ApiResponse({ status: 200, description: 'Estúdio encontrado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro inesperado ao buscar um estúdio' })
  async findOneStudio(@Param('id') id: number): Promise<ApiResponseInterface<CreateStudioDto>>{
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
  @ApiOperation({ summary: 'Atualiza um estúdio pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do estúdio' })
  @ApiResponse({ status: 200, description: 'Estúdio atualizado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro inesperado ao atualizar um estúdio' })
  async updateStudio(@Param('id') id: number, @Body('data') data: CreateStudioDto): Promise<ApiResponseInterface<CreateStudioDto>>{
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
