import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SuratService } from './surat.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('surat')
export class SuratController {
  constructor(private readonly suratService: SuratService) {}

  @Post('generate')
  async generate(
    @Body() body: { jenisSurat: string; data: Record<string, string> },
    @Res() res: Response
  ) {
    try {
      const filePath = this.suratService.generateSurat(body.jenisSurat, body.data);
      const filename = path.basename(filePath);
      return res.download(filePath, filename);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Gagal membuat surat',
        error: err,
      });
    }
  }
}
