import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Article } from "src/infrastructure/database/sequelize/models/article.model";
import { ArticlesRepository } from "src/infrastructure/repositories/articles.repository";

@Injectable()
export class FindAllArticleUseCase {

    constructor( private readonly articlesRepository: ArticlesRepository){}

    async findAllArticles(): Promise<ApiResponseInterface<Article>>{
        const articles = await this.articlesRepository.findAllArticles();

        if(!articles){
            return{
                status: HttpStatus.NOT_FOUND,
                message: "Não foram encontrados dados de artigos."
            }
        }
    
        return{
            status:HttpStatus.OK,
            message: "Artigos encontrados com sucesso.",
            data:articles
        }
    }
}
