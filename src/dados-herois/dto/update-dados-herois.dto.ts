import { PartialType } from '@nestjs/mapped-types';
import { CreateDadosHeroisDto } from './create-dados-herois.dto';

export class UpdateDadosHeroisDto extends PartialType(CreateDadosHeroisDto) {}
