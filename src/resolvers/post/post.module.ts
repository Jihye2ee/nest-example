import { Module } from "@nestjs/common";
import { PrismaService } from "src/service/prisma.service";
import { PostResolver } from "./resolver.post";

@Module({
    providers: [
        PostResolver,
        PrismaService
    ]
})
export class PostModule {
    
}