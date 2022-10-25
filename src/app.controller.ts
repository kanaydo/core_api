import { Controller, Post, UseGuards, Get, Req, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { Public } from './utils/public.decorator';

@Controller()
export class AppController {
  // constructor(
  //   private readonly authService: AuthService
  // ) {}

  // @Public()
  // @Post('auth/login')
  // @UseGuards(LocalAuthGuard)
  // async login(@Req() req: Request) {
  //   // console.log('user =======================> ', req.user);
  //   return this.authService.login(req.user!);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getHello(@Req() request: Request) {
  //   // console.log(request);
  //   return request.user;
  // }
}
