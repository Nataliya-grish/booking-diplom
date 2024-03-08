import { IsDefined, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}