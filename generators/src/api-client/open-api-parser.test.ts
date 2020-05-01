import { OpenAPIV3 } from 'openapi-types';
import { parseOpenAPI } from './open-api-parser';

describe('OpenAPI Parser', () => {
  it('generates correct object from OpenAPI spec', () => {
    const input: OpenAPIV3.Document = {
      openapi: '3.0.0',
      info: {
        title: 'Todo App API Docs',
        description: 'Documentation for API of the Todo App.',
        version: '1.0',
        contact: {},
      },
      tags: [],
      servers: [],
      components: {
        securitySchemes: { cookie: { type: 'apiKey', in: 'cookie', name: 'access_token' } },
        schemas: {
          SignInDto: {
            type: 'object',
            properties: { fullName: { type: 'string' }, email: { type: 'string' } },
            required: ['fullName', 'email'],
          },
          Language: { type: 'string', enum: ['en', 'pl'] },
          ThemeKey: { type: 'string', enum: ['light', 'dark'] },
          TaskStatus: { type: 'string', enum: ['TODO', 'DONE'] },
          User: {
            type: 'object',
            properties: {
              language: { default: 'en', $ref: '#/components/schemas/Language' },
              theme: { default: 'light', $ref: '#/components/schemas/ThemeKey' },
              id: { type: 'string' },
              fullName: { type: 'string' },
              email: { type: 'string' },
              password: { type: 'string' },
              tasks: {
                type: 'array',
                items: { $ref: '#/components/schemas/Task' },
              },
            },
            required: ['language', 'theme', 'id', 'fullName', 'email', 'password', 'tasks'],
          },
          Task: {
            type: 'object',
            properties: {
              status: {
                default: 'TODO',
                $ref: '#/components/schemas/TaskStatus',
              },
              id: { type: 'string' },
              content: { type: 'string' },
              user: { $ref: '#/components/schemas/User' },
              userId: { type: 'string' },
            },
            required: ['status', 'id', 'content', 'user', 'userId'],
          },
          CreateUserDto: {
            type: 'object',
            properties: {
              fullName: { type: 'string' },
              email: { type: 'string' },
              password: { type: 'string', minLength: 8 },
            },
            required: ['fullName', 'email', 'password'],
          },
          UpdateUserDto: {
            type: 'object',
            properties: {
              language: { default: 'en', $ref: '#/components/schemas/Language' },
              theme: { default: 'light', $ref: '#/components/schemas/ThemeKey' },
              fullName: { type: 'string' },
              email: { type: 'string' },
            },
          },
          CreateTaskDto: {
            type: 'object',
            properties: { content: { type: 'string' } },
            required: ['content'],
          },
          UpdateTaskDto: {
            type: 'object',
            properties: {
              status: { $ref: '#/components/schemas/TaskStatus' },
              content: { type: 'string' },
            },
          },
        },
      },
      paths: {
        '/auth/sign-in': {
          post: {
            operationId: 'AuthController_signIn',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': { schema: { $ref: '#/components/schemas/SignInDto' } },
              },
            },
            responses: {
              '201': {
                description: '',
                content: { 'application/json': { schema: { type: 'boolean' } } },
              },
            },
          },
        },
        '/auth/sign-out': {
          post: {
            operationId: 'AuthController_signOut',
            parameters: [],
            responses: {
              '201': {
                description: '',
                content: { 'application/json': { schema: { type: 'boolean' } } },
              },
            },
          },
        },
        '/users': {
          get: {
            operationId: 'UsersController_queryAllUsers',
            parameters: [],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/User' },
                    },
                  },
                },
              },
            },
          },
          post: {
            operationId: 'UsersController_createUser',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CreateUserDto' },
                },
              },
            },
            responses: {
              '201': {
                description: '',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
        },
        '/users/current': {
          get: {
            operationId: 'UsersController_queryCurrentUser',
            parameters: [],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User' } },
                },
              },
            },
            security: [{ cookie: [] }],
          },
          patch: {
            operationId: 'UsersController_updateCurrentUser',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UpdateUserDto' },
                },
              },
            },
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User' } },
                },
              },
            },
            security: [{ cookie: [] }],
          },
          delete: {
            operationId: 'UsersController_deleteCurrentUser',
            parameters: [],
            responses: {
              '200': {
                description: '',
                content: { 'application/json': { schema: { type: 'boolean' } } },
              },
            },
            security: [{ cookie: [] }],
          },
        },
        '/users/{id}': {
          get: {
            operationId: 'UsersController_findOneUser',
            parameters: [
              {
                name: 'id',
                required: true,
                in: 'path',
                schema: { type: 'string' },
              },
            ],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          patch: {
            operationId: 'UsersController_updateUser',
            parameters: [
              {
                name: 'id',
                required: true,
                in: 'path',
                schema: { type: 'string' },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UpdateUserDto' },
                },
              },
            },
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User' } },
                },
              },
            },
          },
          delete: {
            operationId: 'UsersController_deleteUser',
            parameters: [
              {
                name: 'id',
                required: true,
                in: 'path',
                schema: { type: 'string' },
              },
            ],
            responses: {
              '200': {
                description: '',
                content: { 'application/json': { schema: { type: 'boolean' } } },
              },
            },
          },
        },
        '/tasks': {
          get: {
            operationId: 'TasksController_queryAllTasks',
            parameters: [],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Task' },
                    },
                  },
                },
              },
            },
            security: [{ cookie: [] }],
          },
          post: {
            operationId: 'TasksController_createTask',
            parameters: [],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CreateTaskDto' },
                },
              },
            },
            responses: {
              '201': {
                description: '',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Task' } },
                },
              },
            },
            security: [{ cookie: [] }],
          },
        },
        '/tasks/{id}': {
          put: {
            operationId: 'TasksController_updateTask',
            parameters: [
              {
                name: 'id',
                required: true,
                in: 'path',
                schema: { type: 'string' },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/UpdateTaskDto' },
                },
              },
            },
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Task' } },
                },
              },
            },
            security: [{ cookie: [] }],
          },
          delete: {
            operationId: 'TasksController_deleteTask',
            parameters: [
              {
                name: 'id',
                required: true,
                in: 'path',
                schema: { type: 'string' },
              },
            ],
            responses: {
              '200': {
                description: '',
                content: { 'application/json': { schema: { type: 'boolean' } } },
              },
            },
            security: [{ cookie: [] }],
          },
        },
      },
    };

    const expectedOutput = {
      schemas: {
        SignInDto: {
          type: 'object',
          properties: {
            fullName: { type: 'string', required: true },
            email: { type: 'string', required: true },
          },
        },
        Language: { type: 'enum', enum: ['en', 'pl'] },
        ThemeKey: { type: 'enum', enum: ['light', 'dark'] },
        TaskStatus: { type: 'enum', enum: ['TODO', 'DONE'] },
        User: {
          type: 'object',
          properties: {
            language: { type: 'reference', ref: 'Language', required: true },
            theme: { type: 'reference', ref: 'ThemeKey', required: true },
            id: { type: 'string', required: true },
            fullName: { type: 'string', required: true },
            email: { type: 'string', required: true },
            password: { type: 'string', required: true },
            tasks: {
              type: 'array',
              item: { type: 'reference', ref: 'Task' },
              required: true,
            },
          },
        },
        Task: {
          type: 'object',
          properties: {
            status: { type: 'reference', ref: 'TaskStatus', required: true },
            id: { type: 'string', required: true },
            content: { type: 'string', required: true },
            user: { type: 'reference', ref: 'User', required: true },
            userId: { type: 'string', required: true },
          },
        },
        CreateUserDto: {
          type: 'object',
          properties: {
            fullName: { type: 'string', required: true },
            email: { type: 'string', required: true },
            password: { type: 'string', required: true },
          },
        },
        UpdateUserDto: {
          type: 'object',
          properties: {
            language: { type: 'reference', ref: 'Language' },
            theme: { type: 'reference', ref: 'ThemeKey' },
            fullName: { type: 'string' },
            email: { type: 'string' },
          },
        },
        CreateTaskDto: {
          type: 'object',
          properties: { content: { type: 'string', required: true } },
        },
        UpdateTaskDto: {
          type: 'object',
          properties: {
            status: { type: 'reference', ref: 'TaskStatus' },
            content: { type: 'string' },
          },
        },
      },
      paths: [
        {
          path: '/auth/sign-in',
          requestType: 'post',
          name: 'signIn',
          responseType: { type: 'boolean' },
          body: { type: 'reference', ref: 'SignInDto', required: true },
        },
        {
          path: '/auth/sign-out',
          requestType: 'post',
          name: 'signOut',
          responseType: { type: 'boolean' },
        },
        {
          path: '/users',
          requestType: 'get',
          name: 'queryAllUsers',
          responseType: { type: 'array', item: { type: 'reference', ref: 'User' } },
        },
        {
          path: '/users',
          requestType: 'post',
          name: 'createUser',
          responseType: { type: 'reference', ref: 'User' },
          body: { type: 'reference', ref: 'CreateUserDto', required: true },
        },
        {
          path: '/users/current',
          requestType: 'get',
          name: 'queryCurrentUser',
          responseType: { type: 'reference', ref: 'User' },
        },
        {
          path: '/users/current',
          requestType: 'patch',
          name: 'updateCurrentUser',
          responseType: { type: 'reference', ref: 'User' },
          body: { type: 'reference', ref: 'UpdateUserDto', required: true },
        },
        {
          path: '/users/current',
          requestType: 'delete',
          name: 'deleteCurrentUser',
          responseType: { type: 'boolean' },
        },
        {
          path: '/users/{id}',
          requestType: 'get',
          name: 'findOneUser',
          responseType: { type: 'reference', ref: 'User' },
          pathParams: { id: { type: 'string', required: true } },
        },
        {
          path: '/users/{id}',
          requestType: 'patch',
          name: 'updateUser',
          responseType: { type: 'reference', ref: 'User' },
          body: { type: 'reference', ref: 'UpdateUserDto', required: true },
          pathParams: { id: { type: 'string', required: true } },
        },
        {
          path: '/users/{id}',
          requestType: 'delete',
          name: 'deleteUser',
          responseType: { type: 'boolean' },
          pathParams: { id: { type: 'string', required: true } },
        },
        {
          path: '/tasks',
          requestType: 'get',
          name: 'queryAllTasks',
          responseType: { type: 'array', item: { type: 'reference', ref: 'Task' } },
        },
        {
          path: '/tasks',
          requestType: 'post',
          name: 'createTask',
          responseType: { type: 'reference', ref: 'Task' },
          body: { type: 'reference', ref: 'CreateTaskDto', required: true },
        },
        {
          path: '/tasks/{id}',
          requestType: 'put',
          name: 'updateTask',
          responseType: { type: 'reference', ref: 'Task' },
          body: { type: 'reference', ref: 'UpdateTaskDto', required: true },
          pathParams: { id: { type: 'string', required: true } },
        },
        {
          path: '/tasks/{id}',
          requestType: 'delete',
          name: 'deleteTask',
          responseType: { type: 'boolean' },
          pathParams: { id: { type: 'string', required: true } },
        },
      ],
    };

    expect(parseOpenAPI(input)).toEqual(expectedOutput);
  });
});
