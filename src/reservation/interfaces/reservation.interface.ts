import { ObjectId } from 'mongoose';
import { Reservation } from '../schema/reservation.schema';
import { ReservationDto } from '../dto/reservation.dto';
import { ReservationSearchOptions } from '../dto/reservation-search.dto';

export type ID = string | ObjectId;

export interface IReservation {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}