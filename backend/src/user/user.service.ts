import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findByName(name: string): Promise<User | null> {
    return this.userModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { name, password } = createUserDto;
    const existingUser = await this.findByName(name);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = new this.userModel({
      name,
      password: hashedPassword,
    });
    return createdUser.save();
  }
}
