import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { authMiddleware } from './common/middlewares/auth.middleware';
import { EmptyResponseInterceptor } from './common/interceptors/empty-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);

  app.enableCors({ credentials: true, origin: configService.values.CLIENT_URL });
  app.use(cookieParser());
  app.use(helmet());
  app.use(authMiddleware(configService));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalInterceptors(new EmptyResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Todo App API Docs')
    .setDescription('Documentation for API of the Todo App.')
    .setVersion('1.0')
    .addSecurity('cookie', {
      type: 'apiKey',
      in: 'cookie',
      name: configService.values.TOKEN_COOKIE_NAME,
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.values.PORT);
}
bootstrap();
