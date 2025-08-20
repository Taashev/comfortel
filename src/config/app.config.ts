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
});

export type AppConfigSchema = z.infer<typeof appConfigSchema>;

export const appModuleConfig: ConfigModuleOptions<AppConfigSchema> = {
  validate: (config) => {
    const env = validationZodSchemaOrFail<AppConfigSchema>(
      config,
      appConfigSchema,
    );

    env.IS_DEV = env.NODE_ENV !== 'production';

    return env;
  },
};
