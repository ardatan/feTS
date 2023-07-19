export default {
  openapi: '3.0.1',
  info: {
    title: 'Petstore API',
    description:
      'This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.',
    termsOfService: 'http://swagger.io/terms/',
    license: { name: 'Apache 2.0', url: 'http://springdoc.org' },
    version: '1.4.3',
  },
  servers: [{ url: 'http://localhost:8080', description: 'Generated server url' }],
  tags: [
    { name: 'user', description: 'the user API' },
    { name: 'store', description: 'the store API' },
    { name: 'pet', description: 'the pet API' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['home-controller'],
        operationId: 'index',
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': { description: 'OK', content: { '*/*': { schema: { type: 'string' } } } },
        },
      },
    },
    '/pet': {
      get: {
        tags: ['pet'],
        summary: 'Get all Pets paged',
        description: 'Get all Pets paged',
        operationId: 'getAllPets',
        parameters: [
          {
            name: 'pageable',
            in: 'query',
            required: true,
            schema: { $ref: '#/components/schemas/Pageable' },
          },
        ],
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': {
            description: 'successful operation',
            content: {
              'application/xml': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
            },
          },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
      put: {
        tags: ['pet'],
        summary: 'Update an existing pet',
        description: 'Update an existing pet by Id',
        operationId: 'updatePet',
        requestBody: {
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Pet' } },
            'application/xml': { schema: { $ref: '#/components/schemas/Pet' } },
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/Pet' } },
          },
          required: true,
        },
        responses: {
          '400': {
            description: 'Invalid ID supplied',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': {
            description: 'Successful operation',
            content: {
              'application/xml': { schema: { $ref: '#/components/schemas/Pet' } },
              'application/json': { schema: { $ref: '#/components/schemas/Pet' } },
            },
          },
          '405': { description: 'Validation exception' },
          '404': { description: 'Pet not found' },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
      post: {
        tags: ['pet'],
        summary: 'Add a new pet to the store',
        description: 'Add a new pet to the store',
        operationId: 'addPet',
        requestBody: {
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Pet' } },
            'application/xml': { schema: { $ref: '#/components/schemas/Pet' } },
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/Pet' } },
          },
          required: true,
        },
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': {
            description: 'Successful operation',
            content: {
              'application/xml': { schema: { $ref: '#/components/schemas/Pet' } },
              'application/json': { schema: { $ref: '#/components/schemas/Pet' } },
            },
          },
          '405': { description: 'Invalid input' },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
    },
    '/pet/{petId}': {
      get: {
        tags: ['pet'],
        summary: 'Find pet by ID',
        description: 'Returns a single pet',
        operationId: 'getPetById',
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to return',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        ],
        responses: {
          '400': { description: 'Invalid ID supplied', content: {} },
          '404': { description: 'Pet not found' },
          '200': {
            description: 'successful operation',
            content: {
              'application/xml': { schema: { $ref: '#/components/schemas/Pet' } },
              'application/json': { schema: { $ref: '#/components/schemas/Pet' } },
            },
          },
        },
        security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
      },
      post: {
        tags: ['pet'],
        summary: 'Updates a pet in the store with form data',
        operationId: 'updatePetWithForm',
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet that needs to be updated',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          {
            name: 'name',
            in: 'query',
            description: 'Name of pet that needs to be updated',
            required: false,
            schema: { type: 'string' },
          },
          {
            name: 'status',
            in: 'query',
            description: 'Status of pet that needs to be updated',
            required: false,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '405': { description: 'Invalid input' },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
      delete: {
        tags: ['pet'],
        summary: 'Deletes a pet',
        operationId: 'deletePet',
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'Pet id to delete',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          { name: 'api_key', in: 'header', required: false, schema: { type: 'string' } },
        ],
        responses: {
          '400': {
            description: 'Invalid pet value',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': { description: 'OK' },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
    },
    '/pet/findByStatus': {
      get: {
        tags: ['pet'],
        summary: 'Finds Pets by status',
        description: 'Multiple status values can be provided with comma separated strings',
        operationId: 'findPetsByStatus',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description: 'Status values that need to be considered for filter',
            required: false,
            style: 'form',
            schema: {
              type: 'string',
              enum: ['available', 'pending', 'sold'],
              default: 'available',
            },
          },
        ],
        responses: {
          '400': {
            description: 'Invalid status value',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': {
            description: 'successful operation',
            content: {
              'application/xml': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
            },
          },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
    },
    '/pet/findByTags': {
      get: {
        tags: ['pet'],
        summary: 'Finds Pets by tags',
        description:
          'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
        operationId: 'findPetsByTags',
        parameters: [
          {
            name: 'tags',
            in: 'query',
            description: 'Tags to filter by',
            required: false,
            style: 'form',
            schema: { type: 'array', items: { type: 'string' } },
          },
        ],
        responses: {
          '400': { description: 'Invalid tag value', content: {} },
          '200': {
            description: 'successful operation',
            content: {
              'application/xml': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
            },
          },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
    },
    '/pet/{petId}/uploadImage': {
      post: {
        tags: ['pet'],
        summary: 'uploads an image',
        operationId: 'uploadFile',
        parameters: [
          {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to update',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          {
            name: 'additionalMetadata',
            in: 'query',
            description: 'Additional Metadata',
            required: false,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          content: { 'application/octet-stream': { schema: { type: 'string', format: 'binary' } } },
        },
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': {
            description: 'successful operation',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/ModelApiResponse' } },
            },
          },
        },
        security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
      },
    },
    '/store/order/{orderId}': {
      get: {
        tags: ['store'],
        summary: 'Find purchase order by ID',
        description:
          'For valid response try integer IDs with value <= 5 or > 10. Other values will generated exceptions',
        operationId: 'getOrderById',
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            description: 'ID of order that needs to be fetched',
            required: true,
            schema: { maximum: 5, minimum: 1, type: 'integer', format: 'int64' },
          },
        ],
        responses: {
          '400': { description: 'Invalid ID supplied', content: {} },
          '404': { description: 'Order not found' },
          '200': {
            description: 'successful operation',
            content: {
              'application/xml': { schema: { $ref: '#/components/schemas/Order' } },
              'application/json': { schema: { $ref: '#/components/schemas/Order' } },
            },
          },
        },
      },
      delete: {
        tags: ['store'],
        summary: 'Delete purchase order by ID',
        description:
          'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',
        operationId: 'deleteOrder',
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            description: 'ID of the order that needs to be deleted',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        ],
        responses: {
          '400': {
            description: 'Invalid ID supplied',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '404': { description: 'Order not found' },
        },
      },
    },
    '/store/inventory': {
      get: {
        tags: ['store'],
        summary: 'Returns pet inventories by status',
        description: 'Returns a map of status codes to quantities',
        operationId: 'getInventory',
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': {
            description: 'successful operation',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
        },
        security: [{ api_key: [] }],
      },
    },
    '/store/order': {
      post: {
        tags: ['store'],
        summary: 'Place an order for a pet',
        description: 'Place a new order in the store',
        operationId: 'placeOrder',
        requestBody: {
          content: {
            'application/xml': { schema: { $ref: '#/components/schemas/Order' } },
            'application/json': { schema: { $ref: '#/components/schemas/Order' } },
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/Order' } },
          },
          required: true,
        },
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '405': { description: 'Invalid input' },
          '200': {
            description: 'successful operation',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } },
          },
        },
      },
    },
    '/user/createWithArray': {
      post: {
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        operationId: 'createUsersWithArrayInput',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'array',
                description: 'List of user object',
                items: { $ref: '#/components/schemas/User' },
              },
            },
          },
          required: true,
        },
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '200': { description: 'successful operation' },
        },
      },
    },
    '/user/createWithList': {
      post: {
        tags: ['user'],
        summary: 'Creates list of users with given input array',
        description: 'Creates list of users with given input array',
        operationId: 'createUsersWithListInput',
        requestBody: {
          content: {
            'application/json': {
              schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            },
          },
          required: true,
        },
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          default: { description: 'successful operation' },
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/User' } },
              'application/xml': { schema: { $ref: '#/components/schemas/User' } },
            },
          },
        },
      },
    },
    '/user/{username}': {
      get: {
        tags: ['user'],
        summary: 'Get user by user name',
        operationId: 'getUserByName',
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be fetched. Use user1 for testing. ',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '400': { description: 'Invalid username supplied', content: {} },
          '200': {
            description: 'successful operation',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/User' } },
              'application/xml': { schema: { $ref: '#/components/schemas/User' } },
            },
          },
          '404': { description: 'User not found' },
        },
      },
      put: {
        tags: ['user'],
        summary: 'Update user',
        description: 'This can only be done by the logged in user.',
        operationId: 'updateUser',
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'name that need to be deleted',
            required: true,
            style: 'simple',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/User' } },
            'application/xml': { schema: { $ref: '#/components/schemas/User' } },
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/User' } },
          },
          required: true,
        },
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          default: { description: 'successful operation' },
        },
      },
      delete: {
        tags: ['user'],
        summary: 'Delete user',
        description: 'This can only be done by the logged in user.',
        operationId: 'deleteUser',
        parameters: [
          {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be deleted',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '400': {
            description: 'Invalid username supplied',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          '404': { description: 'User not found' },
        },
      },
    },
    '/user/login': {
      get: {
        tags: ['user'],
        summary: 'Logs user into the system',
        operationId: 'loginUser',
        parameters: [
          {
            name: 'username',
            in: 'query',
            description: 'The user name for login',
            required: true,
            schema: { type: 'string' },
          },
          {
            name: 'password',
            in: 'query',
            description: 'The password for login in clear text',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '400': { description: 'Invalid username/password supplied', content: {} },
          '200': {
            description: 'successful operation',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                style: 'simple',
                schema: { type: 'integer', format: 'int32' },
              },
              'X-Expires-After': {
                description: 'date in UTC when toekn expires',
                style: 'simple',
                schema: { type: 'string', format: 'date-time' },
              },
            },
            content: {
              'application/xml': { schema: { type: 'string' } },
              'application/json': { schema: { type: 'string' } },
            },
          },
        },
      },
    },
    '/user/logout': {
      get: {
        tags: ['user'],
        summary: 'Logs out current logged in user session',
        operationId: 'logoutUser',
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          default: { description: 'successful operation' },
        },
      },
    },
    '/user': {
      post: {
        tags: ['user'],
        summary: 'Create user',
        description: 'This can only be done by the logged in user.',
        operationId: 'createUser',
        requestBody: {
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/User' } },
            'application/xml': { schema: { $ref: '#/components/schemas/User' } },
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/User' } },
          },
          required: true,
        },
        responses: {
          '400': {
            description: 'Bad Request',
            content: {
              '*/*': { schema: { type: 'object', additionalProperties: { type: 'object' } } },
            },
          },
          default: {
            description: 'successful operation',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/User' } },
              'application/xml': { schema: { $ref: '#/components/schemas/User' } },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Category: {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int64', example: 1 },
          name: { type: 'string', example: 'Dogs' },
        },
        xml: { name: 'category' },
      },
      Pet: {
        required: ['name', 'photoUrls'],
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int64', example: 10 },
          name: { type: 'string', example: 'doggie' },
          category: { $ref: '#/components/schemas/Category' },
          photoUrls: { type: 'array', items: { type: 'string' } },
          tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
          status: {
            type: 'string',
            description: 'pet status in the store',
            enum: ['available', 'pending', 'sold'],
          },
        },
        xml: { name: 'pet' },
      },
      Tag: {
        type: 'object',
        properties: { id: { type: 'integer', format: 'int64' }, name: { type: 'string' } },
        xml: { name: 'tag' },
      },
      ModelApiResponse: {
        type: 'object',
        properties: {
          code: { type: 'integer', format: 'int32' },
          type: { type: 'string' },
          message: { type: 'string' },
        },
      },
      Pageable: {
        type: 'object',
        properties: {
          paged: { type: 'boolean' },
          unpaged: { type: 'boolean' },
          pageNumber: { type: 'integer', format: 'int32' },
          pageSize: { type: 'integer', format: 'int32' },
          sort: { $ref: '#/components/schemas/Sort' },
          offset: { type: 'integer', format: 'int64' },
        },
      },
      Sort: {
        type: 'object',
        properties: {
          unsorted: { type: 'boolean' },
          sorted: { type: 'boolean' },
          empty: { type: 'boolean' },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int64', example: 10 },
          petId: { type: 'integer', format: 'int64', example: 198772 },
          quantity: { type: 'integer', format: 'int32', example: 7 },
          shipDate: { type: 'string', format: 'date-time' },
          status: {
            type: 'string',
            description: 'Order Status',
            example: 'approved',
            enum: ['placed', 'approved', 'delivered'],
          },
          complete: { type: 'boolean' },
        },
        xml: { name: 'order' },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int64', example: 10 },
          username: { type: 'string', example: 'theUser' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'James' },
          email: { type: 'string', example: 'john@email.com' },
          password: { type: 'string', example: '12345' },
          phone: { type: 'string', example: '12345' },
          userStatus: { type: 'integer', description: 'User Status', format: 'int32', example: 1 },
        },
        xml: { name: 'user' },
      },
    },
    securitySchemes: {
      basicScheme: { type: 'http', scheme: 'basic' },
      petstore_auth: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://petstore3.swagger.io/oauth/authorize',
            scopes: { 'write:pets': 'modify pets in your account', 'read:pets': 'read your pets' },
          },
        },
      },
    },
  },
} as const;
