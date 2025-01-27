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
    if(!await this.VerifyForeignKey(createDadosHeroisDto)){
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
    const result = await this.heroesModel.findAll({
      attributes: { exclude: ['studioId'] }, //Está puxando um campo inexistente chamado studioId não sei da onde sendo que deveria ter soemente studio_id
    });
    return {
      message: "Herois encontrados com sucesso",
      status : HttpStatus.OK,
      data: result
    };
  }

  async findOne(id: number) : Promise<ApiResponse<Heroes>> {
    const result = await this.heroesModel.findOne({where: {id}, attributes: { exclude: ['studioId'] }}); //Está puxando um campo inexistente chamado studioId não sei da onde sendo que deveria ter soemente studio_id
    
    if(!result){
      return {
        message: "Registro não encontrado",
        status : HttpStatus.NOT_FOUND
      };
    }
    return {
      message: "Registro encontrado com sucesso",
      status : HttpStatus.OK,
      dataUnit : result
    };
  }

  async update(id: number, updateDadosHeroisDto: UpdateDadosHeroisDto) {
    if(!await this.Exists(id)){
      return {
        message: "Registro não encontrado",
        status : HttpStatus.NOT_FOUND
      };
    }
        //Verifica se o estudio e o time existem 
        if(!await this.VerifyForeignKey(updateDadosHeroisDto)){
          return {
            message: "Erro ao adicionar herois",
            status : HttpStatus.BAD_REQUEST
          };
        }
        
    await this.heroesModel.update(updateDadosHeroisDto, {where: {id}});
    
    return {
      message: "Registro atualizado com sucesso",
      status : HttpStatus.OK
    };

  }

  async remove(id: number) : Promise<ApiResponse> {
    if(!await this.Exists(id)){
      return {
        message: "Registro não encontrado",
        status : HttpStatus.NOT_FOUND
      };
    }
    await this.heroesModel.destroy({where: {id}});
    return {
      message: "Registro deletado com sucesso",
      status : HttpStatus.OK
    };
  }

  private async VerifyForeignKey(hero){
     
    
    if( hero.team_id && !await this.teamService.exists(hero.team_id)){
      console.log(`Time: ${hero.team_id}`);
      return false;
    }
  
    if(hero.studio_id && !await this.studioService.exists(hero.studio_id)){
      console.log(`estudio: ${hero.team_id}`);
      return false;
    }
    return true;
    
  }

  async Exists(id: number){
    const result = await this.heroesModel.findOne({
      attributes: { exclude: ['studioId'] }, //Está puxando um campo inexistente chamado studioId não sei da onde sendo que deveria ter soemente studio_id
    });    
    if(result){
      return true;
    }
    return false;
  }
}
