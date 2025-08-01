import { IsString, IsOptional,IsNotEmpty} from 'class-validator';

export class CreatePejabatDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  nip!: string;

  @IsNotEmpty()
  @IsString()
  position!: string;

  @IsOptional()
  @IsString()
  rank? : string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  notes?: string;
} 