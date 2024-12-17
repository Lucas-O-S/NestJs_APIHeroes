import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { CreateDadosHeroisDto } from './dto/create-dados-herois.dto';
import { UpdateDadosHeroisDto } from './dto/update-dados-herois.dto';
import {Heroes} from '../models/heroes.model';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MinFileSizeValidator } from 'src/validators/min_file.validator';

@Controller('dados-herois')
export class DadosHeroisController {
  constructor(private readonly dadosHeroisService: DadosHeroisService) {}

  @UseInterceptors(FilesInterceptor("imagens"))
  @Post()
  insere(
    //Salva as variaveis do body dentro do dto
    @Body() createDadosHeroisDto: CreateDadosHeroisDto,
    //Recebe arquivos enviados dentro da arranjo "imagens" 
    @UploadedFiles(new ParseFilePipe({
      validators: [
        //Verifica se é jpeg ou png e depois se tem no maximo 2 mb
        new FileTypeValidator({ fileType: /(image\/jpeg|image\/png)/ }),
        new MaxFileSizeValidator({maxSize: 1024 * 1000 * 2}),
        new MinFileSizeValidator({ minSize: 1024 * 50 }), 
      ]
    })) imagens: Express.Multer.File[])
  {
    //Verifica se foi enviado duas imagens
    if(imagens.length > 2 || imagens.length < 2){
      throw new BadRequestException("Deve ser enviado duas imagens");
    }
    //Salva no dto
    createDadosHeroisDto.image = imagens[0];
    createDadosHeroisDto.converImage = imagens[1];

    //envia para o serviço 
    return this.dadosHeroisService.create(createDadosHeroisDto);
  }

  @Get('heroesByPublisher')
  async getHeroesByPublisher(@Query('publisher') publisher: number): Promise<Heroes[]> {
    return this.dadosHeroisService.getHeroesByPublisher(publisher);
  }
}
