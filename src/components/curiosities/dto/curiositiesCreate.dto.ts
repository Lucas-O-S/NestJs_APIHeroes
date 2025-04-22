import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCuriositiesDto {
    @IsString({ message: "Título deve ser string" })
    @IsNotEmpty({ message: "Título não pode estar vazio" }) 
    @MaxLength(100, { message: "Título deve conter menos de 100 caracteres" })
    readonly title: string;

    @IsString({ message: "legenda deve ser string" })
    @IsNotEmpty({ message: "legenda não pode estar vazio" }) 
    @MaxLength(100, { message: "legenda deve conter menos de 100 caracteres" })
    readonly caption: string;

    @IsString({ message: "Autor deve ser string" })
    @IsNotEmpty({ message: "Autor não pode estar vazio" }) 
    @MaxLength(100, { message: "Autor deve conter menos de 100 caracteres" })
    readonly author: string;

    @IsString({ message: "fonte deve ser string" })
    @MaxLength(50, { message: "fonte deve conter menos de 50 caracteres" })
    readonly font: string;

    @IsString({ message: "Descrição deve ser string" })
    @MaxLength(100, { message: "Descrição deve conter menos de 100 caracteres" })
    readonly description_font: string;
}