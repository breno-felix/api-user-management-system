import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session, SessionDocument } from './schemas/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<SessionDocument> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findLastSessionByUserId(userId: string): Promise<SessionDocument> {
    return this.sessionModel.findOne({ userId }).sort({ created_at: -1 });
  }

  async findAll(): Promise<SessionDocument[]> {
    return this.sessionModel.find();
  }

  async findByToken(token: string): Promise<SessionDocument> {
    return this.sessionModel.findOne({ token });
  }

  async deleteSessionByUserId(userId: string): Promise<void> {
    await this.sessionModel.deleteOne({ userId });
  }

  async delete(sessionId: string): Promise<void> {
    await this.sessionModel.findByIdAndDelete(sessionId);
  }
}
