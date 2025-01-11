import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import {InjectModel } from '@nestjs/sequelize';
import { Studio } from '../../models/studio.model';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';

@Injectable()
export class StudioService {
  constructor(
      @InjectModel(Studio) 
      private studioModel: typeof Studio 
    ) {}
  
  async create(studioDto: CreateStudioDto) : Promise<ApiResponse<CreateStudioDto>> {
    try{
      const existingStudio = await this.studioModel.findOne({where: { name: studioDto.name}
      });
      if(existingStudio){
        return {
          status: HttpStatus.CONFLICT,
          message:'Já existe um registro n tabela equipes com este nome.'
        }
      }

      await this.studioModel.create(studioDto);

      return {
        status: HttpStatus.CREATED,
        message: 'Registro criado com sucesso!'
      };
    }catch(error){
      console.error("Erro no método create:", error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao tentar registrar um novo studio: ${error.message || error}`
      };
    }
  }

  async exists(id: number) : Promise<boolean>{
    const studio = await this.studioModel.findOne({where: {id}});
    return studio != null;
  }  

  async findAll(): Promise<ApiResponse<CreateStudioDto>>{
    try{
      const dadosStudios = await this.studioModel.findAll({attributes: ['id','name', 'nationality']});
      if (dadosStudios.length === 0){
        return {
          status: HttpStatus.NO_CONTENT,
          message: 'Nenhum estúdio encontrado.'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Estúdios encontrados com sucesso.',
        data: dadosStudios
      };
    }catch(error){
      console.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao recuperar os estúdios: ${error.message || error}`
      };
    }
  }

  async DeleteOneStudio(id: number): Promise<ApiResponse<CreateStudioDto>>{
    try{
      const isDeleted = await this.studioModel.destroy({where:{id: id}});
      if(isDeleted > 0){
        return {
          status: HttpStatus.OK,
          message: 'Studio deletado com sucesso!'
        };
      }
      
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Studio não encontrado.'
      }
    }catch(error){
      console.error(error);
      return {
        status:HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao tentar apagar registro do studio: ${error.message || error}`
      } ;
    }
  }

  async findOneStudio(id: number): Promise<ApiResponse<CreateStudioDto>>{
    try{
      const isStudio = await this.studioModel.findOne({where:{id}});
      if(!isStudio){
        return {
          status: HttpStatus.CONFLICT,
          message: 'Não foi possivel encontrar o registro desejado.'
        }
      }

      return {
        status:HttpStatus.OK,
        message: 'Registro encontrado com sucesso!',
        dataUnit: isStudio
      }
    }catch(error){
      console.error(error);
      return {
        status:HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao tentar apagar registro do studio: ${error.message || error}`
      } ;
    }
  }

  async UpdateStudio(id: number, studioDto: CreateStudioDto): Promise<ApiResponse<CreateStudioDto>>{
    try{
      
      const affectedRows = await this.studioModel.update({
        name: studioDto.name,
        nationality: studioDto.nationality,
        history: studioDto.history
      }, 
      {
        where: { id: id }
      });

      if (affectedRows[0] === 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Estúdio não encontrado.',
        };
      }
  
      return {
        status: HttpStatus.OK,
        message: 'Estúdio atualizado com sucesso!',
      };
    }catch(error){
      console.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro ao tentar atualizar o estúdio: ${error.message || error}`,
      };
    }
  }
}
