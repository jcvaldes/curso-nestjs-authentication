import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bycrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user: User = (await this.usersService.findByEmail(email)) as User;
    const isMatch = await bycrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }
  generateJwtToken(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
