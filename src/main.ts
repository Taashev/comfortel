import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { AppConfigSchema, ResultConfigSchema } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService<ResultConfigSchema>>(ConfigService);
  const appConfig = config.get<AppConfigSchema>('appConfig')!;

  const PORT = appConfig['PORT'];
  const HOST = appConfig['HOST'];
  const IS_DEV = appConfig['IS_DEV'];

  await app.listen(PORT, HOST, () => {
    if (IS_DEV) {
      console.log('Сервер запущен:');
      console.table({ PORT, HOST, PID: process.pid });
    }
  });
}
bootstrap();
