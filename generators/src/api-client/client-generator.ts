import {
  Project,
  Directory,
  CodeBlockWriter,
  SourceFile,
  TypeAliasDeclarationStructure,
  OptionalKind,
  FunctionDeclarationStructure,
  ImportDeclarationStructure,
  LocalTargetDeclarations,
  NewLineKind,
  IndentationText,
  EnumDeclarationStructure,
} from 'ts-morph';
import del from 'del';
import { resolve } from 'path';
import { SchemaProperties, PathProperties } from './types';
import { iterate, capitalize, ifVal, fullConsoleLog } from './utils';
import { config } from '../../config';

const createCodeBlockWriter = () =>
  new CodeBlockWriter({
    indentNumberOfSpaces: 2,
    useTabs: false,
    newLine: '\n',
    useSingleQuote: true,
  });

const generateType = (modelValue: SchemaProperties) => {
  if (modelValue.type === 'object') {
    return createObject(modelValue.properties);
  }

  if (modelValue.type === 'array') {
    const writer = createCodeBlockWriter();

    writer.write(`${generateType(modelValue.item)}[]`);

    return writer.toString();
  }

  if (modelValue.type === 'enum') {
    const writer = createCodeBlockWriter();

    modelValue.enum.map((enumValue, i, arr) => {
      writer.write(enumValue);
      writer.conditionalWrite(i < arr.length - 1, '| ');
    });
    writer.write(';');

    return writer.toString();
  }

  if (modelValue.type === 'reference') {
    return modelValue.ref;
  }

  if (modelValue.type === 'integer') {
    return 'number';
  }

  return modelValue.type;
};

const createModels = (schemas: Record<string, SchemaProperties>, apiFile: SourceFile) => {
  iterate(schemas, (modelName, modelValue) => {
    if (modelValue.type === 'enum') {
      createEnumEnhancer(apiFile)({ name: modelName }, modelValue.enum);
    } else {
      prependWithNewLine(createTypesEnhancer(apiFile)({ name: modelName, type: generateType(modelValue) }));
    }
  });
};

const createObject = (record: Record<string, SchemaProperties>) => {
  const writer = createCodeBlockWriter();

  writer.block(() => {
    iterate(record, (name, value) => {
      writer.writeLine(`${name}${value.required ? '' : '?'}: ${generateType(value)}${value.nullable ? ' | null' : ''}`);
    });
  });

  return writer.toString();
};

const getParamsTypeName = (properties: PathProperties) => `${capitalize(properties.name)}Params`;

const getBodyTypeName = (properties: PathProperties) => `${capitalize(properties.name)}Body`;

const getQueryTypeName = (properties: PathProperties) => `${capitalize(properties.name)}Query`;

const getResponseTypeName = (properties: PathProperties) => `${capitalize(properties.name)}Response`;

const getRequestFunctionName = (properties: PathProperties) => `${properties.name}Request`;

const wrapResponseType = (responseType: string) => `AxiosResponse<${responseType}>`;

const wrapWithPromiseType = (content: string) => `Promise<${content}>`;

const prependWithNewLine = (declaration: LocalTargetDeclarations) => {
  declaration.prependWhitespace((writer) => writer.newLine());
};

const createTypesEnhancer = (modelFile: SourceFile) => (structure: OptionalKind<TypeAliasDeclarationStructure>) => {
  return modelFile.addTypeAlias({
    ...structure,
    isExported: true,
  });
};

const createEnumEnhancer = (modelFile: SourceFile) => (
  structure: OptionalKind<EnumDeclarationStructure>,
  values?: string[],
) => {
  const enumDeclaration = modelFile.addEnum({ ...structure, isExported: true });

  ifVal(values, (enums) => {
    enums.map((enumItem) => {
      enumDeclaration.addMember({ name: enumItem.toUpperCase(), value: enumItem });
    });
  });

  return enumDeclaration;
};

const createImportsEnhancer = (modelFile: SourceFile) => (structure: OptionalKind<ImportDeclarationStructure>) => {
  return modelFile.addImportDeclaration(structure);
};

const createFile = (directory: Project | Directory) => (fileName: string) => {
  return directory.createSourceFile(fileName);
};

const createRequestPath = (properties: PathProperties) => {
  let path = properties.path;

  if (properties.pathParams) {
    Object.keys(properties.pathParams).map((param) => {
      path = path.replace(`{${param}}`, `\${params.${param}}`);
    });
  }

  return `\`${path}\``;
};

const createFunctionsEnhancer = (modelFile: SourceFile) => (structure: OptionalKind<FunctionDeclarationStructure>) => {
  return modelFile.addFunction({
    ...structure,
    isExported: true,
  });
};

const enhanceFileWithImports = (modelFile: SourceFile) => {
  const addImport = createImportsEnhancer(modelFile);

  addImport({ namedImports: [{ name: 'AxiosResponse' }], moduleSpecifier: 'axios' });
  addImport({ namedImports: [{ name: 'apiClient' }], moduleSpecifier: config.apiClient.apiClientPath });
};

const enhanceFileWithTypes = (modelFile: SourceFile) => (properties: PathProperties) => {
  const addType = createTypesEnhancer(modelFile);

  ifVal(properties.pathParams, (pathParams) => {
    addType({
      name: getParamsTypeName(properties),
      type: createObject(pathParams),
    });
  });

  ifVal(properties.body, (body) => {
    prependWithNewLine(
      addType({
        name: getBodyTypeName(properties),
        type: generateType(body),
      }),
    );
  });

  ifVal(properties.queryParams, (queryParams) => {
    prependWithNewLine(
      addType({
        name: getQueryTypeName(properties),
        type: createObject(queryParams),
      }),
    );
  });

  prependWithNewLine(
    addType({
      name: getResponseTypeName(properties),
      type: wrapResponseType(generateType(properties.responseType)),
    }),
  );
};

const enhanceFileWithRequestFunction = (modelFile: SourceFile) => (properties: PathProperties) => {
  const addFuntion = createFunctionsEnhancer(modelFile);

  const requestFunction = addFuntion({
    name: getRequestFunctionName(properties),
    returnType: wrapWithPromiseType(getResponseTypeName(properties)),
  });

  ifVal(properties.pathParams, () => {
    requestFunction.addParameter({ name: 'params', type: getParamsTypeName(properties) });
  });

  ifVal(properties.body, () => {
    requestFunction.addParameter({ name: 'body', type: getBodyTypeName(properties) });
  });

  ifVal(properties.queryParams, () => {
    requestFunction.addParameter({ name: 'query', type: getQueryTypeName(properties) });
  });

  requestFunction.setBodyText((writer) => {
    writer.write(`return apiClient.${properties.requestType}(${createRequestPath(properties)}`);
    writer.conditionalWrite(!!properties.body, ', body');
    writer.write(')');
  });
};

const createApi = (pathsProperties: PathProperties[], apiFile: SourceFile) => {
  pathsProperties.map((pathProperties) => {
    enhanceFileWithTypes(apiFile)(pathProperties);
    enhanceFileWithRequestFunction(apiFile)(pathProperties);
  });
};

export const generateClient = async (schemas: Record<string, SchemaProperties>, paths: PathProperties[]) => {
  const project = new Project({
    useInMemoryFileSystem: false,
    manipulationSettings: { newLineKind: NewLineKind.LineFeed, indentationText: IndentationText.TwoSpaces },
  });

  const filePath = resolve(config.clientGeneratedPath, config.apiClient.fileName);

  await del(filePath, {
    force: true,
  });

  const apiFile = createFile(project)(filePath);

  enhanceFileWithImports(apiFile);

  createModels(schemas, apiFile);
  createApi(paths, apiFile);

  await project.save();
};
