import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import {Heroes} from '../models/heroes.model';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('dados-herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  @UseInterceptors(FilesInterceptor("imagens"))
  @Post()
  insere(
    @Body() createDadosHeroisDto: CreateDadosHeroisDto,
    @UploadedFiles(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /(image\/jpeg|image\/png)/ }),
        new MaxFileSizeValidator({maxSize: 1024 * 1000 * 2})
      ]
    })) imagens: Express.Multer.File[])
  {
    createDadosHeroisDto.image = imagens[0];
    createDadosHeroisDto.converImage = imagens[1];

    return this.dadosHeroisService.create(createDadosHeroisDto);
  }

  @Get('heroesByPublisher')
  async getHeroesByPublisher(@Query('publisher') publisher: number): Promise<Heroes[]> {
    return this.dadosHeroisService.getHeroesByPublisher(publisher);
  }
}
