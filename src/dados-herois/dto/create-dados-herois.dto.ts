import {IsNumber, IsString} from "class-validator";

export class CreateDadosHeroisDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly moralidade: string;

    @IsString()
    readonly studio: string;

    @IsNumber()
    readonly anoLancamento: Number;

    @IsString()
    readonly image: string;

    @IsString()
    readonly image_cover: string;

    @IsString()
    readonly  equipe: string;

    @IsString()
    readonly origem: string;

    @IsString()
    readonly sexo: string;
}
