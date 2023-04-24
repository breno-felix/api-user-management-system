import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schemas/session.schema';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SessionsGateway } from './session.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  providers: [SessionService, SessionsGateway],
  exports: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
