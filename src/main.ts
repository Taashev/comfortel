import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app/app.module';
import { AppConfigSchema, ResultConfigSchema } from './config';
import { GlobalExceptionFilter } from './exceptions-filter/global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Валидируем входящие данные в контроллерах
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // включаем валидацию ответов с контроллеров
  // по умолчанию все поля исключены, требует явных @Exlude на всех полях
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );

  const config = app.get<ConfigService<ResultConfigSchema>>(ConfigService);
  const appConfig = config.get<AppConfigSchema>('appConfig')!;

  const PORT = appConfig['PORT'];
  const HOST = appConfig['HOST'];
  const IS_DEV = appConfig['IS_DEV'];

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(PORT, HOST, () => {
    if (IS_DEV) {
      console.log('Сервер запущен:');
      console.table({ PORT, HOST, PID: process.pid });
    }
  });
}
bootstrap();
