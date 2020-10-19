import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadFilePostController } from './post/UploadFilePostController';
import { UploadFileService } from './post/UploadFileService';

@Module({
  imports: [ConfigModule],
  controllers: [UploadFilePostController],
  providers: [UploadFileService],
})
export class UploadFileHttpModule {}
