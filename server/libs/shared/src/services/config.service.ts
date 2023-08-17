import { config } from 'dotenv';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';

config({
  path: join(process.cwd(), '..', 'build', 'docker', '.env'),
});

export const configService = new ConfigService();
