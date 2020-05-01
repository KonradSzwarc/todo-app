import { Module, Global } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Global()
@Module({
  providers: [MailerService],
})
export class MailerModule {}
