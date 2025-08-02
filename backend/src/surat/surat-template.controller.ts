import { Body, Controller, Post,Delete } from '@nestjs/common';
import { SuratTemplateService } from './surat-template.service';
import { CreateSuratTemplateDto } from './dto/create-surat-template.dto';

@Controller('template-surat')
export class SuratTemplateController {
  constructor(private readonly suratTemplateService: SuratTemplateService) {}

  @Post('create')
  async createTemplate(@Body() dto: CreateSuratTemplateDto) {
    return this.suratTemplateService.createTemplate(dto);
  }
  @Delete('delete/:jenis_surat')
  async deleteTemplate(@Body('jenis_surat') jenis_surat: string) {
    return this.suratTemplateService.deleteTemplate(jenis_surat);
  }
}
