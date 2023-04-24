import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateRoleUserDTO } from './dto/update-role-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersGateway } from './user.gateway';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly usersGateway: UsersGateway,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    const users = await this.findAll();
    await this.usersGateway.getUsers(users);
    return user;
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
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto);
    const users = await this.findAll();
    await this.usersGateway.getUsers(users);
    return user;
  }

  async updateRole(
    userId: string,
    updateRoleUserDto: UpdateRoleUserDTO,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, updateRoleUserDto);
    const users = await this.findAll();
    await this.usersGateway.getUsers(users);
  }

  async delete(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(userId);
    const users = await this.findAll();
    await this.usersGateway.getUsers(users);
    return user;
  }
}
