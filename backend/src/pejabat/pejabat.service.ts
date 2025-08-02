import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pejabat, PejabatDocument } from './pejabat.schema';

@Injectable()
export class PejabatService {
  constructor(
    @InjectModel(Pejabat.name) private readonly pejabatModel: Model<PejabatDocument>,
  ) {}

   async findByNip(nip: string): Promise<Pejabat | null> {
        return this.pejabatModel.findOne({ nip }).exec();
    }


  async findAll(): Promise<Pejabat[]> {
    return this.pejabatModel.find().exec();
  }

  async create(data: Partial<Pejabat>): Promise<Pejabat> {
  const newPejabat = new this.pejabatModel(data);
  return newPejabat.save();
  }

  async updateById(id: string, data: Partial<Pejabat>): Promise<Pejabat | null> {
  return this.pejabatModel.findByIdAndUpdate(id, data, { new: true }).exec();
}

async deleteById(id: string): Promise<Pejabat | null> {
  return this.pejabatModel.findByIdAndDelete(id).exec();
}

}

