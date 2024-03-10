import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpValidationPipe } from '../validation/validation.pipe';
import { ReservationService } from './reservation.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { HotelsService } from '../hotels/hotels.service';
import { ID } from '../hotels/interface/room.interface';
import { Role, Roles } from '../decorators/roles.decorator';
import { ReservationDto } from './dto/reservation.dto';
import { IHotelRoomService } from '../hotels/rooms.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api')
export class ReservationController {
  constructor(
    private reservationService: ReservationService,
    public hotelsService: HotelsService,
    private hotelRoomsService: IHotelRoomService,
  ) {}

  @Roles(Role.CLIENT)
  @Post('/client/reservations')
  async addReservation(
    @Body(new HttpValidationPipe()) data: ReservationDto,
    @Req() req: any,
  ) {
    const room = this.hotelRoomsService.findById(data.roomId);
    if (!room || !(await room).isEnabled) {
      throw new BadRequestException();
    }
    return await this.reservationService.addReservation({
      userId: req.ID,
      hotelId: data.hotelId,
      roomId: data.roomId,
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
    });
  }

  @Roles(Role.MANAGER)
  @Get('/manager/reservations/:userId')
  async getManagerReservation(
	@Param('userId') userId: ID,
    @Query('dateStart') dateStart: Date,
    @Query('dateEnd') dateEnd: Date,
  )   {
    return await this.reservationService.getReservations({ 
	  userId,
      dateStart,
      dateEnd,
	});
  }
  @Roles(Role.CLIENT)
  @Get('/client/reservations')
  async getClientReservation( 
	  @Req() req: any,
      @Query('dateStart') dateStart: Date,
      @Query('dateEnd') dateEnd: Date,
  ) {
    return await this.reservationService.getReservations({
      userId: req.user._id,
	  dateStart,
      dateEnd,
    });
  }

  @Roles(Role.CLIENT)
  @Delete('/client/reservations/:id')
  async deleteReservationByClient(@Param('id') id: ID) {
    await this.reservationService.removeReservation(id);
    return;
  }

  @Roles(Role.MANAGER)
  @Delete('/manager/reservations/:id')
  async deleteManagerReservation(@Param('id') id: ID) {
    await this.reservationService.removeReservation(id);
    return;
  }
}
