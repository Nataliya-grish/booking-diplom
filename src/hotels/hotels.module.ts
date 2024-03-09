import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsService } from './hotels.service';
import { IHotelRoomService } from './rooms.service';
import { HotelsController } from './hotels.controller';
import { Hotel, HotelSchema } from './schema/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schema/room.schema';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelsController, RoomsController],
  providers: [HotelsService, IHotelRoomService],
  exports: [HotelsService, IHotelRoomService],
})
export class HotelsModule {}
