import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type IHotel = Hotel & Document;

@Schema()
export class Hotel extends Document {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
   title: string;

  @Prop()
   description: string;

  @Prop({ required: true, default: new Date() })
   createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);