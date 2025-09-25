import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('yandex_CLIENT_ID')!,
      clientSecret: configService.get('yandex_CLIENT_SECRET')!,
      callbackURL: configService.get('SERVER_DOMAIN') + '/auth/yandex/callback',
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const { username, emails, photos } = profile;

    const user = {
      email: emails?.[0].value,
      name: username,
      picture: photos?.[0].value,
    };

    done(null, user);
  }
}
