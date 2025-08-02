import { Controller, Get, Param, Query, NotFoundException,Post,Put,Body,HttpException,HttpStatus,Delete} from '@nestjs/common';
import { PejabatService } from './pejabat.service';
import { Pejabat } from './pejabat.schema';
import { CreatePejabatDto } from './dto/create.pejabat';

@Controller('desa') 

export class PejabatController {

  constructor(
    private readonly pejabatService: PejabatService,

  ) {}

  // ✅ GET
  @Get('call/pejabat')
  async getAllPejabat() {
    return this.pejabatService.findAll();
  }

  @Get('call/pejabat/:nip')
  async getPejabatByNip(@Param('nip') nip: string) {
    const pejabat = await this.pejabatService.findByNip(nip);
    if (!pejabat) {
      throw new NotFoundException('Pejabat tidak ditemukan');
    }
    return pejabat;
  }

  @Post('create/pejabat')
  async createWarga(@Body() createPejabatDto: CreatePejabatDto) {
  return await this.pejabatService.create(createPejabatDto);
}

  @Put('update/pejabat/:id')
async updatePejabat(@Param('id') id: string, @Body() data: Partial<Pejabat>) {
  const updated = await this.pejabatService.updateById(id, data);
  if (!updated) {
    throw new NotFoundException('Pejabat tidak ditemukan untuk diperbarui');
  }
  return updated;
}

@Delete('delete/pejabat/:id')
async deletePejabat(@Param('id') id: string) {
  const deleted = await this.pejabatService.deleteById(id);
  if (!deleted) {
    throw new NotFoundException('Pejabat tidak ditemukan untuk dihapus');
  }
  return { message: 'Pejabat berhasil dihapus' };
}
}