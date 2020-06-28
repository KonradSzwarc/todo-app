import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiSecurity } from '@nestjs/swagger';
import { User as UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get('current')
  @ApiSecurity('cookie')
  queryCurrentUser(@User('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('cookie')
  @Patch('current')
  updateCurrentUser(@User('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('cookie')
  @Delete('current')
  deleteCurrentUser(@User('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }
}
