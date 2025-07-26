import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warga, WargaDocument } from './warga.schema';

@Injectable()
export class WargaService {
  constructor(
    @InjectModel(Warga.name) private readonly wargaModel: Model<WargaDocument>,
  ) {}

  async findByNik(nik: string): Promise<Warga | null> {
    return this.wargaModel.findOne({ nik }).exec();
  }

  async findAll(): Promise<Warga[]> {
    return this.wargaModel.find().exec();
  }

//   async create(data: Partial<Warga>): Promise<Warga> {
//     const newWarga = new this.wargaModel(data);
//     return newWarga.save();
//   }

//   async updateByNik(nik: string, data: Partial<Warga>): Promise<Warga | null> {
//     return this.wargaModel.findOneAndUpdate({ nik }, data, { new: true }).exec();
//   }

//   async deleteByNik(nik: string): Promise<Warga | null> {
//     return this.wargaModel.findOneAndDelete({ nik }).exec();
//   }
}
