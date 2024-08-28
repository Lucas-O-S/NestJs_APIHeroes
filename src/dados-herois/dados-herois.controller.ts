import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import {Heroes} from '../models/heroes.model';

@Controller('dados-herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  @Post()
  insere(@Body() createDadosHeroisDto: CreateDadosHeroisDto) {
    return this.dadosHeroisService.create(createDadosHeroisDto);
  }

  @Get('heroesByPublisher')
  async getHeroesByPublisher(@Query('publisher') publisher: number): Promise<Heroes[]> {
    return this.dadosHeroisService.getHeroesByPublisher(publisher);
  }
}
