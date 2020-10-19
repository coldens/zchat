import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as aws from 'aws-sdk';
import { v4 } from 'uuid';

@Injectable()
export class UploadFileService {
  readonly S3: aws.S3;

  constructor(configService: ConfigService) {
    const spacesEndpoint = new aws.Endpoint(
      configService.get('SPACE_ENDPOINT'),
    );

    this.S3 = new aws.S3({
      credentials: {
        accessKeyId: configService.get('SPACE_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('SPACE_SECRET_ACCESS_KEY'),
      },
      endpoint: spacesEndpoint.href,
    });
  }

  async upload(name: string, body: Buffer) {
    const result = await this.put(name, body);
    return result;
  }

  private put(name: string, body: Buffer): Promise<string> {
    const uuid = v4();
    const Key = `zchat/${uuid}/${name}`;
    const Bucket = 'zegelvirtual';

    return new Promise((resolve, reject) => {
      this.S3.upload(
        {
          Bucket,
          Key,
          Body: body,
          ACL: 'public-read',
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }

          resolve(data.Location);
        },
      );
    });
  }
}
