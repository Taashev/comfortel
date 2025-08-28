import { z } from 'zod';

export const validationZodSchemaOrFail = <T>(
  config: Record<string, any>,
  schema: z.ZodObject<any>,
) => {
  try {
    return schema.parse(config) as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.issues.map((err) => {
        return `${err.path.join('.')}: ${err.message}`;
      });

      throw new Error(validationErrors.join(', '));
    } else {
      throw error;
    }
  }
};
