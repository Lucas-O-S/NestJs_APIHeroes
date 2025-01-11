import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import {InjectModel } from '@nestjs/sequelize';
import { Studio } from '../../models/studio.model';

@Injectable()
export class StudioService {
  constructor(
      @InjectModel(Studio) 
      private studioModel: typeof Studio 
    ) {}
  
  async create(studioDto: CreateStudioDto) : Promise<HttpStatus> {
    try{
      const existingStudio = await this.studioModel.findOne({where: { name: studioDto.name}
      });

      if(existingStudio){
        throw new ConflictException('Já existe um registro n tabela equipes com este nome.')
      }

      await this.studioModel.create(studioDto);

      return HttpStatus.CREATED;
    }catch(error){

    }
  }

  async exists(id: number) : Promise<boolean>{
    const studio = await this.studioModel.findOne({where: {id}});
    return studio != null;
  }  
}
