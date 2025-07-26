import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuratTemplate, SuratTemplateDocument } from './surat-template.schema';

@Injectable()
export class SuratTemplateService {
  constructor(
    @InjectModel(SuratTemplate.name)
    private suratTemplateModel: Model<SuratTemplateDocument>,
  ) {}

  async getFieldsForJenisSurat(jenis_surat: string): Promise<string[] | null> {
    const template = await this.suratTemplateModel.findOne({ jenis_surat }).exec();
    return template?.fields || null;
  }
}
