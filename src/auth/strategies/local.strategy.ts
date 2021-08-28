import { PassportStrategy } from '@nestjs/passport';
import { Logger, Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
/*
Passport verifica la firma del jwt y
decodifica el json luego acciona el metodo validate para validar el json decodificado
de nuestro token
*/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    // cambio los nombres username y password por sus alias al momento de mandar peticion
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  public async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      this.logger.error(`Usuario no valido ${email}`);
      throw new UnauthorizedException('not allow');
    }
    return user;
  }
}
