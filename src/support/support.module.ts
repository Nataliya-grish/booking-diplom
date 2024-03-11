import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequestService } from './support.service';
import { SupportRequestClientService } from './supportRequestClient.service';
import { SupportRequestEmployeeService } from './supportRequestEmployee.service';
import { SupportRequest, SupportRequestSchema } from './schema/support.schema';
import { Message, MessageSchema } from './schema/message.schema';
import { SupportRequestController } from './support.controller';
import { SupportGateway } from './support.gateway';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UsersModule,
  ],
  controllers: [SupportRequestController],
  providers: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
    SupportGateway,
  ],
})
export class SupportModule {}
