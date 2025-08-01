import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Riwayat extends Document {
  @Prop({ required: true })
  suratId!: string;

  @Prop({ required: true })
  namaWarga!: string;

  @Prop({ required: true })
  jenisSurat!: string;

  @Prop({ required: true })
  perangkatDesa!: string;
}

export const RiwayatSchema = SchemaFactory.createForClass(Riwayat);
