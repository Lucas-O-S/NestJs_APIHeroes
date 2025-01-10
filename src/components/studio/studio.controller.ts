import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import { StudioService } from './studio.service';

@Controller('studio')
export class StudioController {
  constructor(private readonly studioService: StudioService) {}

  @Post()
  async registro(@Body() studioDto: CreateStudioDto) {
    try {
      const result = await this.studioService.create(studioDto);
      
      if(result != HttpStatus.CREATED){
        return {message: "Erro ao criar editora", status : result};
      }
      return {result : result, message: `Editora ${studioDto.name} criada com sucesso`};

    } catch (error) {

      throw error; 
    }
  }
  @Get(":id")
  async getOneEditora(@Param("id", ParseIntPipe) id : number){
    
    try{
      const result = await this.studioService.findOne(id);
      if(!result){
        return {message: "Editora não encontrada", status : HttpStatus.NOT_FOUND};
      }
      return {result : result, status: HttpStatus.ACCEPTED};
      
      
    }
    catch(error){

      throw error;
    }
  }

  @Get()
  async getAllEditoras() {
    try{
      const result =  await this.studioService.findAll();
      return {status : HttpStatus.ACCEPTED, result : result}
    }
    catch(error){
      throw error;
    }
  }

}
