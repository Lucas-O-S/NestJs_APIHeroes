import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CuriositiesService } from "./curiosities.Service";
import { CreateCuriositiesDto } from "./dto/curiositiesCreate.dto";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { UpdateCuriositiesDto } from "./dto/curiositiesUpdate.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("curiosities")
export class CuriositiesController {

    constructor(private readonly curiositiesService : CuriositiesService){}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() curiositiesDto: CreateCuriositiesDto): Promise<ApiResponseInterface<CreateCuriositiesDto>> {
        try{
            const result = await this.curiositiesService.create(curiositiesDto);
            return result;
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao registrar curiosidade.',
                error: error.message || error,
            };
        }
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async update(@Body() curiositiesDto: UpdateCuriositiesDto, @Param("id") id: number): Promise<ApiResponseInterface<UpdateCuriositiesDto>> {
        try{
            const result = await this.curiositiesService.update(id, curiositiesDto);
            return result;
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao registrar curiosidade.',
                error: error.message || error,
            };
        }
    }

    @Get('find-one-curiosity/:id')
    async findOne(@Param("id") id: number): Promise<ApiResponseInterface<CreateCuriositiesDto>> {
        try{
            const result = await this.curiositiesService.findOne(id);
            return result; 
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao buscar curiosidade.',
                error: error.message || error,
            };
        }
    }

    @Get('find-all-curiosities')
    async findAll(): Promise<ApiResponseInterface<CreateCuriositiesDto>> {
        try{
            const result = await this.curiositiesService.findAll();
            return result; 
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao buscar curiosidades.',
                error: error.message || error,
            };
        }
    }

    @UseGuards(AuthGuard)
    @Delete('delete-one-curiosity/:id')
    async deleteOne(@Param("id") id: number): Promise<ApiResponseInterface<CreateCuriositiesDto>> {
        try{
            const result = await this.curiositiesService.delete(id);
            return result; 
        }catch(error){
            return {
                status: 500,
                message: 'Erro inesperado ao deletar curiosidade.',
                error: error.message || error,
            };
        }
    }
}