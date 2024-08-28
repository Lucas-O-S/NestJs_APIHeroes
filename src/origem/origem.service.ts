import { ConflictException, Injectable } from '@nestjs/common';
import { CreateOrigemDto } from './dto/create-origem.dto';
import { InjectModel } from '@nestjs/sequelize';
import {Origens} from '../models/origem.model';

@Injectable()
export class OrigemService {
  constructor(
    @InjectModel(Origens) 
    private origemModel: typeof Origens, 
  ) {}

  async create(origemDTO: CreateOrigemDto): Promise<Origens>{
    // Implementar lógica de criação
    const existingOrigem = await this.origemModel.findOne({
      where: { nome: origemDTO.nome}
    });

    if(existingOrigem){
      throw new ConflictException('Já existe um registro n tabela equipes com este nome.')
    }
    //cria uma nova equipe se não houver conflitos
    return this.origemModel.create(origemDTO);
  }

  async findAll():Promise<Origens[]>{
    return this.origemModel.findAll();
  }
}
