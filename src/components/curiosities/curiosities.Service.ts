import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiResponseInterface } from 'src/interfaces/APIResponse.interface';
import { Curiosities } from "src/models/curiosities.model";
import { CreateCuriositiesDto } from './dto/curiositiesCreate.dto';
import { UpdateCuriositiesDto } from './dto/curiositiesUpdate.dto';

@Injectable()
export class CuriositiesService{

    constructor(
        @InjectModel(Curiosities)
        private curiositiesModel : typeof Curiosities
    ){}

    async create(curiositiesDto : CreateCuriositiesDto) : Promise<ApiResponseInterface<CreateCuriositiesDto>>{
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
                message: `Erro ao tentar registrar uma nova curiosidade: ${error.message || error}`
            };
        }
    }

    async update(id: number, curiositiesDto: UpdateCuriositiesDto) : Promise<ApiResponseInterface<UpdateCuriositiesDto>>{
        try{
            if(await this.exists(id) == false){
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Curiosidade não encontrada!'
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
                message: `Erro ao tentar atualizar a curiosidade: ${error.message || error}`
            };
        }
    }

    async findOne(id: number) : Promise<ApiResponseInterface<CreateCuriositiesDto>>{
        try{
            const Curiosities = await this.curiositiesModel.findOne({
                where: {id}
            })

            if(!Curiosities){
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Curiosidade não encontrada!'
                }
            }
            return{
                status: HttpStatus.OK,
                message: 'Curiosidade encontrada com sucesso!',
                dataUnit: Curiosities
            }
        }
        catch(error){
            console.error("Erro no método findOne:", error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao tentar encontrar a curiosidade: ${error.message || error}`
            };
        }
    }

    async findAll() : Promise<ApiResponseInterface<CreateCuriositiesDto>>{
        try{
            const Curiosities = await this.curiositiesModel.findAll();

            if(Curiosities.length === 0){
                return {
                    status: HttpStatus.NO_CONTENT,
                    message: 'Nenhuma curiosidade encontrada!'
                }
            }

            return {
                status: HttpStatus.OK,
                message: 'Curiosidades encontradas com sucesso!',
                data: Curiosities
            }
        }
        catch(error){
            console.error("Erro no método findAll:", error);
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Erro ao tentar encontrar as curiosidades: ${error.message || error}`
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
                    message: 'Curiosidade não encontrada!'
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
                message: `Erro ao tentar deletar a curiosidade: ${error.message || error}`
            };
        }
    }


}

function injectable(): (target: typeof CuriositiesService) => void | typeof CuriositiesService {
    throw new Error('Function not implemented.');
}
