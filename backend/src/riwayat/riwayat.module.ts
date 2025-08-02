import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Riwayat, RiwayatSchema } from './riwayat.schema';
import { RiwayatService } from './riwayat.service';
import { RiwayatController } from './riwayat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Riwayat.name, schema: RiwayatSchema }])
  ],
  controllers: [RiwayatController],
  providers: [RiwayatService],
})
export class RiwayatModule {}
