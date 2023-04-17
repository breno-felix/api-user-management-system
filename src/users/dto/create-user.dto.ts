import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { Role } from '../enum/Roles';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsEnum(Role)
  role: Role;
}
