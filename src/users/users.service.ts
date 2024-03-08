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
	
	async findAll(params: SearchUserParams)Promise<User[]> {
    try {
      let query = {};
      if (params.email) {
        query = { email: params.email };
      } else if (params.name && params.contactPhone) {
        query = {
          $and: [
            { name: { $regex: new RegExp(params.name, 'g') } },
            { phone: { $regex: new RegExp(params.contactPhone, 'g') } },
          ],
        };
      } else if (params.name) {
        query = { name: { $regex: new RegExp(params.name, 'g') } };
      } else if (params.contactPhone) {
        query = { phone: { $regex: new RegExp(params.contactPhone, 'g') } };
      }
      const count = await this.userModel.count(query).exec();
      const result = await this.userModel
        .find(query)
        .skip(params.offset)
        .limit(params.limit)
        .select(['-__v', '-password'])
        .exec();

        return {count, result}
    } catch (err) {
		 throw new BadRequestException(err);
     
	};
    }
}


  