import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import { Heroes } from '../../models/heroes.model';
import { InjectModel } from '@nestjs/sequelize';
import { TeamService } from '../team/team.service';

@Injectable()
export class DadosHeroisService {
  constructor(
    @InjectModel(Heroes)
    private readonly heroesModel: typeof Heroes,
    private readonly teamService: TeamService,
  ) {}
  
  async create(createDadosHeroisDto: CreateDadosHeroisDto) : Promise<HttpStatus> {
    
    //Verifica se o estudio e o time existem 
    await this.VerifyForeignKey(createDadosHeroisDto);

    //Cria o heroi
    await this.heroesModel.create(createDadosHeroisDto);
    
    return HttpStatus.CREATED;
  }

 /* async getHeroesByPublisher(publisher): Promise<Heroes[]> {
    return this.heroesModel.findAll({where: {editoraId:publisher}});
  }
*/
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

  private async VerifyForeignKey(hero: CreateDadosHeroisDto){
     
      if(!await this.teamService.exists(hero.studio_id)){
        throw new BadRequestException('Estúdio não existe');
      }
    
      if(!await this.teamService.exists(hero.team)){
        throw new BadRequestException('Time não existe');
      }
    
  }
}
