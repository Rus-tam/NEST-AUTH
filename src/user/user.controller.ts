import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "@user/user.service";
import { UserResponse } from "@user/responces";
import { CurrentUser } from "@common/common/decorators";
import { JwtPayload } from "../auth/interfaces";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() dto) {
    const user = await this.userService.save(dto);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":idOrEmail")
  async findOneUser(@Param("idOrEmail") idOrEmail: string) {
    const user = await this.userService.findOne(idOrEmail);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(":id")
  async deleteUser(@Param("id", ParseUUIDPipe) id: string, @CurrentUser("id") userId: JwtPayload) {
    const user = await this.userService.delete(id, userId);
    return new UserResponse(user);
  }
}
