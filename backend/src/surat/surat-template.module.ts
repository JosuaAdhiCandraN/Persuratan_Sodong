import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuratTemplate, SuratTemplateSchema } from './surat-template.schema';
import { SuratTemplateService } from './surat-template.service';
import { SuratTemplateController } from './surat-template.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SuratTemplate.name, schema: SuratTemplateSchema }]),
  ],
  controllers: [SuratTemplateController],
  providers: [SuratTemplateService],
  exports: [SuratTemplateService],
})
export class SuratTemplateModule {}

