import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudioDto {
  @IsString({ message: 'O campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  readonly name: string;

  @IsString({ message: 'O campo nacionalidade deve ser uma string' })
  @IsNotEmpty({ message: 'O campo nacionalidade é obrigatório' })
  readonly nationality: string;

  @IsString({ message: 'O campo história deve ser uma string' })
  @IsNotEmpty({ message: 'O campo história é obrigatório' })
  readonly history: string;
}
