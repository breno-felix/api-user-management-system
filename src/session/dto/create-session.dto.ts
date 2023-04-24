import { IsMongoId, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsMongoId()
  userId: string;

  @IsString()
  token: string;
}
