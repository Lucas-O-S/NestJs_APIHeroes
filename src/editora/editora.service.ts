import { Injectable, ConflictException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Editora } from '../models/editoras.model';
import { CreateEditoraDto } from './dto/create-editora.dto';
import e from 'express';

@Injectable()
export class EditoraService {
  constructor(
    @InjectModel(Editora)
    private readonly editoraModel: typeof Editora,
  ) {}

  async create(editoraDTO: CreateEditoraDto): Promise<HttpStatus> {
    // Verifica se já existe uma editora com o nome fornecido
    const existingEditora = await this.editoraModel.findOne({
      where: { name: editoraDTO.name },
    });

    if (existingEditora) {
      throw new ConflictException('Já existe um registro na tabela editoras com este nome.');
    }

    this.editoraModel.create(editoraDTO);

    return HttpStatus.CREATED;
  }

  async findOne(id: number): Promise<Editora> {
    const result = await this.editoraModel.findOne({where: {id}});
    console.log(result);
    if (result == null) {
      throw new ConflictException('Não existe uma editora com este ID.');
    }
    return result;
  }

  async findAll(): Promise<Editora[]> {
    return await this.editoraModel.findAll();
  }

  async Exist (id: number): Promise<boolean> {
    const editora = await this.editoraModel.findOne({where: {id}});
    if (editora != null) {
      return true;
    }
    return false;
  }

}
