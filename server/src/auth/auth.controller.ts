import { Response } from 'express';
import { Controller, UseGuards, Req, Res, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiBody({ type: SignInDto })
  signIn(@Req() req, @Res() res: Response) {
    const token = this.authService.signIn(req.user);
    const TOKEN_COOKIE_NAME = this.configService.values.TOKEN_COOKIE_NAME;
    const TOKEN_PREFIX = this.configService.values.TOKEN_PREFIX;

    res
      .status(200)
      .cookie(TOKEN_COOKIE_NAME, TOKEN_PREFIX + token, {
        expires: new Date(Date.now() + 24 * 3600000),
        httpOnly: true,
      })
      .send(true);

    return true;
  }

  @Post('sign-out')
  signOut(@Res() res: Response) {
    const TOKEN_COOKIE_NAME = this.configService.values.TOKEN_COOKIE_NAME;

    res.clearCookie(TOKEN_COOKIE_NAME).send(true);

    return true;
  }
}
