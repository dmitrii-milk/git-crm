import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    return this.authService.login(body, res);
  }

  @Public()
  @Post('registration')
  registration(@Body() body: RegistrationDto, @Res() res: Response) {
    return this.authService.registration(body, res);
  }
}
