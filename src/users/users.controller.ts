import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../users/schema/users.schema';
import { Role, Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { HttpValidationPipe } from '../validation/validation.pipe';
import { CreateUserDto } from './dto/user.dto';

@Controller('/api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/admin/users/')
  @Roles(Role.ADMIN, Role.MANAGER)
  async createUser(
    @Body(new HttpValidationPipe()) body: CreateUserDto,
  ): Promise<Partial<User>> {
    return await this.userService.create(body);
  }

  @Get('/admin/users/')
  @Roles(Role.ADMIN, Role.MANAGER)
  async getAdmin(@Param() params: any): Promise<Array<Partial<User>>> {
    return await this.userService.findAll(params);
  }

  @Get('/manager/users/')
  @Roles(Role.MANAGER)
  async getManager(@Param() params: any): Promise<Array<Partial<User>>> {
    return await this.userService.findAll(params);
  }
}