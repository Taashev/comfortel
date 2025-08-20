import z from 'zod';
import { ConfigModuleOptions } from '@nestjs/config';
import { validationZodSchemaOrFail } from '../utils/validation-zod';

export const envFilePath = [
  '.env.development',
  '.env.testing',
  '.env.production',
  '.env',
  '.env.example',
];

const appConfigSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('localhost'),
  NODE_ENV: z.enum(['development', 'production', 'testing']),

  IS_DEV: z.boolean().optional(),
  IS_PROD: z.boolean().optional(),
  IS_TEST: z.boolean().optional(),
});

const dbConfigSchema = z.object({
  POSTGRES_PORT: z.coerce.number().default(3000),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_POSSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
});

const envSchema = appConfigSchema.extend(dbConfigSchema.shape);

export type EnvSchema = z.infer<typeof envSchema>;
export type AppConfigSchema = z.infer<typeof appConfigSchema>;
export type DBConfigSchema = z.infer<typeof dbConfigSchema>;
export type ResultConfigSchema = {
  appConfig: AppConfigSchema;
  dbConfig: DBConfigSchema;
};

export const appModuleConfig: ConfigModuleOptions<ResultConfigSchema> = {
  validate: (config) => {
    const env = validationZodSchemaOrFail<EnvSchema>(config, envSchema);

    const appConfig = {
      PORT: env.PORT,
      HOST: env.HOST,
      NODE_ENV: env.NODE_ENV,
      IS_PROD: env.NODE_ENV === 'production',
      IS_DEV: env.NODE_ENV === 'development',
      IS_TEST: env.NODE_ENV === 'testing',
    };

    const dbConfig = {
      POSTGRES_PORT: env.POSTGRES_PORT,
      POSTGRES_HOST: env.POSTGRES_HOST,
      POSTGRES_USERNAME: env.POSTGRES_USERNAME,
      POSTGRES_POSSWORD: env.POSTGRES_POSSWORD,
      POSTGRES_DATABASE: env.POSTGRES_DATABASE,
    };

    return { appConfig, dbConfig };
  },
};
