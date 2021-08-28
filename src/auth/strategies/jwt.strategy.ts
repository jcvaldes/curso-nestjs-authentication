import { PassportStrategy } from '@nestjs/passport';
import {
  Logger,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigType } from '@nestjs/config';
import config from '../../config';
import { PayloadToken } from '../models/token.model';
/*
Passport verifica la firma del jwt y
decodifica el json luego acciona el metodo validate para validar el json decodificado
de nuestro token
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger(JwtStrategy.name);

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    // cambio los nombres username y password por sus alias al momento de mandar peticion
    super({
      //desde donde tomamos el token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoramos la expiracion del token
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  public async validate(payload: PayloadToken) {
    return payload;
  }
}
