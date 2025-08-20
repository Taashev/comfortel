import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { appModuleConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot(appModuleConfig),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   migrations: ['../database/migrations/*.migration.ts'],
    //   entities: ['../**/*.entity.ts'],
    //   synchronize: false,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
