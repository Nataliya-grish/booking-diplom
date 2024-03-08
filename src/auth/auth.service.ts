import { UsersService } from '../users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signIn.dto';
import { SignupDto } from './dto/signup.dto';
import { SigninResponseDto } from './dto/signin-response.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../decorators/roles.decorator';
import { compareHash, getHash } from './password/password';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.passwordHash === password) {
      const { passwordHash, ...result } = user;
      const isEquals = await compareHash(passwordHash, password);

      if (isEquals) return result;
    }
    return null;
  }

  async signup(data: SignupDto): Promise<any> {
    const { password, email, ...rest } = data;
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException(
        'Пользователь с таким e-mail уже существует',
      );
    }

    const passwordHash = bcrypt.hashSync(password, 10).toString();
    const newUser = await this.userService.create({
      passwordHash,
      email,
      ...rest,
    });
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  }

  async createToken(payload: any) {
    return await this.jwtService.signAsync(payload);
  }

  async signin(data: SigninDto): Promise<SigninResponseDto> {
    const user = await this.userService.findByEmail(data.email);
    const isValidPassword = compareHash(
      data.password,
      await getHash(data.password),
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: Role.ADMIN || Role.CLIENT || Role.MANAGER,
    };

    return {
      user: {
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}