import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { appModuleConfig, DBConfigSchema } from '../../config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(appModuleConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbConfig = config.get('dbConfig') as DBConfigSchema;

        return {
          type: 'postgres',
          host: dbConfig.POSTGRES_HOST,
          port: dbConfig.POSTGRES_PORT,
          database: dbConfig.POSTGRES_DB,
          username: dbConfig.POSTGRES_USER,
          password: dbConfig.POSTGRES_PASSWORD,
          synchronize: false,
          entities: [join(__dirname, '../**/*.entity.{ts,js}')],
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
