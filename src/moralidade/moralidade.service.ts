import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMoralidadeDto } from './dto/create-moralidade.dto';
import { InjectModel } from '@nestjs/sequelize';
import {Moralidades} from '../models/moralidades.model';

@Injectable()
export class MoralidadeService {
  constructor(
    @InjectModel(Moralidades)
    private readonly moralidadeModel: typeof Moralidades,
  ){}

  async create(moralidadeDTO: CreateMoralidadeDto): Promise<Moralidades>{
      const existeMoralidade = await this.moralidadeModel.findOne({
        where: { nome: moralidadeDTO.nome}
      });

      if(existeMoralidade){
        throw new ConflictException('Já existe um registro na tabela modalidades com este nome.');
      }

      //cria uma nova moralidade se não houver conflitos
      return this.moralidadeModel.create(moralidadeDTO);
  }

  async findAll(): Promise<Moralidades[]>{
    return this.moralidadeModel.findAll();
  }
}
