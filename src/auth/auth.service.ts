import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException();
    }
    return this.createAccessToken(user._id.toString());
  }

  async createAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(userId);
  }
}
