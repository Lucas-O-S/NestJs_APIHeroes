import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTeamDto {
    
    
    @IsString({message: 'O campo nome deve ser uma string'})
    @IsNotEmpty({message: 'O campo nome é obrigatório'})
    @MaxLength(100,{message: 'O campo nome deve ter no máximo 100 caracteres'})
    readonly name: string;

    
    @IsString({message: 'O campo criador deve ser uma string'})
    @IsNotEmpty({message: 'O campo criador é obrigatório'})
    @MaxLength(100,{message: 'O campo criador deve ter no máximo 100 caracteres'})
    readonly creator: string;
}
