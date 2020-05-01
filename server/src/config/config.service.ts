import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import { requiredInProduction } from './config.utils';

dotenv.config();

type EnvConfig = {
  NODE_ENV: 'development' | 'test' | 'production';
  PORT: number;
  SERVER_URL: string;
  CLIENT_URL: string;

  // database
  DATABASE_SYNC: boolean;
  DATABASE_URL: string;
  DATABASE_SSL: boolean;

  // jwt
  JWT_SECRET: string;
  TOKEN_COOKIE_NAME: string;
  TOKEN_PREFIX: string;

  // heroku variables
  NPM_CONFIG_PRODUCTION: boolean;
  PROJECT_PATH: string;

  //mailing
  SENDGRID_KEY: string;
};

@Injectable()
export class ConfigService {
  constructor() {
    const config = process.env;
    this.envConfig = this.validateInput(config);
  }

  private readonly envConfig: EnvConfig;

  isProduction = process.env.NODE_ENV === 'production';

  private validateInput(envConfig: dotenv.DotenvParseOutput): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema<EnvConfig> = Joi.object({
      NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
      PORT: Joi.number().required(),
      SERVER_URL: Joi.string().required(),
      CLIENT_URL: Joi.string().required(),

      // database
      DATABASE_SYNC: Joi.boolean().required(),
      DATABASE_URL: Joi.string().required(),
      DATABASE_SSL: Joi.boolean().required(),

      // jwt
      JWT_SECRET: Joi.string().required(),
      TOKEN_COOKIE_NAME: Joi.string().required(),
      TOKEN_PREFIX: Joi.string().required(),

      // heroku variables
      NPM_CONFIG_PRODUCTION: requiredInProduction({ joiType: Joi.boolean(), defaultValue: false }),
      PROJECT_PATH: requiredInProduction({ joiType: Joi.string(), defaultValue: 'server' }),

      // mailing
      SENDGRID_KEY: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig, {
      stripUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get values(): EnvConfig {
    return this.envConfig;
  }
}
