import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { parseOpenAPI } from './open-api-parser';
import { generateClient } from './client-generator';

const main = async () => {
  const openApi = (await SwaggerParser.parse('http://localhost:4000/api-json')) as OpenAPIV3.Document;
  const parsed = parseOpenAPI(openApi);

  await generateClient(parsed.schemas, parsed.paths);
};

main();
