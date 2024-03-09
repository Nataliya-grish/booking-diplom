import {
  IsNotEmpty,
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateHotelParams {
  @IsNotEmpty({
    message: 'Поле обязательно для заполнения.',
  })
  @MinLength(5, { message: 'Название отеля должно иметь не менее 5 символов.' })
  @MaxLength(50, {
    message: 'Название отеля должно иметь не более 50 символов.',
  })
  @IsString()
  title: string;

  @IsDefined()
  @MaxLength(5000, {
    message: 'Описание отеля должно иметь не более 5000 символов.',
  })
  @IsString()
  description: string;
 }