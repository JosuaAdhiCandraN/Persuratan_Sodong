import { Body, Controller, Get, Post } from '@nestjs/common';
import { RiwayatService } from './riwayat.service';
import { CreateRiwayatDto } from './dto/create-riwayat.dto';
import { Riwayat } from './riwayat.schema';

@Controller('riwayat')
export class RiwayatController {
  constructor(private readonly riwayatService: RiwayatService) {}

  @Post()
  create(@Body() createDto: CreateRiwayatDto): Promise<Riwayat> {
    return this.riwayatService.create(createDto);
  }

  @Get()
  findAll(): Promise<Riwayat[]> {
    return this.riwayatService.findAll();
  }
}
