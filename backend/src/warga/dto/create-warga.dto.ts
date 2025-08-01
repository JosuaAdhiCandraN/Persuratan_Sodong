import { IsString, IsOptional,IsNotEmpty,IsDateString,IsDate, IsBoolean} from 'class-validator';

export class CreateWargaDto {
  @IsNotEmpty()
  @IsString()
  no_kk!: string;

  @IsNotEmpty()
  @IsString()
  nik!: string;

  @IsNotEmpty()
  @IsString()
  nama_lengkap!: string;

  @IsOptional()
  @IsString()
  alamat?: string;

  @IsOptional()
  @IsString()
  rt?: string; 
  
  @IsOptional()
  @IsString() 
  rw?: string;

  @IsOptional()
  @IsString()
  tempat_lahir?: string;

  @IsOptional()
  @IsString()
  tgl_lahir?: string;

  @IsOptional()
  @IsString()
  jenis_kelamin?: string; // LK/PR

  @IsOptional()
  @IsString()
  status_kawin?: string;

  @IsOptional()
  @IsString()
  tgl_perkawinan_perceraian?: string;

  @IsOptional()
  @IsString()
  pendidikan?: string;

  @IsOptional()
  @IsString()
  agama?: string;

  @IsOptional()
  @IsString()
  no_akte?: string;

  @IsOptional()
  @IsString()
  umur?: string;

  @IsOptional()
  @IsString()
  shdk?: string;

  @IsOptional()
  @IsString()
  kewarganegaraan?: string;
  
  @IsOptional()
  @IsString()
  ayah?: string;

  @IsOptional()
  @IsString()
  ibu?: string; 

  @IsOptional()
  @IsString()
  jenis_pekerjaan?: string;

  @IsOptional()
  @IsString()
  kesejahteraan?: string;

  @IsOptional()
  @IsBoolean()
  e_ktp?: boolean; // e-KTP status

  @IsOptional()
  @IsString()
  tgl_update_kk?: string; // e-KTP status

  @IsOptional()
  @IsString()
  alamat_lengkap?: string;
}
