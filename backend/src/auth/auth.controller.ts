import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.signUp(name, email, password);
  }

  @Post('login')
  async logIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.logIn(email, password);
  }
}
