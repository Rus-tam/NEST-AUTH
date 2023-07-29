import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto";
import { UserService } from "@user/user.service";
import { Tokens } from "./interfaces";
import { compareSync } from "bcrypt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService) {}
  async register(dto: RegisterDto) {
    return this.userService.save(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  // async login(dto: LoginDto): Promise<Tokens> {
  //   const user: User = await this.userService.findOne(dto.email).catch((err) => {
  //     this.logger.error(err);
  //     return null;
  //   });
  //
  //   if (!user || !compareSync(dto.password, user.password)) {
  //     throw new UnauthorizedException("Не верный логин или пароль");
  //   }
  // }
}
