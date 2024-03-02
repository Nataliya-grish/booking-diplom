import { IsEmail, IsNotEmpty, IsOptional, IsString,  @IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Напишите свой e-mail' })
  @IsEmail(undefined, {
    message: 'Не корректный e-mail',
  })
  email: string;

  @IsNotEmpty({ message: 'Напишите свой пароль' })
  @IsString()
  passwordHash: string;

  @IsNotEmpty({ message: 'Напишите свое имя' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsDefined()
  @IsString()
  role: string;
}