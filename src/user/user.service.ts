import { Injectable } from '@nestjs/common';
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
    return this.userModel.findById(userId);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto);
  }

  async delete(userId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(userId);
  }
}
