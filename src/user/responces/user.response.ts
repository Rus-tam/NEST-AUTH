import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserResponse implements User {
  @Exclude()
  createdAt: Date;

  email: string;

  id: string;

  @Exclude()
  password: string;

  role: string;

  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
