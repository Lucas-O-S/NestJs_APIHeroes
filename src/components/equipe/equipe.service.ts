import { ConflictException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'; // Alterar para Sequelize
import { Team } from '../../models/equipes.model';
import { CreateEquipeDto } from './dto/create-equipe.dto';


@Injectable()
export class EquipeService {
  constructor(
    @InjectModel(Team) 
    private equipeModel: typeof Team 
  ) {}

  async create(equipeDto: CreateEquipeDto) : Promise<HttpStatus> {
    const existingEquipe = await this.equipeModel.findOne({
      where: { name: equipeDto.name}
    });

    if(existingEquipe){
      throw new ConflictException('Já existe um registro n tabela equipes com este nome.')
    }

    await this.equipeModel.create(equipeDto);

    return HttpStatus.CREATED;
  }

  async findOne(id: number): Promise<Team>{
    const result : Team = await this.equipeModel.findOne({ where: {id}});
    if(result == null){
      throw new ConflictException('Equipe com este id não existe');
    }
    return result;
  }

  async findAll(): Promise<Team[]> {
    return await this.equipeModel.findAll(); // Usar equipeModel
  }

  async exists(id: number): Promise<boolean>{
    const equipe = await this.equipeModel.findOne({where: {id}});
    return equipe != null;
  }

}
