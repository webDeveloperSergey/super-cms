import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from './../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';

export const getJwtConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET'),
});
