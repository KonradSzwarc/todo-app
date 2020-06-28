import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../config/config.service';
import { MailerService } from './mailer.service';

const mockConfigService = () => ({
  values: {
    SENDGRID_KEY: 'any',
  },
});

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService, { provide: ConfigService, useFactory: mockConfigService }],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
