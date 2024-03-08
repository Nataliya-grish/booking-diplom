import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserModel = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({
    required: true,
    default: 'client',
    role: 'client' || 'admin' || 'manager',
  })
  role: string;

  @Prop({ required: true })
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);