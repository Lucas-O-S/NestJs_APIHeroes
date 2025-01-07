import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException } from '@nestjs/common';
import { StudioService } from './studio.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

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

  @Get()
  findAll() {
    return this.studioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studioService.update(+id, updateStudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studioService.remove(+id);
  }
}
