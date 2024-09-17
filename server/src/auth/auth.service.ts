import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AUTH_COOKIE_NAME } from '../constants';
import { UsersService } from '../modules/users/users.service';
import { comparePasswordHash, hashPassword } from '../utils';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async setCookie(res: Response, accessToken: string) {
    res.cookie(AUTH_COOKIE_NAME, accessToken, {
      httpOnly: true,
      // sameSite: 'strict',
      domain: '*',
    });
  }

  async login(body: LoginDto, res: Response) {
    const user = await this.checkCredentials(body.email, body.password);

    const accessToken = await this.createAccessToken(user);

    await this.setCookie(res, accessToken);

    res.status(200);
    return res.send({ accessToken });
  }

  async registration(body: RegistrationDto, res: Response) {
    await this.checkEmailAvailability(body.email);

    const hashedPassword = await hashPassword(body.password);

    const user = await this.userService.createUser({
      email: body.email,
      password: hashedPassword,
    });

    const accessToken = await this.createAccessToken(user);

    await this.setCookie(res, accessToken);

    res.status(200);
    return res.send({ accessToken });
  }

  private async createAccessToken(user: User) {
    return this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.configService.get('auth.jwt.secret'),
      },
    );
  }

  private async checkEmailAvailability(email: string) {
    const user = await this.userService.user({
      email,
    });

    if (user) {
      throw new BadRequestException('Email already exists', { cause: 'email' });
    }

    return !user;
  }

  private async checkCredentials(email: string, password: string) {
    const user = await this.userService.user({
      email,
    });

    const isEqual = await comparePasswordHash(password, user?.password);

    if (!user || !isEqual) {
      throw new BadRequestException('Incorrect email or password', {
        cause: 'password',
      });
    }

    return user;
  }
}
