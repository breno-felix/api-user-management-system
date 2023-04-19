import { IsEnum } from 'class-validator';
import { Role } from '../enum/Roles';

export class UpdateRoleUserDTO {
  @IsEnum(Role)
  role: Role;
}
