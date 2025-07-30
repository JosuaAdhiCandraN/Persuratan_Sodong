import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { WargaService } from './warga.service';
import { SuratTemplateService } from '../surat/surat-template.service';

@Controller() // ❗ Tanpa prefix => route bebas /warga, /surat/...
export class WargaController {
  constructor(
    private readonly wargaService: WargaService,
    private readonly suratTemplateService: SuratTemplateService,
  ) {}

  // ✅ GET /warga?limit=10
  @Get('warga')
  async getAllWarga() {
    return this.wargaService.findAll();
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
