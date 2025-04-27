import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudioDto {
  @ApiProperty()
  @IsString({ message: 'O campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  readonly name: string;

  @ApiProperty()
  @IsString({ message: 'O campo nacionalidade deve ser uma string' })
  @IsNotEmpty({ message: 'O campo nacionalidade é obrigatório' })
  readonly nationality: string;

  @ApiProperty()
  @IsString({ message: 'O campo história deve ser uma string' })
  @IsNotEmpty({ message: 'O campo história é obrigatório' })
  readonly history: string;
}
