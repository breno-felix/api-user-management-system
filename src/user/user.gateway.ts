import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { io } from '../socket';

@WebSocketGateway()
export class UsersGateway {
  @SubscribeMessage('getUsers')
  async getUsers(users) {
    io.emit('users', users);
  }
}
