import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateEditoraDto {
  @IsString({message: 'Informe um nome válido'})
  @IsNotEmpty({message: 'O nome é obrigatório'})
  @MaxLength(100, {message: 'O nome deve ter no máximo 100 caracteres'})
  readonly name: string;

  @IsString({message: 'Informe uma nacionalidade válida'})
  @IsNotEmpty({message: 'A nacionalidade é obrigatória'})
  @MaxLength(50, {message: 'A nacionalidade deve ter no máximo 50 caracteres'})
  readonly nationality: string;

  @IsString({message: 'Informe uma história válida'})
  @IsNotEmpty({message: 'A história é obrigatória'})
  @MaxLength(255, {message: 'A história deve ter no máximo 500 caracteres'})
  @MinLength(20, {message: "A história deve ter no minimo 20 caracteres"})
  readonly history: string;


  
}
