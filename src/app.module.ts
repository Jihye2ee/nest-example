import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostResolver } from './resolver.post';
import { UserResolver } from './resolver.user';
import { PostService } from './service/post.service';
import { PrismaService } from './service/prisma.service';
import { UserServie } from './service/user.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // 여기에 넘기는 options은 Apollo instance으로 pass됨
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UserServie,
    PostService,
    UserResolver,
    PostResolver
  ],
})
export class AppModule {}
