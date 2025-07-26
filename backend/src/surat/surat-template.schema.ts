import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SuratTemplateDocument = SuratTemplate & Document;

@Schema()
export class SuratTemplate {
  @Prop({ required: true, unique: true }) jenis_surat!: string;

  @Prop({ type: [String], required: true })
  fields!: string[]; 
}

export const SuratTemplateSchema = SchemaFactory.createForClass(SuratTemplate);
