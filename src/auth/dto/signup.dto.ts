import { IsString, IsDefined } from 'class-validator';
import { SigninDto } from './signin.dto';

export class SignupDto extends SigninDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  contactPhone: string;
}