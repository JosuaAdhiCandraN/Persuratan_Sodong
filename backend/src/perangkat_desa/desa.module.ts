import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Desa, DesaSchema } from './desa.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Desa.name, schema: DesaSchema }])]
})
export class DesaModule {}
