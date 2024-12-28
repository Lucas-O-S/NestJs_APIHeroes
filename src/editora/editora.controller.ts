import { Controller, Post, Body, Get, ConflictException, Param, ParseIntPipe } from "@nestjs/common";
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
      return {result : result, message: `Editora ${editoraDTO.name} criada com sucesso`};
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Editora com este nome já existe');
      }
      throw error; 
    }
  }

  @Get(":id")
  async getOneEditora(@Param("id", ParseIntPipe) id : number): Promise<Editora> {
    
    try{

      return await this.editoraService.findOne(id);
      
    }
    catch(error){
      
      if(!await this.editoraService.Exist(id)){
        throw new ConflictException('Não existe uma editora com este ID.');
      }
      throw error;
    }
  }

  @Get()
  async getAllEditoras(): Promise<Editora[]> {
    try{
      return await this.editoraService.findAll();
    }
    catch(error){
      throw error;
    }
  }
}


