import { Controller, Post, Body, Get, ConflictException } from "@nestjs/common";
import { EditoraService } from "./editora.service";
import { CreateEditoraDto } from "./dto/create-editora.dto";
import {Editora} from '../models/editoras.model';

@Controller('editora')
export class EditoraController {
    constructor(private readonly editoraService: EditoraService ){}

    @Post('criaRegistro')
  async registro(@Body() editoraDTO: CreateEditoraDto) {
    try {
      return await this.editoraService.create(editoraDTO);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Editora com este nome já existe');
      }
      throw error; // Re-throw unknown errors
    }
  }

  @Get('getAll')
  async getAllEditoras(): Promise<Editora[]> {
    return this.editoraService.findAll();
  }
}


