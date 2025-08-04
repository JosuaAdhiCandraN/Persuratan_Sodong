// surat.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { SuratService } from './surat.service';
import { Response } from 'express';

@Controller('surat')
export class SuratController {
  constructor(private readonly suratService: SuratService) {}

  @Post('generate')
  async generate(
    @Body() body: { jenisSurat: string; data: Record<string, any> },
    @Res() res: Response
  ) {
    try {
      const buffer = this.suratService.generateSuratBuffer(body.jenisSurat, body.data);
      const fileName = `${body.jenisSurat}-${Date.now()}.docx`;

      res.set({
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Length': buffer.length,
      });

      return res.send(buffer);
   } catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Gagal membuat surat',
    error: errorMessage,
  });
}
  }
}
