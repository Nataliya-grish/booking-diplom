import { Body, Controller, Post, HttpCode, HttpStatus, Res, UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signIn.dto';
import { SignupDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { CookiesConfig } from '../config/interfaces/config.interface';
import { HttpValidationPipe } from '../validation/validation.pipe';
import { JwtAuthGuard } from './guard/auth.guard';
import { Response } from 'express';
import { Role, Roles } from '../decorators/roles.decorator';

@Controller('api')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/auth/login')
  async signin(
    @Body(new HttpValidationPipe()) data: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookieConfig = this.configService.get<CookiesConfig>('cookie');
    const authUser = await this.authService.signin(data);
    res.cookie('user_token', authUser.access_token, {
      expires: new Date(Date.now() + cookieConfig.expires),
    });

    return authUser.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/auth/logout')
  async signout(@Res({ passthrough: true }) res: Response) {
    res.cookie('user_token', '', { expires: new Date() });
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.CLIENT)
  @Post('/auth/client/register')
  async signup(
    @Body() data: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    data['passwordHash'] = data.password;
    const authUser = await this.authService.signup(data);
    const cookiesConfig = this.configService.get<CookiesConfig>('cookies');
    res.cookie('token', authUser.accessToken, {
      expires: new Date(Date.now() + cookiesConfig.expires),
    });
    return authUser;
  }
}