import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto copy';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
