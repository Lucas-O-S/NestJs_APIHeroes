import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEditoraDto {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;
}
