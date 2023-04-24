import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/user/enum/Roles';
import { SessionDocument } from './schemas/session.schema';
import { SessionService } from './session.service';

@Roles(Role.SUPER_ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async findAll(): Promise<SessionDocument[]> {
    return this.sessionService.findAll();
  }
}
