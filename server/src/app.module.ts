import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmConfigService } from './typeorm-config.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
