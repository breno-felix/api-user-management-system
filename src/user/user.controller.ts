import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './enum/Roles';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SessionService } from 'src/session/session.service';
import { UpdateRoleUserDTO } from './dto/update-role-user.dto';
@Roles(Role.SUPER_ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDocument> {
    return this.userService.create(createUserDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<UserDocument> {
    return this.userService.findOne(userId);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<UserDocument> {
    return this.userService.findByEmail(email);
  }

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Patch(':userId')
  async updateRole(
    @Param('userId') userId: string,
    @Body() updateRoleUserDto: UpdateRoleUserDTO,
  ): Promise<void> {
    await this.userService.updateRole(userId, updateRoleUserDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<void> {
    await this.userService.delete(userId);
    await this.sessionService.deleteSessionByUserId(userId);
  }
}
