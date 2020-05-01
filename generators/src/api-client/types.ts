import { OpenAPIV3 } from 'openapi-types';

type BaseSchemaProperties = {
  required?: boolean;
  nullable?: boolean;
};

export type PrimitiveType = 'string' | 'number' | 'boolean' | 'null' | 'integer' | 'any';

export type AnySchemaProperties = BaseSchemaProperties & {
  type: 'any';
};

export type PrimitiveSchemaProperties = BaseSchemaProperties & {
  type: PrimitiveType;
};

export type ReferenceSchemaProperties = BaseSchemaProperties & {
  type: 'reference';
  ref: string;
};

export type EnumSchemaProperties = BaseSchemaProperties & {
  type: 'enum';
  enum: string[];
};

export type ArraySchemaProperties = BaseSchemaProperties & {
  type: 'array';
  item: SchemaProperties;
};

export type ObjectSchemaProperties = BaseSchemaProperties & {
  type: 'object';
  properties: Record<string, SchemaProperties>;
};

export type SchemaProperties =
  | AnySchemaProperties
  | PrimitiveSchemaProperties
  | ReferenceSchemaProperties
  | EnumSchemaProperties
  | ArraySchemaProperties
  | ObjectSchemaProperties;

export type PathProperties = {
  path: string;
  requestType: string;
  name: string;
  responseType: SchemaProperties;
  body?: SchemaProperties;
  pathParams?: Record<string, SchemaProperties>;
  queryParams?: Record<string, SchemaProperties>;
};

export type Schema = OpenAPIV3.ReferenceObject | OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject;
