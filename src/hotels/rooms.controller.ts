import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IHotelRoomService } from './rooms.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { ID } from './interface/hotel.interface';
import { HttpValidationPipe } from '../validation/validation.pipe';
import { SearchRoomsParams } from './dto/roomDTO/search-room.dto';
import { Role, Roles } from '../decorators/roles.decorator';
import { HotelRoom } from './schema/room.schema';
import { MulterFilesInterceptor } from '../interceptor/imag.interceptor';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api')
export class RoomsController {
  constructor(private hotelRoomService: IHotelRoomService) {}

  @Roles(Role.ADMIN, Role.MANAGER, Role.CLIENT)
  @Get('/common/hotel-rooms')
  async getHotelRooms(@Query() query: SearchRoomsParams) {
    const queryParams = { ...query };
    return await this.hotelRoomService.search(queryParams);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CLIENT)
  @Get('/common/hotel-rooms/:id')
  async getHotelRoom(@Param('id') id: ID): Promise<HotelRoom> {
    return await this.hotelRoomService.findById(id);
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(MulterFilesInterceptor())
  @Post('/admin/hotel-rooms/')
  async createHotelRoom(
    @Body(new HttpValidationPipe()) body: Partial<HotelRoom>,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<HotelRoom> {
    const hotelRoom = {
      ...body,
      limit: limit ? limit : 10,
      offset: offset ? offset : 0,
      images: images.map((image) => image.path),
    };
    try {
      if (images.length > 0)
        return await this.hotelRoomService.create(hotelRoom);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(MulterFilesInterceptor())
  @Put('/admin/hotel-rooms/:id')
  async updateHotelRoom(
    @Param('id') id: ID,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body(new HttpValidationPipe()) body: Partial<HotelRoom>,
  ): Promise<HotelRoom> {
    const updateRoom = { ...body };
    updateRoom.images = Array.isArray(body.images)
      ? [...body.images, ...images.map((image) => image.path)]
      : [body.images, ...images.map((image) => image.path)];
    try {
      return this.hotelRoomService.update(id, updateRoom);
    } catch {
      throw new UnauthorizedException();
    }
  }
}