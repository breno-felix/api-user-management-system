import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { SessionService } from 'src/session/session.service';
import { SessionDecorator } from 'src/decorators/session.decorator';
import { SessionDocument } from 'src/session/schemas/session.schema';

interface Token {
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO): Promise<Token> {
    return this.authService.login(loginUserDTO.email, loginUserDTO.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@SessionDecorator() session: SessionDocument) {
    const sessionId = session._id.toString();
    await this.sessionService.delete(sessionId);
  }
}
