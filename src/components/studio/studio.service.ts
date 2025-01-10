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
    const existingStudio = await this.studioModel.findOne({where: { name: studioDto.name}});

    if (existingStudio) {
      return HttpStatus.CONFLICT;
    }

    await this.studioModel.create(studioDto);

    return HttpStatus.CREATED;

  }

  async findOne(id: number): Promise<Studio> {
    const result = await this.studioModel.findOne({where: {id}});
    
    return result;
  }

  async findAll(): Promise<Studio[]> {
    return await this.studioModel.findAll();
  }

  async exists(id: number) : Promise<boolean>{
    const studio = await this.studioModel.findOne({where: {id}});
    return studio != null;
  }  
}
