import { CreateSupportRequestDto } from '../dto/CreateSupportRequest.dto';
import { GetChatListParams } from '../dto/GetChatList.dto';
import { MarkMessageAsReadDto } from '../dto/MarkMessagesAsRead.dto';
import { ID, SendMessageDto } from '../dto/SendMessage.dto';
import { Message } from '../schema/message.schema';
import { SupportRequest } from '../schema/support.schema';

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessageAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
}

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessageAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
  closeRequest(supportRequest: ID): Promise<void>;
}