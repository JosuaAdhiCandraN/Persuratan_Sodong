import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WargaModule } from './warga/warga.module';
import { SuratTemplateModule } from './surat/surat-template.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SuratModule } from './surat/surat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    WargaModule,
    SuratTemplateModule,
    AuthModule, 
    UserModule,
    SuratModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // 🔍 Debug log
    console.log('MONGO_URI:', process.env.MONGO_URI);
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI belum didefinisikan di file .env!');
    }
  }
}
