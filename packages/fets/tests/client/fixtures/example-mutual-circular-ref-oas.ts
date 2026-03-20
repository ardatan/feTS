/**
 * Simplified schema that reproduces the mutual recursion pattern found in large OpenAPI specs
 * such as Argo Workflows: Template → DAGTemplate → DAGTask → Template (circular).
 *
 * Before the fix, using OASModel with such schemas caused TypeScript error TS2615:
 * "Type of property 'X' circularly references itself in mapped type 'Y'"
 */
export default {
  openapi: '3.0.3',
  info: {
    version: '1',
    title: 'Mutual Circular Ref - OpenAPI 3.0',
    description: 'This is a sample of mutually recursive schemas (Argo-like pattern)',
    termsOfService: 'http://swagger.io/terms/',
  },
  paths: {
    '/workflow': {
      get: {
        tags: ['workflow'],
        summary: 'Get workflow',
        description: '',
        operationId: 'getWorkflow',
        responses: {
          '200': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Template',
                },
              },
            },
          },
          '404': {
            description: 'Workflow not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Template: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          dag: {
            $ref: '#/components/schemas/DAGTemplate',
          },
        },
      },
      DAGTemplate: {
        type: 'object',
        properties: {
          tasks: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/DAGTask',
            },
          },
        },
      },
      DAGTask: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          template: {
            $ref: '#/components/schemas/Template',
          },
        },
      },
    },
  },
} as const;
