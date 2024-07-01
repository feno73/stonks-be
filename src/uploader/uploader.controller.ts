import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';


@Controller('uploader')
export class UploaderController {
    constructor(private readonly uploadService: UploaderService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            originalname: file.originalname,
            filename: file.filename,
        };
    }
}
