import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'; // Alterar para Sequelize
import { Equipe } from '../models/equipes.model';
import { CreateEquipeDto } from './dto/create-equipe.dto';
import { UpdateEquipeDto } from './dto/update-equipe.dto';
import { CreateEditoraDto } from 'src/editora/dto/create-editora.dto';

@Injectable()
export class EquipeService {
  constructor(
    @InjectModel(Equipe) 
    private equipeModel: typeof Equipe 
  ) {}

  async create(equipeDto: CreateEquipeDto): Promise<Equipe> {
    // Implementar lógica de criação
    const existingEquipe = await this.equipeModel.findOne({
      where: { nome: equipeDto.nome}
    });

    if(existingEquipe){
      throw new ConflictException('Já existe um registro n tabela equipes com este nome.')
    }
    //cria uma nova equipe se não houver conflitos
    return this.equipeModel.create(equipeDto);
  }

  async findAll(): Promise<Equipe[]> {
    return await this.equipeModel.findAll(); // Usar equipeModel
  }

}
