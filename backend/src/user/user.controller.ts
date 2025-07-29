import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @Get(':name')
  async findByName(@Param('name') name: string) {
    const user = await this.userService.findByName(name);
    return user || { message: 'User not found' };
  }
}
