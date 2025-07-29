import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Warga, WargaSchema } from './warga.schema';
import { WargaService } from './warga.service';
import { WargaController } from './warga.controller';
import { SuratTemplateModule } from '../surat/surat-template.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Warga.name, schema: WargaSchema }]),
    SuratTemplateModule, 
  ],
  controllers: [WargaController],
  providers: [WargaService],
})
export class WargaModule {}
