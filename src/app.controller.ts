import { User, Post as PostModel } from '.prisma/client';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { PostService } from './service/post.service';
import { UserServie } from './service/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserServie,
    private postService: PostService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    // return req.user;
    console.log('[route] login', req.body);
    return this.authService.login(req.body);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   // return req.user;
  //   console.log('[route] login', req);
  //   return this.authService.login(req.uesrname);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('[getProfile]', req);
    return req.user;
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getPublishedUsers(): Promise<User[]> {
    console.log('[getPublishedUsers]');
    return this.userService.users({});
  }

  @Post('user')
  async singUpUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(userData)
  }

}
