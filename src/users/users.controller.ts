import {  Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './schema/users.schema';
import { CreateUserDto } from './dto/user.dto';
import { Roles } from '../decorators/roles.decorator';

@Controller('users')
export class UsersController {}
