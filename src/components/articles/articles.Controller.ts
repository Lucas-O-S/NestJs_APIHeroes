import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ArticlesService } from "./articles.Service";
import { CreateArticleDto } from "./dto/articlesCreate.dto";
import { ApiResponse } from "src/interfaces/APIResponse.interface";
import { UpdateArticlesDto } from "./dto/articlesUpdate.dto";

@Controller("articles")
export class ArticlesController {

    constructor(private readonly ArticlesService : ArticlesService){}

    @Post()
    async create(@Body() articlesDto: CreateArticleDto): Promise<ApiResponse<CreateArticleDto>> {
        try{
            const result = await this.ArticlesService.create(articlesDto);
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
    async update(@Body() articleDto: UpdateArticlesDto, @Param("id") id: number): Promise<ApiResponse<UpdateArticlesDto>> {
        try{
            const result = await this.ArticlesService.update(id, articleDto);
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
    async findOne(@Param("id") id: number): Promise<ApiResponse<CreateArticleDto>> {
        try{
            const result = await this.ArticlesService.findOne(id);
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
    async findAll(): Promise<ApiResponse<CreateArticleDto>> {
        try{
            const result = await this.ArticlesService.findAll();
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
    async deleteOne(@Param("id") id: number): Promise<ApiResponse<CreateArticleDto>> {
        try{
            const result = await this.ArticlesService.delete(id);
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