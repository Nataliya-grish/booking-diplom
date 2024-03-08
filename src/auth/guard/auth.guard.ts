import { ExecutionContext, Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  public handleRequest(err, user) {

    if (err) {
      throw new HttpException(err.message, 500);
    }

    if (!user) {
      throw new UnauthorizedException(
        'Доступно только для авторизованных пользователей',
      );
    }
    return user;
  }
}