import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schemas/user.schema';

interface Token {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<Token> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return this.createAccessToken(user);
  }

  async createAccessToken(user: UserDocument): Promise<Token> {
    return {
      accessToken: await this.jwtService.signAsync({
        id: user._id,
        name: user.name,
        role: user.role,
      }),
    };
  }

  async checkToken(token: string) {
    try {
      const data = await this.jwtService.verifyAsync(token);
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async isValidToken(token: string): Promise<boolean> {
    try {
      await this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
