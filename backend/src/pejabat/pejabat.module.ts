import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pejabat, PejabatSchema } from './pejabat.schema';
import { PejabatService } from './pejabat.service';
import { PejabatController } from './pejabat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pejabat.name, schema: PejabatSchema }])
  ],
  controllers: [PejabatController],
  providers: [PejabatService],
})
export class PejabatModule {}

