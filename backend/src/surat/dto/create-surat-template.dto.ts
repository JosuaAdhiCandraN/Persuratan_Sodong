import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateSuratTemplateDto {
  @IsString()
  jenis_surat?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  fields?: string[];
}
