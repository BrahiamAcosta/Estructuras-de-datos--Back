import { Controller,  Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all/:username')
  getUserQrs(@Param('username') username: string) {
    return this.usersService.getUserQrs(username);
  }

  @Get('favorites/:username')
  getUserFavoriteQrs(@Param('username') username: string) {
    return this.usersService.getUserFavoriteQrs(username);
  }
}
