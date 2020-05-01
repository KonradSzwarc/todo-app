import * as Joi from '@hapi/joi';

type RequiredInProductionParams =
  | {
      joiType: Joi.StringSchema;
      defaultValue: string;
    }
  | {
      joiType: Joi.BooleanSchema;
      defaultValue: boolean;
    }
  | {
      joiType: Joi.NumberSchema;
      defaultValue: number;
    };

export const requiredInProduction = ({ joiType, defaultValue }: RequiredInProductionParams) =>
  this.isProduction ? joiType.required() : joiType.optional().default(defaultValue);
