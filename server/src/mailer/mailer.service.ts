import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      auth: {
        user: 'apikey',
        pass: configService.values.SENDGRID_KEY,
      },
    });
  }

  transporter: Transporter;
}
