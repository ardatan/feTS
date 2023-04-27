export default {
    openapi: '3.0.3',
    info: {
        title: 'Example CRUD API',
        description: 'OpenAPI compliant REST API built using tRPC with Next.js',
        version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    paths: {
        '/auth/register': {
            post: {
                operationId: 'mutation.auth.register',
                summary: 'Register as a new user',
                tags: ['auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    passcode: { type: 'number', minimum: 1000, maximum: 9999 },
                                    name: { type: 'string', minLength: 3 },
                                },
                                required: ['email', 'passcode', 'name'],
                                additionalProperties: false,
                            },
                        },
                    },
                },
                parameters: [],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string', format: 'uuid' },
                                                email: { type: 'string', format: 'email' },
                                                name: { type: 'string', minLength: 3 },
                                            },
                                            required: ['id', 'email', 'name'],
                                            additionalProperties: false,
                                        },
                                    },
                                    required: ['user'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
        },
        '/auth/login': {
            post: {
                operationId: 'mutation.auth.login',
                summary: 'Login as an existing user',
                tags: ['auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    passcode: { type: 'number', minimum: 1000, maximum: 9999 },
                                },
                                required: ['email', 'passcode'],
                                additionalProperties: false,
                            },
                        },
                    },
                },
                parameters: [],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: { token: { type: 'string' } },
                                    required: ['token'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
        },
        '/users': {
            get: {
                operationId: 'query.users.getUsers',
                summary: 'Read all users',
                tags: ['users'],
                parameters: [],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        users: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'string', format: 'uuid' },
                                                    email: { type: 'string', format: 'email' },
                                                    name: { type: 'string' },
                                                },
                                                required: ['id', 'email', 'name'],
                                                additionalProperties: false,
                                            },
                                        },
                                    },
                                    required: ['users'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
        },
        '/users/{id}': {
            get: {
                operationId: 'query.users.getUserById',
                summary: 'Read a user by id',
                tags: ['users'],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string', format: 'uuid' },
                                                email: { type: 'string', format: 'email' },
                                                name: { type: 'string' },
                                            },
                                            required: ['id', 'email', 'name'],
                                            additionalProperties: false,
                                        },
                                    },
                                    required: ['user'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
        },
        '/posts': {
            get: {
                operationId: 'query.posts.getPosts',
                summary: 'Read all posts',
                tags: ['posts'],
                parameters: [
                    {
                        name: 'userId',
                        in: 'query',
                        required: false,
                        schema: { type: 'string', format: 'uuid' },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        posts: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'string', format: 'uuid' },
                                                    content: { type: 'string' },
                                                    userId: { type: 'string', format: 'uuid' },
                                                },
                                                required: ['id', 'content', 'userId'],
                                                additionalProperties: false,
                                            },
                                        },
                                    },
                                    required: ['posts'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
            post: {
                operationId: 'mutation.posts.createPost',
                summary: 'Create a new post',
                tags: ['posts'],
                security: [{ Authorization: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: { content: { type: 'string', minLength: 1, maxLength: 140 } },
                                required: ['content'],
                                additionalProperties: false,
                            },
                        },
                    },
                },
                parameters: [],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        post: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string', format: 'uuid' },
                                                content: { type: 'string' },
                                                userId: { type: 'string', format: 'uuid' },
                                            },
                                            required: ['id', 'content', 'userId'],
                                            additionalProperties: false,
                                        },
                                    },
                                    required: ['post'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
        },
        '/posts/{id}': {
            get: {
                operationId: 'query.posts.getPostById',
                summary: 'Read a post by id',
                tags: ['posts'],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        post: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string', format: 'uuid' },
                                                content: { type: 'string' },
                                                userId: { type: 'string', format: 'uuid' },
                                            },
                                            required: ['id', 'content', 'userId'],
                                            additionalProperties: false,
                                        },
                                    },
                                    required: ['post'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
            put: {
                operationId: 'mutation.posts.updatePostById',
                summary: 'Update an existing post',
                tags: ['posts'],
                security: [{ Authorization: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: { content: { type: 'string', minLength: 1 } },
                                required: ['content'],
                                additionalProperties: false,
                            },
                        },
                    },
                },
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        post: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string', format: 'uuid' },
                                                content: { type: 'string' },
                                                userId: { type: 'string', format: 'uuid' },
                                            },
                                            required: ['id', 'content', 'userId'],
                                            additionalProperties: false,
                                        },
                                    },
                                    required: ['post'],
                                    additionalProperties: false,
                                },
                            },
                        },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
            delete: {
                operationId: 'mutation.posts.deletePostById',
                summary: 'Delete a post',
                tags: ['posts'],
                security: [{ Authorization: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: { 'application/json': { schema: { enum: ['null'], nullable: true } } },
                    },
                    default: { $ref: '#/components/responses/error' },
                },
            },
        },
    },
    components: {
        securitySchemes: { Authorization: { type: 'http', scheme: 'bearer' } },
        responses: {
            error: {
                description: 'Error response',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                                code: { type: 'string' },
                                issues: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: { message: { type: 'string' } },
                                        required: ['message'],
                                        additionalProperties: false,
                                    },
                                },
                            },
                            required: ['message', 'code'],
                            additionalProperties: false,
                        },
                    },
                },
            },
        },
    },
    tags: [{ name: 'auth' }, { name: 'users' }, { name: 'posts' }],
    externalDocs: { url: 'https://github.com/jlalmes/trpc-openapi' },
} as const