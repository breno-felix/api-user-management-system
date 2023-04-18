import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './enum/Roles';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
@Roles(Role.SUPER_ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<UserDocument> {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<UserDocument> {
    return this.userService.delete(userId);
  }
}
