import { Controller, Post, Body, Get, Param, ParseIntPipe, HttpStatus } from "@nestjs/common";
import { EditoraService } from "./editora.service";
import { CreateEditoraDto } from "./dto/create-editora.dto";
import {Editora} from '../models/editoras.model';

@Controller('editora')
export class EditoraController {
    constructor(private readonly editoraService: EditoraService ){}

  @Post()
  async registro(@Body() editoraDTO: CreateEditoraDto) {
    try {
      const result = await this.editoraService.create(editoraDTO);
      
      if(result != HttpStatus.CREATED){
        return {message: "Erro ao criar editora", status : result};
      }
      return {result : result, message: `Editora ${editoraDTO.name} criada com sucesso`};

    } catch (error) {

      throw error; 
    }
  }

  @Get(":id")
  async getOneEditora(@Param("id", ParseIntPipe) id : number){
    
    try{
      const result = await this.editoraService.findOne(id);
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
      const result =  await this.editoraService.findAll();
      return {status : HttpStatus.ACCEPTED, result : result}
    }
    catch(error){
      throw error;
    }
  }
}


