import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { IUserService , ID } from './interface/users.interface';
import { SearchUserParams } from './interface/search-user.interface';



@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  
  async create(data: Partial<User>): Promise<User> {
    try {
      const createdUser = new this.userModel(data);
      if (createdUser) {
        return createdUser.save();
      }
    } catch (error: any) {
      throw new BadRequestException('Неудача. Попробуйте пройти регистрацию снова.');
    }
  }

  async findById(id: ID): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (user) {
        return user;
      }
    } catch (error: any) {
      throw new HttpException('Пользователь не найден', 404);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel
        .findOne({ email: email })
        .select('-__v');
      if (user) {
        return user;
      }
    } catch (error: any) {
      throw new HttpException('Пользователь не найден', 404);
    }
  }
	
  async findAll(params: Partial<SearchUserParams>): Promise<User[]> {
    const { limit, offset, email, name, contactPhone } = params;
    const query = {
      email: { $regex: new RegExp(email, 'i') },
      name: { $regex: new RegExp(name, 'i') },
      contactPhone: { $regex: new RegExp(contactPhone, 'i') },
    };
    return this.userModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0)
      .select('email name contactPhone role');
  }
}


  