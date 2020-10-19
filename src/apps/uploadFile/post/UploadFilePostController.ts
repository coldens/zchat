import { Body, Controller, Post } from '@nestjs/common';
import { UploadFileService } from './UploadFileService';

@Controller('upload-file')
export class UploadFilePostController {
  constructor(private service: UploadFileService) {}

  @Post()
  async uploadFile(@Body() body) {
    const file = body.file;
    const fileUrl = await this.service.upload(file.name, file.data);

    return { fileUrl };
  }
}
