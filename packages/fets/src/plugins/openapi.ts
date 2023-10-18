import { Response } from '../Response.js';
import swaggerUiHtml from '../swagger-ui-html.js';
import { StatusCode } from '../typed-fetch.js';
import {
  OpenAPIDocument,
  OpenAPIOperationObject,
  OpenAPIPathObject,
  RouterPlugin,
} from '../types.js';

export interface SwaggerUIOpts {
  spec?: OpenAPIDocument;
  dom_id?: string;
  displayOperationId?: boolean;
  tryItOutEnabled?: boolean;
  requestSnippetsEnabled?: boolean;
  displayRequestDuration?: boolean;
  defaultModelRendering?: 'model' | 'example' | 'schema';
  defaultModelExpandDepth?: number;
  defaultModelsExpandDepth?: number;
  docExpansion?: 'none' | 'list' | 'full';
  filter?: boolean;
  maxDisplayedTags?: number;
  showExtensions?: boolean;
  showCommonExtensions?: boolean;
  tagsSorter?: 'alpha';
  operationsSorter?: 'alpha';
  showTags?: boolean;
  showMutatedRequest?: boolean;
  oauth2RedirectUrl?: string;
  validatorUrl?: string;
  deepLinking?: boolean;
  presets?: any[];
  plugins?: any[];
  layout?: string;
}

export type OpenAPIPluginOptions = {
  oasEndpoint: string | false;
  swaggerUIEndpoint: string | false;
  swaggerUIOpts: SwaggerUIOpts;
};

const requestValidationErrorSchema = {
  title: 'RequestValidationError',
  type: 'object',
  properties: {
    path: {
      type: 'string',
    },
    value: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
        {
          type: 'boolean',
        },
        {
          type: 'array',
        },
        {
          type: 'object',
        },
      ],
    },
    message: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

export function useOpenAPI({
  oasEndpoint,
  swaggerUIEndpoint,
  swaggerUIOpts,
}: OpenAPIPluginOptions): RouterPlugin<any> {
  let paths: Record<string, OpenAPIPathObject>;
  return {
    onRouterInit(router) {
      paths = router.openAPIDocument.paths = router.openAPIDocument.paths || {};
      if (oasEndpoint) {
        router.route({
          method: 'GET',
          path: oasEndpoint,
          internal: true,
          handler: () => Response.json(router.openAPIDocument),
        });
      }
      if (swaggerUIEndpoint) {
        router.route({
          method: 'GET',
          path: swaggerUIEndpoint,
          internal: true,
          handler: () =>
            new Response(
              swaggerUiHtml.replace(
                '__SWAGGER_UI_OPTIONS__',
                JSON.stringify({
                  spec: router.openAPIDocument,
                  dom_id: '#swagger-ui',
                  displayOperationId: true,
                  tryItOutEnabled: true,
                  requestSnippetsEnabled: true,
                  displayRequestDuration: true,
                  defaultModelRendering: 'model',
                  defaultModelExpandDepth: 3,
                  defaultModelsExpandDepth: 3,
                  ...swaggerUIOpts,
                }),
              ),
              {
                headers: {
                  'Content-Type': 'text/html',
                },
              },
            ),
        });
      }
    },
    onRoute({ method, path, operationId, description, tags, schemas }) {
      if (schemas) {
        let pathForOAS = path.replace(/:([^/]+)/g, '{$1}');
        if (!pathForOAS.startsWith('/')) {
          pathForOAS = `/${pathForOAS}`;
        }
        const pathObj: any = (paths[pathForOAS] = paths[pathForOAS] || {});
        const lowerCasedMethod = method.toLowerCase();
        pathObj[lowerCasedMethod] = pathObj[lowerCasedMethod] || {};
        const operation = pathObj[lowerCasedMethod] as OpenAPIOperationObject;
        operation.operationId = operationId;
        operation.description = description;
        operation.tags = tags;
        let isRequestValidated = false;
        if (schemas.request?.headers) {
          isRequestValidated = true;
          const headersSchema = schemas.request.headers;
          for (const headerName in headersSchema.properties) {
            const headerSchema = headersSchema.properties[headerName];
            operation.parameters = operation.parameters || [];
            operation.parameters.push({
              name: headerName,
              in: 'header',
              required: headersSchema.required?.includes(headerName),
              schema: headerSchema,
            });
          }
        }
        if (schemas.request?.params) {
          isRequestValidated = true;
          const paramsSchema = schemas.request.params;
          for (const paramName in paramsSchema.properties) {
            const paramSchema = paramsSchema.properties[paramName];
            operation.parameters = operation.parameters || [];
            operation.parameters.push({
              name: paramName,
              in: 'path',
              required: paramsSchema.required?.includes(paramName),
              schema: paramSchema,
            });
          }
        }
        if (schemas.request?.query) {
          const queriesSchema = schemas.request.query;
          for (const queryName in queriesSchema.properties) {
            const querySchema = queriesSchema.properties[queryName];
            operation.parameters = operation.parameters || [];
            operation.parameters.push({
              name: queryName,
              in: 'query',
              required: queriesSchema.required?.includes(queryName),
              schema: querySchema as any,
            });
          }
        }
        if (schemas.request?.json) {
          isRequestValidated = true;
          const requestJsonSchema = schemas.request.json;
          const requestBody = (operation.requestBody = (operation.requestBody || {}) as any);
          requestBody.required = true;
          const requestBodyContent = (requestBody.content = (requestBody.content || {}) as any);
          requestBodyContent['application/json'] = {
            schema: requestJsonSchema,
          };
        }
        if (schemas.request?.formData) {
          isRequestValidated = true;
          const requestBody = (operation.requestBody = (operation.requestBody || {}) as any);
          requestBody.required = true;
          const requestBodyContent = (requestBody.content = (requestBody.content || {}) as any);
          const requestFormDataSchema = schemas.request.formData;
          requestBodyContent['multipart/form-data'] = {
            schema: requestFormDataSchema,
          };
        }
        if (schemas.responses) {
          for (const statusCode in schemas.responses) {
            const responseSchema = schemas.responses[statusCode as any as StatusCode];
            operation.responses ||= {};
            operation.responses[statusCode] = {
              description: '',
              content: {
                'application/json': {
                  schema: responseSchema as any,
                },
              },
            };
          }
        } else {
          operation.responses = {
            default: {
              description: '',
            },
          };
        }
        if (isRequestValidated && !operation.responses?.[400]) {
          operation.responses ||= {};
          operation.responses[400] = {
            description: 'Request validation failed',
            content: {
              'application/json': {
                schema: requestValidationErrorSchema,
              },
            },
          };
        }
      }
    },
  };
}
