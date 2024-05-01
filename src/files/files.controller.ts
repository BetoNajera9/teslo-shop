import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { Response } from 'express';
import {
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  Controller,
  Param,
  Post,
  Get,
  Res,
} from '@nestjs/common';

import { fileFilter, fileNamer } from './helpers';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) { }

  @Get('product/:imageName')
  findImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('imageFile', {
      fileFilter,
      limits: { fileSize: 5_000_000 },
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Make sure the file is an image');

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    // return this.filesService.create(file);
    return {
      secureUrl,
    };
  }
}
