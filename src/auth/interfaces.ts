import { Token } from "@prisma/client";

export interface Tokens {
  accessToke: string;
  refreshToken: Token;
}
