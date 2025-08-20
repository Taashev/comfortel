import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfigSchema } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get<ConfigService<AppConfigSchema>>(ConfigService);

  const PORT = appConfig.get<AppConfigSchema['PORT']>('PORT')!;
  const HOST = appConfig.get<AppConfigSchema['HOST']>('HOST')!;
  const IS_DEV = appConfig.get<AppConfigSchema['IS_DEV']>('IS_DEV')!;

  await app.listen(PORT, HOST, () => {
    if (IS_DEV) {
      console.log('Сервер запущен:');
      console.table({ PORT, HOST, PID: process.pid });
    }
  });
}
bootstrap();
