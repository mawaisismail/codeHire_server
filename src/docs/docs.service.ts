import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { DocsEntity } from './model/docs.entity';

@Injectable()
export class DocsService {
  constructor(
    @InjectModel(DocsEntity.name)
    private readonly docs: Model<DocsEntity>,
    private jwtService: JwtService,
  ) {}

  async getDocsById(uid: string): Promise<any> {
    return this.docs.aggregate([
      {
        $match: {
          uid,
        },
      },
    ]);
  }

  async uploadDocs(
    url: string,
    uid: string,
    name: string,
  ): Promise<DocsEntity> {
    return await this.docs.create({
      url,
      uid,
      name,
    });
  }
  async deleteDoc(uid: string): Promise<any> {
    return await this.docs.deleteOne({
      uid,
    });
  }
}
