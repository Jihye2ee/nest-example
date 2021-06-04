import { Module } from "@nestjs/common";
import { PasswordService } from "src/service/password.service";
import { PrismaService } from "src/service/prisma.service";
import { UserService } from "src/resolvers/user/user.service";

@Module({
  providers: [UserService, PasswordService, PrismaService]
})
export class UserModule {}