import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sexo } from '../models/sexo.model';

@Injectable()
export class SexoService {
  constructor(
    @InjectModel(Sexo)
    private readonly sexoModel: typeof Sexo,
  ){}

  async create(sexoDTO: CreateSexoDto): Promise<Sexo>{
      const existingSexo = await this.sexoModel.findOne({ where: {nome: sexoDTO.nome}});

      if(existingSexo){
        throw new ConflictException('Já existe um registro n tabela equipes com este nome.')
      }

      return this.sexoModel.create(sexoDTO);
    
  }

  async findAll(): Promise<Sexo[]>{
    return await this.sexoModel.findAll();
  }
}
