import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WargaDocument = Warga & Document;

@Schema()
export class Warga {
  @Prop() no_kk!: string;
  @Prop() nik!: string;
  @Prop() nama_lengkap!: string;
  @Prop() alamat!: string;
  @Prop() rt!: string;
  @Prop() rw!: string;
  @Prop() tempat_lahir!: string;
  @Prop() tgl_lahir!: string;
  @Prop() jenis_kelamin!: string; // LK/PR
  @Prop() status_kawin!: string;
  @Prop() tgl_perkawinan_perceraian!: string;
  @Prop() pendidikan!: string;
  @Prop() agama!: string;
  @Prop() no_akte!: string;
  @Prop() umur!: string;
  @Prop() shdk!: string;
  @Prop() kewarganegaraan!: string;
  @Prop() ayah!: string;
  @Prop() ibu!: string;
  @Prop() jenis_pekerjaan!: string;
  @Prop() kesejahteraan!: string;
  @Prop() e_ktp!: boolean; // e-KTP status
  @Prop() tgl_update_kk!: string;
  @Prop() alamat_lengkap!: string;
}

export const WargaSchema = SchemaFactory.createForClass(Warga);
