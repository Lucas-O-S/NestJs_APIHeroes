import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CuriositiesService } from "./curiosities.Service";
import { CreateCuriositiesDto } from "./dto/curiositiesCreate.dto";
import { ApiResponse } from "src/interfaces/APIResponse.interface";
import { UpdateCuriositiesDto } from "./dto/curiositiesUpdate.dto";

@Controller("curiosities")
export class CuriositiesController {

    constructor(private readonly curiositiesService : CuriositiesService){}

    @Post()
    async create(@Body() curiositiesDto: CreateCuriositiesDto): Promise<ApiResponse<CreateCuriositiesDto>> {
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

    @Put('update/:id')
    async update(@Body() curiositiesDto: UpdateCuriositiesDto, @Param("id") id: number): Promise<ApiResponse<UpdateCuriositiesDto>> {
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

    @Get('find-one-curiositie/:id')
    async findOne(@Param("id") id: number): Promise<ApiResponse<CreateCuriositiesDto>> {
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
    async findAll(): Promise<ApiResponse<CreateCuriositiesDto>> {
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

    @Delete('delete-one-curiositie/:id')
    async deleteOne(@Param("id") id: number): Promise<ApiResponse<CreateCuriositiesDto>> {
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