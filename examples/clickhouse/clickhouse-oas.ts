/* eslint-disable */ export default {
  openapi: '3.0.1',
  info: {
    title: 'OpenAPI spec for ClickHouse Cloud',
    version: '1.0',
  },
  servers: [
    {
      url: 'https://api.clickhouse.cloud',
    },
  ],
  paths: {
    '/v1/organizations': {
      get: {
        summary: 'Get list of available organizations',
        description:
          'Returns a list with a single organization associated with the API key in the request.',
        parameters: [],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Organization',
                      },
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId': {
      get: {
        summary: 'Get organization details',
        description:
          'Returns details of a single organization. In order to get the details, the auth key must belong to the organization.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      $ref: '#/components/schemas/Organization',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        summary: 'Update organization details',
        description: 'Updates organization fields. Requires ADMIN auth key role.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization to update.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OrganizationPatchRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/Organization',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/services': {
      get: {
        summary: 'List of organization services',
        description: 'Returns a list of all services in the organization.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Service',
                      },
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create new service',
        description:
          'Creates a new service in the organization, and returns the current service state and a password to access the service. The service is started asynchronously.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that will own the service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServicePostRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/ServicePostResponse',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/services/:serviceId': {
      get: {
        summary: 'Get service details',
        description: 'Returns a service that belongs to the organization',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the requested service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      $ref: '#/components/schemas/Service',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        summary: 'Update service basic details.',
        description: 'Updates basic service details like service name or IP access list.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the service to update.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServicePatchRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/Service',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete service.',
        description:
          'Deletes the service. The service must be in stopped state and is deleted asynchronously after this method call.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the service to delete.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
      },
    },
    '/v1/organizations/:organizationId/services/:serviceId/state': {
      patch: {
        summary: 'Update service state.',
        description: 'Starts or stop service',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the service to update state.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServiceStatePatchRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/Service',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/services/:serviceId/scaling': {
      patch: {
        summary: 'Update service auto scaling settings.',
        description:
          'Updates minimum and maximum total memory limits and idle mode scaling behavior for the service. The memory settings are available only for "production" services and must be a multiple of 12 starting from 24GB.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the service to update scaling parameters.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServiceScalingPatchRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/Service',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/services/:serviceId/password': {
      patch: {
        summary: 'Update service password.',
        description: 'Sets a new password for the service',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the service.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the service to update password.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServicePasswordPatchRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/ServicePasswordPatchResponse',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/services/:serviceId/backups': {
      get: {
        summary: 'List of service backups',
        description: 'Returns a list of all backups for the service.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the backup.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the service the backup was created from.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Backup',
                      },
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/services/:serviceId/backups/:backupId': {
      get: {
        summary: 'Get backup details',
        description: 'Returns a single backup info.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the backup.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service ID',
            description: 'ID of the service the backup was created from.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Service backup ID',
            description: 'ID of the requested backup.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      $ref: '#/components/schemas/Backup',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/keys': {
      get: {
        summary: 'Get list of all keys',
        description: 'Returns a list of all keys in the organization.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/ApiKey',
                      },
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create key',
        description: 'Creates new API key.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that will own the key.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiKeyPostRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/ApiKeyPostResponse',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/keys/:keyId': {
      get: {
        summary: 'Get key details',
        description: 'Returns a single key details.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'API key ID',
            description: 'ID of the requested key.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      $ref: '#/components/schemas/ApiKey',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        summary: 'Update key',
        description: 'Updates API key properties.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the key.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'API key ID',
            description: 'ID of the key to update.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiKeyPatchRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/ApiKey',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete key',
        description:
          'Deletes API key. Only a key not used to authenticate the active request can be deleted.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that owns the key.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'API key ID',
            description: 'ID of the key to delete.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
      },
    },
    '/v1/organizations/:organizationId/members': {
      get: {
        summary: 'List organization members',
        description: 'Returns a list of all members in the organization.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Member',
                      },
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/members/:userId': {
      get: {
        summary: 'Get member details',
        description: 'Returns a single organization member details.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization the member is part of.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'User ID',
            description: 'ID of the requested user.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      $ref: '#/components/schemas/Member',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        summary: 'Update organization member.',
        description: 'Updates organization member role.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization the member is part of.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'User ID',
            description: 'ID of the user to patch',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MemberPatchRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/Member',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Remove an organization member',
        description: 'Removes a user from the organization',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'User ID',
            description: 'ID of the requested user.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
      },
    },
    '/v1/organizations/:organizationId/invitations': {
      get: {
        summary: 'List all invitations',
        description: 'Returns list of all organization invitations.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Invitation',
                      },
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create an invitation',
        description: 'Creates organization invitation.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization to invite a user to.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InvitationPostRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      $ref: '#/components/schemas/Invitation',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/invitations/:invitationId': {
      get: {
        summary: 'Get invitation details',
        description: 'Returns details for a single organization invitation.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Organization invitation ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      $ref: '#/components/schemas/Invitation',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete organization invitation',
        description: 'Deletes a single organization invitation.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the organization that has the invitation.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Organization invitation ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
      },
    },
    '/v1/organizations/:organizationId/activities': {
      get: {
        summary: 'List of organization activities',
        description: 'Returns a list of all organization activities.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
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
                    result: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Activity',
                      },
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/organizations/:organizationId/activities/:activityId': {
      get: {
        summary: 'Organization activity',
        description: 'Returns a single organization activity by ID.',
        parameters: [
          {
            in: 'path',
            name: 'Organization ID',
            description: 'ID of the requested organization.',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
          {
            in: 'path',
            name: 'Activity ID',
            description: 'ID of the requested activity.',
            schema: {
              type: 'string',
            },
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
                    result: {
                      $ref: '#/components/schemas/Activity',
                    },
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 200,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'The server cannot or will not process the request due to something that is perceived to be a client error.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'number',
                      description: 'HTTP status code.',
                      example: 400,
                    },
                    error: {
                      type: 'string',
                      description: 'Detailed error description.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ServiceEndpoint: {
        properties: {
          protocol: {
            type: 'string',
            description: "Endpoint protocol: 'https', 'nativesecure'.",
            enum: ['https', 'nativesecure'],
          },
          host: {
            type: 'string',
            description: 'Service host name',
          },
          port: {
            type: 'number',
            description: 'Numeric port',
          },
        },
      },
      IpAccessListEntry: {
        properties: {
          source: {
            type: 'string',
            description: 'IP or CIDR',
          },
          description: {
            type: 'string',
            description: 'IPv4 address or IPv4 CIDR to allow access from',
          },
        },
      },
      Service: {
        properties: {
          id: {
            type: 'string',
            description: 'Unique service ID.',
            format: 'uuid',
          },
          name: {
            type: 'string',
            description: 'Name of the service.',
          },
          provider: {
            type: 'string',
            description: 'Cloud provider',
            enum: ['aws', 'gcp'],
          },
          region: {
            type: 'string',
            description: 'Service region.',
            enum: [
              'ap-south-1',
              'ap-southeast-1',
              'eu-central-1',
              'eu-west-1',
              'us-east-1',
              'us-east-2',
              'us-west-2',
              'us-east1',
              'us-central1',
              'europe-west4',
              'asia-southeast1',
            ],
          },
          state: {
            type: 'string',
            description: 'Current state of the service.',
            enum: [
              'starting',
              'stopping',
              'terminating',
              'provisioning',
              'running',
              'stopped',
              'terminated',
              'degraded',
              'failed',
              'idle',
            ],
          },
          endpoints: {
            type: 'array',
            description: 'List of all service endpoints.',
            items: {
              $ref: '#/components/schemas/ServiceEndpoint',
            },
          },
          tier: {
            type: 'string',
            description:
              "Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard'. Production services scale, Development are fixed size.",
            enum: [
              'development',
              'production',
              'dedicated_high_mem',
              'dedicated_high_cpu',
              'dedicated_standard',
            ],
          },
          minTotalMemoryGb: {
            type: 'number',
            description:
              "Minimum total memory of all workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than 24.",
            minimum: 24,
            maximum: 720,
            multipleOf: 12,
            example: 48,
          },
          maxTotalMemoryGb: {
            type: 'number',
            description:
              "Maximum total memory of all workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than 360 for non paid services or 720 for paid services.",
            minimum: 24,
            maximum: 720,
            multipleOf: 12,
            example: 360,
          },
          idleScaling: {
            type: 'boolean',
            description:
              'When set to true the service is allowed to scale down to zero when idle. Always true for development services.',
          },
          idleTimeoutMinutes: {
            type: 'number',
            description: 'Set minimum idling timeout (in minutes). Must be >= 5 minutes.',
          },
          ipAccessList: {
            type: 'array',
            description: 'List of IP addresses allowed to access the service',
            items: {
              $ref: '#/components/schemas/IpAccessListEntry',
            },
          },
          createdAt: {
            type: 'string',
            description: 'Service creation timestamp. ISO-8601.',
            format: 'date-time',
          },
        },
      },
      IpAccessListPatch: {
        properties: {
          add: {
            type: 'array',
            description: 'Elements to add. Executed after "remove" part is processed.',
            items: {
              $ref: '#/components/schemas/IpAccessListEntry',
            },
          },
          remove: {
            type: 'array',
            description: 'Elements to remove. Executed before "add" part is processed.',
            items: {
              $ref: '#/components/schemas/IpAccessListEntry',
            },
          },
        },
      },
      Activity: {
        properties: {
          id: {
            type: 'string',
            description: 'Unique activity ID.',
          },
          createdAt: {
            type: 'string',
            description: 'Timestamp of the activity. ISO-8601.',
            format: 'date-time',
          },
          type: {
            type: 'string',
            description: 'Type of the activity.',
            enum: [
              'organization_update_name',
              'organization_invite_create',
              'organization_invite_delete',
              'organization_member_join',
              'organization_member_add',
              'organization_member_leave',
              'organization_member_delete',
              'organization_member_update_role',
              'key_create',
              'key_delete',
              'service_create',
              'service_start',
              'service_stop',
              'service_delete',
              'service_update_name',
              'service_update_ip_access_list',
              'service_update_autoscaling_memory',
              'service_update_autoscaling_idling',
              'service_update_password',
              'backup_delete',
            ],
          },
          actorType: {
            type: 'string',
            description: "Type of the actor: 'user', 'support', 'system', 'api'.",
            enum: ['user', 'support', 'system', 'api'],
          },
          actorId: {
            type: 'string',
            description: 'Unique actor ID.',
          },
          actorDetails: {
            type: 'string',
            description: 'Additional information about the actor.',
          },
          actorIpAddress: {
            type: 'string',
            description: "IP address of the actor. Defined for 'user' and 'api' actor types.",
          },
          organizationId: {
            type: 'string',
            description: 'Scope of the activity: organization ID this activity is related to.',
          },
          serviceId: {
            type: 'string',
            description: 'Scope of the activity: service ID this activity is related to.',
          },
        },
      },
      Backup: {
        properties: {
          id: {
            type: 'string',
            description: 'Unique backup ID.',
            format: 'uuid',
          },
          status: {
            type: 'string',
            description: "Status of the backup: 'done', 'error', 'in_progress'.",
            enum: ['done', 'error', 'in_progress'],
          },
          serviceId: {
            type: 'string',
            description: 'Name ',
          },
          startedAt: {
            type: 'string',
            description: 'Backup start timestamp. ISO-8601.',
            format: 'date-time',
          },
          finishedAt: {
            type: 'string',
            description: 'Backup finish timestamp. ISO-8601. Available only for finished backups',
            format: 'date-time',
          },
        },
      },
      Organization: {
        properties: {
          id: {
            type: 'string',
            description: 'Unique organization ID.',
            format: 'uuid',
          },
          createdAt: {
            type: 'string',
            description: 'The timestamp the organization was created. ISO-8601.',
            format: 'date-time',
          },
          name: {
            type: 'string',
            description: 'Name of the organization.',
          },
        },
      },
      Member: {
        properties: {
          userId: {
            type: 'string',
            description:
              'Unique user ID. If a user is a member in multiple organizations this ID will stay the same.',
          },
          name: {
            type: 'string',
            description: 'Name of the member as set a personal user profile.',
          },
          email: {
            type: 'string',
            description: 'Email of the member as set in personal user profile.',
            format: 'email',
          },
          role: {
            type: 'string',
            description: 'Role of the member in the organization.',
            enum: ['admin', 'developer'],
          },
          joinedAt: {
            type: 'string',
            description: 'Timestamp the member joined the organization. ISO-8601.',
            format: 'date-time',
          },
        },
      },
      Invitation: {
        properties: {
          role: {
            type: 'string',
            description: 'Role of the member in the organization.',
            enum: ['admin', 'developer'],
          },
          id: {
            type: 'string',
            description: 'Unique invitation ID.',
            format: 'uuid',
          },
          email: {
            type: 'string',
            description:
              'Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.',
            format: 'email',
          },
          createdAt: {
            type: 'string',
            description: 'Invitation creation timestamp. ISO-8601.',
            format: 'date-time',
          },
          expireAt: {
            type: 'string',
            description: 'Timestamp the invitation expires. ISO-8601.',
            format: 'date-time',
          },
        },
      },
      ApiKey: {
        properties: {
          id: {
            type: 'string',
            description: 'Unique API key ID.',
            format: 'uuid',
          },
          name: {
            type: 'string',
            description: 'Name of the key',
          },
          state: {
            type: 'string',
            description: "State of the key: 'enabled', 'disabled'.",
            enum: ['enabled', 'disabled'],
          },
          roles: {
            type: 'array',
            description: 'List of roles assigned to the key. Contains at least 1 element.',
            items: {
              type: 'string',
              enum: ['admin', 'developer'],
            },
          },
          keySuffix: {
            type: 'string',
            description: 'Last 4 letters of the key.',
          },
          createdAt: {
            type: 'string',
            description: 'Timestamp the key was created. ISO-8601.',
            format: 'date-time',
          },
          expireAt: {
            type: 'string',
            description:
              'Timestamp the key expires. If not present or is empty the key never expires. ISO-8601.',
            format: 'date-time',
          },
          usedAt: {
            type: 'string',
            description:
              'Timestamp the key was used last time. If not present the key was never used. ISO-8601.',
            format: 'date-time',
          },
        },
      },
      ApiKeyHashData: {
        properties: {
          keyIdHash: {
            type: 'string',
            description: 'Hash of the key ID. ',
          },
          keyIdSuffix: {
            type: 'string',
            description:
              "Last 4 digits of the key ID. Algorithm: sha256sum | tr -d '-' | xxd -r -p | base64",
          },
          keySecretHash: {
            type: 'string',
            description:
              "Hash of the key secret. Algorithm: sha256sum | tr -d '-' | xxd -r -p | base64",
          },
        },
      },
      OrganizationPatchRequest: {
        properties: {
          name: {
            type: 'string',
            description: 'Name of the organization.',
          },
        },
      },
      ServicePostRequest: {
        properties: {
          name: {
            type: 'string',
            description: 'Name of the service.',
          },
          provider: {
            type: 'string',
            description: 'Cloud provider',
            enum: ['aws', 'gcp'],
          },
          region: {
            type: 'string',
            description: 'Service region.',
            enum: [
              'ap-south-1',
              'ap-southeast-1',
              'eu-central-1',
              'eu-west-1',
              'us-east-1',
              'us-east-2',
              'us-west-2',
              'us-east1',
              'us-central1',
              'europe-west4',
              'asia-southeast1',
            ],
          },
          tier: {
            type: 'string',
            description:
              "Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard'. Production services scale, Development are fixed size.",
            enum: [
              'development',
              'production',
              'dedicated_high_mem',
              'dedicated_high_cpu',
              'dedicated_standard',
            ],
          },
          ipAccessList: {
            type: 'array',
            description: 'List of IP addresses allowed to access the service',
            items: {
              $ref: '#/components/schemas/IpAccessListEntry',
            },
          },
          minTotalMemoryGb: {
            type: 'number',
            description:
              "Minimum total memory of all workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than 24.",
            minimum: 24,
            maximum: 720,
            multipleOf: 12,
            example: 48,
          },
          maxTotalMemoryGb: {
            type: 'number',
            description:
              "Maximum total memory of all workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than 360 for non paid services or 720 for paid services.",
            minimum: 24,
            maximum: 720,
            multipleOf: 12,
            example: 360,
          },
          idleScaling: {
            type: 'boolean',
            description:
              'When set to true the service is allowed to scale down to zero when idle. Always true for development services.',
          },
          idleTimeoutMinutes: {
            type: 'number',
            description: 'Set minimum idling timeout (in minutes). Must be >= 5 minutes.',
          },
          backupId: {
            type: 'string',
            description:
              'Optional backup ID used as an initial state for the new service. When used the region and the tier of the new instance must be the same as the values of the original instance.',
            format: 'uuid',
          },
        },
      },
      ServicePostResponse: {
        properties: {
          service: {
            $ref: '#/components/schemas/Service',
          },
          password: {
            type: 'string',
            description: 'Password for the newly created service.',
          },
        },
      },
      ServicePatchRequest: {
        properties: {
          name: {
            type: 'string',
            description: 'Name of the service.',
          },
          ipAccessList: {
            $ref: '#/components/schemas/IpAccessListPatch',
          },
        },
      },
      ServiceStatePatchRequest: {
        properties: {
          command: {
            type: 'string',
            description: "Command to change the state: 'start', 'stop'.",
            enum: ['start', 'stop'],
          },
        },
      },
      ServiceScalingPatchRequest: {
        properties: {
          minTotalMemoryGb: {
            type: 'number',
            description:
              "Minimum total memory of all workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than 24.",
            minimum: 24,
            maximum: 720,
            multipleOf: 12,
            example: 48,
          },
          maxTotalMemoryGb: {
            type: 'number',
            description:
              "Maximum total memory of all workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than 360 for non paid services or 720 for paid services.",
            minimum: 24,
            maximum: 720,
            multipleOf: 12,
            example: 360,
          },
          idleScaling: {
            type: 'boolean',
            description:
              'When set to true the service is allowed to scale down to zero when idle. Always true for development services.',
          },
          idleTimeoutMinutes: {
            type: 'number',
            description: 'Set minimum idling timeout (in minutes). Must be >= 5 minutes.',
          },
        },
      },
      ServicePasswordPatchRequest: {
        properties: {
          newPasswordHash: {
            type: 'string',
            description:
              "Optional password hash. Used to avoid password transmission over network. If not provided a new password is generated and is provided in the response. Otherwise this hash is used. Algorithm: sha256sum | tr -d '-' | xxd -r -p | base64",
          },
        },
      },
      ServicePasswordPatchResponse: {
        properties: {
          password: {
            type: 'string',
            description:
              "New service password. Provided only if there was no 'newPasswordHash' in the request",
          },
        },
      },
      ApiKeyPostRequest: {
        properties: {
          name: {
            type: 'string',
            description: 'Name of the key.',
          },
          expireAt: {
            type: 'string',
            description:
              'Timestamp the key expires. If not present or is empty the key never expires. ISO-8601.',
            format: 'date-time',
          },
          state: {
            type: 'string',
            description:
              "Initial state of the key: 'enabled', 'disabled'. If not provided the new key will be 'enabled'.",
            enum: ['enabled', 'disabled'],
          },
          hashData: {
            $ref: '#/components/schemas/ApiKeyHashData',
          },
          roles: {
            type: 'array',
            description: 'List of roles assigned to the key. Contains at least 1 element.',
            items: {
              type: 'string',
              enum: ['admin', 'developer'],
            },
          },
        },
      },
      ApiKeyPostResponse: {
        properties: {
          key: {
            $ref: '#/components/schemas/ApiKey',
          },
          keyId: {
            type: 'string',
            description:
              "Generated key ID. Provided only if there was no 'hashData' in the request.",
          },
          keySecret: {
            type: 'string',
            description:
              "Generated key secret. Provided only if there was no 'hashData' in the request.",
          },
        },
      },
      ApiKeyPatchRequest: {
        properties: {
          name: {
            type: 'string',
            description: 'Name of the key',
          },
          roles: {
            type: 'array',
            description: 'List of roles assigned to the key. Contains at least 1 element.',
            items: {
              type: 'string',
              enum: ['admin', 'developer'],
            },
          },
          expireAt: {
            type: 'string',
            description:
              'Timestamp the key expires. If not present or is empty the key never expires. ISO-8601.',
            format: 'date-time',
          },
          state: {
            type: 'string',
            description: "State of the key: 'enabled', 'disabled'.",
            enum: ['enabled', 'disabled'],
          },
        },
      },
      MemberPatchRequest: {
        properties: {
          role: {
            type: 'string',
            description: 'Role of the member in the organization.',
            enum: ['admin', 'developer'],
          },
        },
      },
      InvitationPostRequest: {
        properties: {
          email: {
            type: 'string',
            description:
              'Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.',
            format: 'email',
          },
          role: {
            type: 'string',
            description: 'Role of the member in the organization.',
            enum: ['admin', 'developer'],
          },
        },
      },
    },
  },
} as const;
