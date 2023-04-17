import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async delete(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
