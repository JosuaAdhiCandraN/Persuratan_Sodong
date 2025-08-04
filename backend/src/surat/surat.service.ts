// surat.service.ts
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SuratService {
  generateSuratBuffer(jenisSurat: string, data: Record<string, string>): Buffer {
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
    return buffer;
  }
}
