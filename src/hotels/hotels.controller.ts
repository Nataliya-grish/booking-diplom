import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Hotel } from './schema/hotel.schema';
import { HotelsService } from './hotels.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { ID } from './interface/hotel.interface';
import { HttpValidationPipe } from '../validation/validation.pipe';
import { UpdateHotelParams } from './dto/hotelDTO/update-hotel.dto';
import { SearchHotelParams } from './dto/hotelDTO/search-hotel.dto';
import { Role, Roles } from '../decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api')
@Roles(Role.ADMIN)
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Post('/admin/hotels/')
  async createHotel(@Body(new HttpValidationPipe()) data: Partial<Hotel>) {
    const hotel = await this.hotelsService.create(data);
    return {
      id: hotel.id,
      title: hotel.title,
      description: hotel.description,
    };
  }

  @Get('/admin/hotels/')
  find(@Query() data: SearchHotelParams) {
    const { limit, offset, title } = data;
    return this.hotelsService.search({
      limit: limit ? Number(limit) : 10,
      offset: offset ? Number(offset) : 0,
      title: title,
    });
  }

  @Put('/admin/hotels/:id')
  async updateHotel(
    @Param('id') id: ID,
    @Body(new HttpValidationPipe()) data: UpdateHotelParams,
  ): Promise<Hotel> {
    return await this.hotelsService.update(id, data);
  }
}
