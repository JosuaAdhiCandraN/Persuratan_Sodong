import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DesaDocument = Desa & Document;

@Schema()
export class Desa {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  jabatan!: string;

  @Prop({ required: true })
  NIP!: string;

  @Prop ({required: true})
  pangkat! : string;

  @Prop({ required : true })
  golongan!: string;
}

export const DesaSchema = SchemaFactory.createForClass(Desa);
