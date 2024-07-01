import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => (Math.round(Math.random() * 16)).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    ],
    providers: [UploaderService],
    controllers: [UploaderController],
})
export class UploaderModule {}
