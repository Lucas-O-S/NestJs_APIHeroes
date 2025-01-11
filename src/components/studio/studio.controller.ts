import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { StudioService } from './studio.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import {ApiResponse} from './studio.service'

@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Post()
  async registro(@Body() studioDto: CreateStudioDto) {
    try{
      const result = await this.studioService.create(studioDto);
      return {result: result, message:'Studio criado com sucesso'};
    }catch(error){
      if(error instanceof ConflictException){
        throw new ConflictException('Studio com este nome já existe!');
      }
      throw error;
    }
  }

}
