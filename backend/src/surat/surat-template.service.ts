import { Injectable,ConflictException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuratTemplate, SuratTemplateDocument } from './surat-template.schema';
import { CreateSuratTemplateDto } from './dto/create-surat-template.dto';
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

  async createTemplate(dto: CreateSuratTemplateDto): Promise<SuratTemplate> {
    const existing = await this.suratTemplateModel.findOne({ jenis_surat: dto.jenis_surat });
    if (existing) {
      throw new ConflictException('Jenis surat sudah ada');
    }

    const newTemplate = new this.suratTemplateModel(dto);
    return newTemplate.save();
  }
  async deleteTemplate(jenis_surat: string): Promise<SuratTemplate | null> {
    return this.suratTemplateModel.findOneAndDelete({ jenis_surat }).exec();
  }
}
