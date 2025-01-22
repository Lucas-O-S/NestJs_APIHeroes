import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import { Heroes } from '../../models/heroes.model';
import { InjectModel } from '@nestjs/sequelize';
import { TeamService } from '../team/team.service';
import { StudioService } from '../studio/studio.service';
import { ApiResponse } from 'src/interfaces/APIResponse.interface';

@Injectable()
export class DadosHeroisService {
  constructor(
    @InjectModel(Heroes)
    private readonly heroesModel: typeof Heroes,
    private readonly teamService: TeamService,
    private readonly studioService: StudioService,
  ) {}
  
  async create(createDadosHeroisDto: CreateDadosHeroisDto) : Promise<ApiResponse> {
    
    //Verifica se o estudio e o time existem 
    if(await this.VerifyForeignKey(createDadosHeroisDto)){
      return {
        message: "Erro ao adicionar herois",
        status : HttpStatus.BAD_REQUEST
      };
    }
    //Cria o heroi
    await this.heroesModel.create(createDadosHeroisDto);
    
    return {
      message: "Heroi adicionado com sucesso",
      status : HttpStatus.OK

    };
  }


  async findAll() : Promise<ApiResponse<Heroes>> {
    const result = await this.heroesModel.findAll();

    return {
      message: "Herois encontrados com sucesso",
      status : HttpStatus.OK,
      data: result
    };
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
     
    if(!await this.teamService.exists(hero.team)){
      return false;
    }
  
    if(!await this.studioService.exists(hero.studio_id)){
      return false;
    }
    return true;
    
  }
}
