import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ name });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
