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
import { UserDecorator } from 'src/decorators/user.decorator';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { SessionService } from 'src/session/session.service';

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
  async logout(@UserDecorator() user: UserDocument) {
    const userId = user._id.toString();
    await this.sessionService.deleteSessionByUserId(userId);
  }
}
