import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  create(file: Express.Multer.File) {
    return {
      fileName: file.originalname,
    };
  }

  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../static/products', imageName);

    if (!existsSync)
      throw new BadRequestException(`Not product foun with image ${imageName}`);

    return path;
  }
}
