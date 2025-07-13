import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiResponseInterface } from 'src/domain/interfaces/APIResponse.interface';
import { Article } from 'src/infrastructure/database/sequelize/models/article.model';
import { CreateArticleDto } from '../../interface/dtos/articles/articlesCreate.dto';
import { UpdateArticlesDto } from './dto/articlesUpdate.dto';

@Injectable()
export class ArticlesService{

    constructor(
        @InjectModel(Article)
        private curiositiesModel : typeof Article
    ){}

    async create(curiositiesDto : CreateArticleDto) : Promise<ApiResponseInterface<CreateArticleDto>>{
        try{
            await this.curiositiesModel.create(curiositiesDto);
            return {
                status: HttpStatus.CREATED,
                message: 'Registro criado com sucesso!'
            }
        }
        catch(error){
            console.error("Erro no método create:", error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao tentar registrar um novo artigo: ${error.message || error}`
            };
        }
    }

    async update(id: number, curiositiesDto: UpdateArticlesDto) : Promise<ApiResponseInterface<UpdateArticlesDto>>{
        try{
            if(await this.exists(id) == false){
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Artigo não encontrado!'
                }
            }

            await this.curiositiesModel.update(curiositiesDto, {
                where: {id}
            });

            return {
                status: HttpStatus.OK,
                message: 'Registro atualizado com sucesso!'
            }
        }
        catch(error){
            console.error("Erro no método update:", error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao tentar registrar um novo artigo: ${error.message || error}`
            };
        }
    }

    async findOne(id: number) : Promise<ApiResponseInterface<CreateArticleDto>>{
        try{
            const Curiosities = await this.curiositiesModel.findOne({
                where: {id}
            })

            if(!Curiosities){
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Artigo não encontrado!'
                }
            }
            return{
                status: HttpStatus.OK,
                message: 'Artigo encontrada com sucesso!',
                dataUnit: Curiosities
            }
        }
        catch(error){
            console.error("Erro no método findOne:", error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao tentar registrar um novo artigo: ${error.message || error}`
            };
        }
    }

    async findAll() : Promise<ApiResponseInterface<CreateArticleDto>>{
        try{
            const Curiosities = await this.curiositiesModel.findAll();

            if(Curiosities.length === 0){
                return {
                    status: HttpStatus.NO_CONTENT,
                    message: 'Nenhum Artigo encontrado!'
                }
            }

            return {
                status: HttpStatus.OK,
                message: 'Artigo encontrado com sucesso!',
                data: Curiosities
            }
        }
        catch(error){
            console.error("Erro no método findAll:", error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao tentar registrar um novo artigo: ${error.message || error}`
            };
        }
    }

    async exists(id: number) : Promise<boolean>{
        const curiosities = await this.curiositiesModel.findOne({where: {id}});
        return curiosities != null;
    }

    async delete(id: number) : Promise<ApiResponseInterface>{
        try{
            if(await this.exists(id) == false){
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Artigo não encontrado!'
                }
            }

            await this.curiositiesModel.destroy({
                where: {id}
            });

            return {
                status: HttpStatus.OK,
                message: 'Registro deletado com sucesso!'
            }
        }
        catch(error){
            console.error("Erro no método delete:", error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao tentar registrar um novo artigo: ${error.message || error}`
            };
        }
    }


}

function injectable(): (target: typeof ArticlesService) => void | typeof ArticlesService {
    throw new Error('Function not implemented.');
}
