import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { SessionService } from 'src/session/session.service';

interface Token {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  async login(email: string, password: string): Promise<Token> {
    const user = await this.checkEmail(email);
    if (await this.checkPassword(password, user.password)) {
      const currentSession = await this.sessionService.findLastSessionByUserId(
        user._id.toString(),
      );
      if (currentSession && this.isValidToken(currentSession.token)) {
        return { accessToken: currentSession.token };
      }
      const newToken = await this.createAccessToken(user);
      await this.sessionService.create({
        userId: user._id.toString(),
        token: newToken.accessToken,
      });
      return newToken;
    }
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

  private async checkEmail(email: string): Promise<UserDocument> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async checkPassword(
    passwordSent: string,
    passwordStored: string,
  ): Promise<boolean> {
    if (!(await bcrypt.compare(passwordSent, passwordStored))) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
