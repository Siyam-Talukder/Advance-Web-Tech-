import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import express from 'express'; // <-- 1. Import this from express
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) 
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginDto: LoginDto, 
    @Res({ passthrough: true }) res: express.Response 
  ) {
    const result = await this.authService.login(loginDto);
    res.cookie('access_token', result.access_token, {
      httpOnly: true, 
      sameSite: 'none',
      secure: false, 
      path: '/',
      maxAge: 300 * 60 * 1000, 
    });

    return { message: "Login successful" };
  }
}