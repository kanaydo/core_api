import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Public } from 'src/utils/public.decorator';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';


@Controller('api')
export class ApiController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    return this.authService.login(req.user!);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getHello(@Req() request: Request) {
    // console.log(request);
    return request.user;
  }
}
