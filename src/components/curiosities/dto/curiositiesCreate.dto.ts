import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCuriositiesDto {
    
    @IsString({ message: "Título deve ser string" })
    @IsNotEmpty({ message: "Título não pode estar vazio" }) 
    @MinLength(100, { message: "Título deve conter mais de 100 caracteres" })
    readonly title: string;

    @IsString({ message: "legenda deve ser string" })
    @IsNotEmpty({ message: "legenda não pode estar vazio" }) 
    @MinLength(100, { message: "legenda deve conter mais de 100 caracteres" })
    readonly caption: string;

    @IsString({ message: "Autor deve ser string" })
    @IsNotEmpty({ message: "Autor não pode estar vazio" }) 
    @MinLength(100, { message: "Autor deve conter mais de 100 caracteres" })
    readonly author: string;

    @IsString({ message: "fonte deve ser string" })
    @MinLength(50, { message: "fonte deve conter mais de 50 caracteres" })
    readonly font: string;

    @IsString({ message: "Descrição deve ser string" })
    @MinLength(100, { message: "Descrição deve conter mais de 100 caracteres" })
    readonly description: string;

}