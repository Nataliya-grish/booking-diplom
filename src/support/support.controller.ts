import { Body, Controller, Get, Param, Post, Query, Req, Request, UseGuards} from '@nestjs/common';
import { ID } from './dto/CreateSupportRequest.dto';
import { Role, Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UsersService } from '../users/users.service';
import { SupportRequestService } from './support.service';
import { SupportRequestClientService } from './supportRequestClient.service';
import { SupportRequestEmployeeService } from './supportRequestEmployee.service';
import { HttpValidationPipe } from '../validation/validation.pipe';
import { GetChatListParams } from './dto/GetChatList.dto';
import { CreateSupportRequestDto } from './dto/CreateSupportRequest.dto';
import { MarkMessageAsReadDto } from './dto/MarkMessagesAsRead.dto';
import { SendMessageDto } from './dto/SendMessage.dto';
import { User } from '../users/schema/users.schema';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api')
export class SupportRequestController {
  constructor(
    private supportRequestService: SupportRequestService,
    private supportRequestClientService: SupportRequestClientService,
    private supportRequestEmployeeService: SupportRequestEmployeeService,
    private usersService: UsersService,
  ) {}

  @Roles(Role.CLIENT)
  @Post('/client/support-requests')
  async createSupportRequest(
    @Body(new HttpValidationPipe()) data: CreateSupportRequestDto,
    @Req() req: Request & { user: User },
  ) {
    const request = await this.supportRequestClientService.createSupportRequest(
      {
        user: req.user.id,
        text: data.text,
      },
    );
    const unrdMessage = await this.supportRequestClientService.getUnreadCount(
      request._id,
    );
    return {
      id: request._id,
      createdAt: request.createdAt,
      isActive: request.isActive,
      newMessages: unrdMessage.length >= 0,
    };
  }

  @Roles(Role.CLIENT)
  @Get('/client/support-requests')
  async getSupportRequest(
    @Query() query: GetChatListParams,
    @Request() req: Request & { user: User },
  ) {
    query.user = req.user.id;
    const request = this.supportRequestService.findSupportRequests(query);
    const unrdMessage = await this.supportRequestClientService.getUnreadCount(
      query.user,
    );
    const result = (await request).map((mes) => ({
      id: mes._id,
      createdAt: mes.createdAt,
      isActive: mes.isActive,
      newMessage: unrdMessage.length >= 0,
    }));

    return result;
  }

  @Roles(Role.MANAGER)
  @Get('/manager/support-requests')
  async getSupportRequestManager(
    @Query() query: GetChatListParams,
    @Request() req: Request & { user: User },
  ) {
    const request = this.supportRequestService.findSupportRequests(query);
    return (await request).map(async (mes) => {
      const unrdMessage =
        await this.supportRequestEmployeeService.getUnreadCount(query.user);
      return {
        id: mes._id,
        createdAt: mes.createdAt,
        isActive: mes.isActive,
        newMessage: unrdMessage.length >= 0,
        client: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          contactPhone: req.user.contactPhone,
        },
      };
    });
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CLIENT)
  @Get('/common/support-requests/:id/messages')
  async getAllSupportRequestByID(@Param('id') id: ID) {
    const request = await this.supportRequestService.getMessages(id);
    return request.map(async (user) => {
      const { id: authorId, name } = await this.usersService.findById(
        user.author,
      );
      return {
        id: user._id,
        createAt: user.sentAt.toString(),
        readAt: user.readAt?.toString() || null,
        author: {
          id: authorId,
          name: name,
        },
      };
    });
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CLIENT)
  @Post('/common/support-requests/:id/messages')
  async sendMessages(
    @Param('id') id: ID,
    @Body(new HttpValidationPipe()) body: SendMessageDto,
    @Request() req: Request & { user: User },
  ) {
    return this.supportRequestService.sendMessage({
      author: req.user.id,
      supportRequest: id,
      text: body.text,
    });
  }

  @Roles(Role.MANAGER, Role.CLIENT)
  @Post('/common/support-requests/:id/messages/read')
  async markMessagesAsRead(
    @Param('id') id: ID,
    @Body(new HttpValidationPipe()) body: MarkMessageAsReadDto,
    @Request() req: Request & { user: User },
  ) {
    switch (req.user.role) {
      case Role.MANAGER: {
        this.supportRequestClientService.markMessagesAsRead({
          user: req.user.id,
          supportRequest: id,
          createdBefore: body.createdBefore,
        });
      }
      case Role.CLIENT: {
        this.supportRequestEmployeeService.markMessagesAsRead({
          user: req.user.id,
          supportRequest: id,
          createdBefore: body.createdBefore,
        });
      }
    }

    return { success: true };
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CLIENT)
  @Post('/common/support-requests/close/:id')
  async closeRequest(@Param('id') id: ID) {
    await this.supportRequestEmployeeService.closeRequest(id);
  }
}