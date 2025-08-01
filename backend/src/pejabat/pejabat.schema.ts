import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PejabatDocument = Pejabat & Document;

@Schema()
export class Pejabat {
  @Prop() name!: string;
  @Prop() position!: string;
  @Prop() nip!: string;
  @Prop() rank! : string;
  @Prop() grade!: string;
  @Prop() notes!: string;
}
   
export const PejabatSchema = SchemaFactory.createForClass(Pejabat);
