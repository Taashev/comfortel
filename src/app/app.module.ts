import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appModuleConfig } from '../config/app.config';

@Module({
  imports: [ConfigModule.forRoot(appModuleConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
