import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuratTemplate, SuratTemplateSchema } from './surat-template.schema';
import { SuratTemplateService } from './surat-template.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SuratTemplate.name, schema: SuratTemplateSchema }]),
  ],
  providers: [SuratTemplateService],
  exports: [SuratTemplateService], 
})
export class SuratTemplateModule {}
