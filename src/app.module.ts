import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportModule } from './support/support.module';
import configuration from './config/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
	  ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
      }),
	  MongooseModule.forRoot(process.env.MONGO_CONNECTION),
	  UsersModule,
	  AuthModule,
	  HotelsModule,
	  ReservationModule,
	  SupportModule,
	  EventEmitterModule.forRoot({
       wildcard: false,
       delimiter: '.',
       newListener: false,
       removeListener: false,
       maxListeners: 10,
       verboseMemoryLeak: false,
       ignoreErrors: false,
    }),
	  
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
