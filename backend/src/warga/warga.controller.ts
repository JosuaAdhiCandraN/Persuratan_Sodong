import { Controller, Get, Param, Query, NotFoundException,Post,Put,Body,HttpException,HttpStatus} from '@nestjs/common';
import { WargaService } from './warga.service';
import { SuratTemplateService } from '../surat/surat-template.service';
import { Warga } from '../warga/warga.schema';
import { CreateWargaDto } from './dto/create-warga.dto';

@Controller() // ❗ Tanpa prefix => route bebas /warga, /surat/...
export class WargaController {
  constructor(
    private readonly wargaService: WargaService,
    private readonly suratTemplateService: SuratTemplateService,
  ) {}

  // ✅ GET
  @Get('warga')
  async getAllWarga() {
    return this.wargaService.findAll();
  }

  @Post('create/warga')
  async createWarga(@Body() createWargaDto: CreateWargaDto) {
  return await this.wargaService.create(createWargaDto);
}

  @Put('update/warga/:nik')
  async updateWarga(@Param('nik') nik: string, @Body() data: Partial<Warga>) {
    const updated = await this.wargaService.updateByNik(nik, data);
    if (!updated) {
      throw new NotFoundException('Warga tidak ditemukan untuk diperbarui');
    }
    return updated;
  }

  // ✅ GET /surat/:jenisSurat/:nik
  @Get('surat/:jenisSurat/:nik')
  async generateSuratByNik(
    @Param('jenisSurat') jenisSurat: string,
    @Param('nik') nik: string,
  ) {
    const warga = await this.wargaService.findByNik(nik);
    if (!warga) {
      throw new NotFoundException('Warga tidak ditemukan');
    }

    const fields = await this.suratTemplateService.getFieldsForJenisSurat(jenisSurat);
    if (!fields) {
      throw new NotFoundException('Jenis surat tidak dikenali');
    }

    const dataSurat = fields.reduce((result, field) => {
      if (warga[field] !== undefined) {
        result[field] = warga[field];
      }
      return result;
    }, {} as Record<string, any>);

    return {
      success: true,
      jenis_surat: jenisSurat,
      data: dataSurat,
    };
  }
}
