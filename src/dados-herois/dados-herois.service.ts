import { Injectable } from '@nestjs/common';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import { Heroes } from 'src/models/heroes.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DadosHeroisService {
  constructor(
    @InjectModel(Heroes)
    private readonly heroesModel: typeof Heroes,
  ) {}
  
  async create(createDadosHeroisDto: CreateDadosHeroisDto) {

    //await this.heroesModel.create(createDadosHeroisDto);
    
    //Retorno temporario para testes
    return createDadosHeroisDto;
  }

  async getHeroesByPublisher(publisher): Promise<Heroes[]> {
    return this.heroesModel.findAll({where: {editoraId:publisher}});
  }

  findAll() {
    return `This action returns all dadosHerois`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dadosHerois`;
  }

  update(id: number, updateDadosHeroisDto: UpdateDadosHeroisDto) {
    return `This action updates a #${id} dadosHerois`;
  }

  remove(id: number) {
    return `This action removes a #${id} dadosHerois`;
  }
}
