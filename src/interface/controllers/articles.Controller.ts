import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { CreateArticleDto } from "../dtos/articles/articlesCreate.dto";
import { UpdateArticlesDto } from "../dtos/articles/articlesUpdate.dto";
import { ArticlesService } from "../../application/services/articles.service"

@Controller("articles")
export class ArticlesController {

    constructor(private readonly ArticlesService : ArticlesService){}

    @Post()
    async create(@Body() articlesDto: CreateArticleDto): Promise<ApiResponseInterface<CreateArticleDto>> {
        try{
            const result = await this.ArticlesService.createArticle(articlesDto);
            return result;
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao registrar Artigo.',
                error: error.message || error,
            };
        }
    }

    @Put('update/:id')
    async update(@Body() articleDto: UpdateArticlesDto, @Param("id") id: number): Promise<ApiResponseInterface<UpdateArticlesDto>> {
        try{
            const result = await this.ArticlesService.updateArticle(id, articleDto);
            return result;
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao atualizar Artigo.',
                error: error.message || error,
            };
        }
    }

    @Get('find-one-article/:id')
    async findOne(@Param("id") id: number): Promise<ApiResponseInterface<CreateArticleDto>> {
        try{
            const result = await this.ArticlesService.findArticleById(id);
            return result; 
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao buscar Artigo.',
                error: error.message || error,
            };
        }
    }

    @Get('find-all-articles')
    async findAll(): Promise<ApiResponseInterface<CreateArticleDto>> {
        try{
            const result = await this.ArticlesService.findAllArticles();
            return result; 
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao buscar Artigo.',
                error: error.message || error,
            };
        }
    }

    @Delete('delete-one-article/:id')
    async deleteOne(@Param("id") id: number): Promise<ApiResponseInterface<number>> {
        try{
            const result = await this.ArticlesService.deleteArticle(id);
            return result; 
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao deletar Artigos.',
                error: error.message || error,
            };
        }
    }
}