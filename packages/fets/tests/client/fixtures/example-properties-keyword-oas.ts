// Test fixture for schemas that have a property named "properties"
// See: https://github.com/ardatan/feTS/issues/XXX
export default {
  openapi: '3.0.1',
  info: {
    title: 'Properties keyword test',
    version: '1.0.0',
  },
  components: {
    schemas: {
      CheckDeviceResponse: {
        title: 'CheckDeviceResponse',
        type: 'object',
        properties: {
          expiryDate: {
            type: 'string',
            description: 'expiryDate',
            format: 'date-time',
          },
          properties: {
            type: 'object',
            additionalProperties: { type: 'string' },
          },
          sessionValidated: {
            type: 'boolean',
          },
        },
      },
    },
  },
  paths: {
    '/check-device': {
      get: {
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CheckDeviceResponse',
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
