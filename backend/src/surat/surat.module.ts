import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SuratTemplate, SuratTemplateSchema } from './surat-template.schema';
import { SuratTemplateService } from './surat-template.service';

import { SuratController } from './surat.controller';
import { SuratService } from './surat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuratTemplate.name, schema: SuratTemplateSchema },
    ]),
  ],
  controllers: [SuratController],
  providers: [SuratTemplateService, SuratService],
})
export class SuratModule {}
