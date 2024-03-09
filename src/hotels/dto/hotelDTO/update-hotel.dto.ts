import { IsDefined, IsString } from 'class-validator';

export class UpdateHotelParams {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  description: string;
}

