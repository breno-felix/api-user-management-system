import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { io } from '../socket';

@WebSocketGateway()
export class SessionsGateway {
  @SubscribeMessage('getSessions')
  async getSessions(sessions) {
    io.emit('sessions', sessions);
  }
}
