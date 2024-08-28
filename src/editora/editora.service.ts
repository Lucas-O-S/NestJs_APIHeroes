import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Editora } from '../models/editoras.model';
import { CreateEditoraDto } from './dto/create-editora.dto';

@Injectable()
export class EditoraService {
  constructor(
    @InjectModel(Editora)
    private readonly editoraModel: typeof Editora,
  ) {}

  async create(editoraDTO: CreateEditoraDto): Promise<Editora> {
    // Verifica se já existe uma editora com o nome fornecido
    const existingEditora = await this.editoraModel.findOne({
      where: { nome: editoraDTO.nome },
    });

    if (existingEditora) {
      throw new ConflictException('Já existe um registro na tabela editoras com este nome.');
    }

    // Cria uma nova editora se não houver conflitos
    return this.editoraModel.create(editoraDTO);
  }

  async findAll(): Promise<Editora[]> {
    return this.editoraModel.findAll();
  }

}
