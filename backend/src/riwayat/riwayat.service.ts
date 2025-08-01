import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Riwayat } from './riwayat.schema';
import { CreateRiwayatDto } from './dto/create-riwayat.dto';

@Injectable()
export class RiwayatService {
  constructor(
    @InjectModel(Riwayat.name) private riwayatModel: Model<Riwayat>,
  ) {}

  async create(data: CreateRiwayatDto): Promise<Riwayat> {
    const riwayat = new this.riwayatModel(data);
    return riwayat.save();
  }

  async findAll(): Promise<Riwayat[]> {
    return this.riwayatModel.find().sort({ createdAt: -1 }).exec();
  }
}