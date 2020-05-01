import { OpenAPIV3 } from 'openapi-types';
import { map } from 'lodash';
import {
  SchemaProperties,
  PathProperties,
  Schema,
  PrimitiveSchemaProperties,
  EnumSchemaProperties,
  ReferenceSchemaProperties,
  ArraySchemaProperties,
  ObjectSchemaProperties,
  AnySchemaProperties,
} from './types';
import { fullConsoleLog, iterate } from './utils';

const parsePrimitiveSchema = (schema: OpenAPIV3.NonArraySchemaObject): PrimitiveSchemaProperties => {
  if (schema.type === 'object') {
    throw new TypeError('Object type schemas should be passed to the parseObjectSchema function');
  }

  return {
    type: schema.type,
  };
};

const parseEnumSchema = (schema: OpenAPIV3.NonArraySchemaObject): EnumSchemaProperties => {
  if (!schema.enum) {
    console.error('Cannot found enums for schema', schema);
  }

  return {
    type: 'enum',
    enum: schema.enum || [],
  };
};

const parseReferenceSchema = (schema: OpenAPIV3.ReferenceObject): ReferenceSchemaProperties => {
  const ref = schema.$ref.split('/').pop();

  if (!ref) {
    console.error('Cannot found reference type in the schema', schema);
  }

  return {
    type: 'reference',
    ref: ref || 'any',
  };
};

const parseArraySchema = (schema: OpenAPIV3.ArraySchemaObject): ArraySchemaProperties => {
  return {
    type: 'array',
    item: parseSchema(schema.items),
  };
};

const parseObjectSchema = (schema: OpenAPIV3.NonArraySchemaObject): ObjectSchemaProperties => {
  const { properties = {}, required = [] } = schema;
  let result = { type: 'object' as const, properties: {} as Record<string, SchemaProperties> };

  iterate(properties, (propertyName, propertyValue) => {
    result.properties[propertyName] = parseSchema(propertyValue);

    if (required.includes(propertyName as string)) {
      result.properties[propertyName].required = true;
    }

    if ('nullable' in propertyValue) {
      result.properties[propertyName].nullable = true;
    }
  });

  return result;
};

const parseSchemas = (schemas: OpenAPIV3.ComponentsObject['schemas'] = {}) => {
  const parsedSchemas: Record<string, SchemaProperties> = {};

  iterate(schemas, (schemaName, schemaValue) => {
    parsedSchemas[schemaName] = parseSchema(schemaValue);
  });

  return parsedSchemas;
};

const parsePaths = (paths: OpenAPIV3.PathsObject = {}) => {
  const parsedPaths: PathProperties[] = [];

  iterate(paths, (path, pathValue) => {
    iterate(pathValue, (requestType, requestValue) => {
      if (['get', 'post', 'put', 'patch', 'delete', 'options'].includes(requestType)) {
        parsedPaths.push({
          path: path.toString(),
          requestType,
          ...parsePath(requestValue as OpenAPIV3.OperationObject),
        });
      }
    });
  });

  return parsedPaths;
};

const parsePath = (operationObj: OpenAPIV3.OperationObject) => {
  if (!operationObj.operationId) {
    console.error('Every operation must have a name', operationObj);
    throw new Error('Every operation must have a name. Check the error above for the details');
  }

  const name = operationObj.operationId.split('_').pop() || operationObj.operationId;
  const responseType = operationObj.responses
    ? getResponseType(operationObj.responses)
    : ({ type: 'any' } as AnySchemaProperties);

  const result: Omit<PathProperties, 'path' | 'requestType'> = { name, responseType };

  if (operationObj.requestBody) {
    result.body = getBody(operationObj.requestBody);
  }

  if (operationObj.parameters) {
    const { pathParams, queryParams } = getParams(operationObj.parameters) || {};

    if (pathParams) {
      result.pathParams = pathParams;
    }

    if (queryParams) {
      result.queryParams = queryParams;
    }
  }

  return result;
};

const getParam = ({ name, required, schema }: OpenAPIV3.ParameterObject) => {
  if (!schema) {
    throw new Error(`No schema specified for the param ${name}`);
  }

  const result = parseSchema(schema);

  if (required) {
    result.required = true;
  }

  return result;
};

const getParams = (parameters: OpenAPIV3.OperationObject['parameters']) => {
  if (parameters && !('$ref' in parameters)) {
    const pathParams: Record<string, SchemaProperties> = {};
    const queryParams: Record<string, SchemaProperties> = {};

    map(parameters, (parameter) => {
      if (!('$ref' in parameter)) {
        const name = parameter.name;

        if (parameter.in === 'path') {
          pathParams[name] = getParam(parameter);
        }

        if (parameter.in === 'query') {
          queryParams[name] = getParam(parameter);
        }
      }
    });

    return {
      queryParams: Object.keys(queryParams).length ? queryParams : undefined,
      pathParams: Object.keys(pathParams).length ? pathParams : undefined,
    };
  }
};

const getBody = (requestBody: OpenAPIV3.OperationObject['requestBody']) => {
  if (requestBody && !('$ref' in requestBody)) {
    const schema = requestBody.content[Object.keys(requestBody.content)[0]].schema;

    if (schema) {
      return {
        ...parseSchema(schema),
        required: requestBody.required,
      };
    }
  }
};

const getResponseType = (responses: OpenAPIV3.ResponsesObject) => {
  for (const [responseCode, responseValue] of Object.entries(responses)) {
    if (['200', '201'].includes(responseCode) && !('$ref' in responseValue) && responseValue.content) {
      const schema = responseValue.content[Object.keys(responseValue.content)[0]].schema;

      if (schema) {
        return parseSchema(schema);
      }
    }
  }

  return { type: 'any' } as AnySchemaProperties;
};

const parseSchema = (schema: Schema) => {
  if ('$ref' in schema) {
    return parseReferenceSchema(schema);
  } else if (schema.type === 'array') {
    return parseArraySchema(schema);
  } else if (schema.type === 'object') {
    return parseObjectSchema(schema);
  } else if (schema.enum) {
    return parseEnumSchema(schema);
  } else {
    return parsePrimitiveSchema(schema);
  }
};

export const parseOpenAPI = (openApi: OpenAPIV3.Document) => {
  const schemas = parseSchemas(openApi.components?.schemas);
  const paths = parsePaths(openApi.paths);

  return { schemas, paths };
};
