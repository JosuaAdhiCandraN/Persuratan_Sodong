import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SuratService {
  generateSurat(jenisSurat: string, data: Record<string, string>): string {
    const templatePath = path.join(process.cwd(), 'template', `${jenisSurat}.docx`);
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.setData(data);
    try {
      doc.render();
    } catch (error) {
      throw new Error('Gagal memproses template surat: ' + error);
    }
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    const outputDir = path.join(process.cwd(), 'generated');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const outputPath = path.join(outputDir, `${jenisSurat}-${Date.now()}.docx`);
    fs.writeFileSync(outputPath, buffer);
    return outputPath;
  }
}
