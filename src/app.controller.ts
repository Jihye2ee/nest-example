import { User, Post as PostModel } from '.prisma/client';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PostService } from './service/post.service';
import { UserServie } from './service/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserServie,
    private postService: PostService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('user')
  async getPublishedUsers(): Promise<User[]> {
    return this.userService.users({});
  }

  @Post('user')
  async singUpUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(userData)
  }

}
