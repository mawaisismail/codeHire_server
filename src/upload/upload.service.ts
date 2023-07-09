import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  AWS_ACCESS_KEY,
  AWS_S3_BUCKET,
  AWS_S3_REGION,
  AWS_SECRET_ACCESS_KEY,
} from './constansts/config-file';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: AWS_S3_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async upload(fileName: string, file: Buffer): Promise<string> {
    const newFileName = Date.now() + '-' + fileName;
    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: newFileName,
      Body: file,
    });

    try {
      await this.s3Client.send(command);
      return `https://${AWS_S3_BUCKET}.s3.amazonaws.com/${newFileName}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
