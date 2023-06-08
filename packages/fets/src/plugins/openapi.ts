/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { Response } from '../Response.js';
import swaggerUiHtml from '../swagger-ui-html.js';
import { StatusCode } from '../typed-fetch.js';
import { RouterPlugin } from '../types.js';
import { isZodSchema } from '../zod/types.js';

export interface SwaggerUIOpts {
  spec?: OpenAPIV3_1.Document;
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

export function useOpenAPI({
  oasEndpoint,
  swaggerUIEndpoint,
  swaggerUIOpts,
}: OpenAPIPluginOptions): RouterPlugin<any> {
  let paths: OpenAPIV3_1.PathsObject;
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
        const operation = pathObj[lowerCasedMethod] as OpenAPIV3_1.OperationObject;
        operation.operationId = operationId;
        operation.description = description;
        operation.tags = tags;
        if (schemas.responses) {
          for (const statusCode in schemas.responses) {
            let responseSchema = schemas.responses[statusCode as any as StatusCode];
            if (isZodSchema(responseSchema)) {
              responseSchema = zodToJsonSchema(responseSchema as any, {
                target: 'openApi3',
              });
            }
            operation.responses = operation.responses || {};
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
        if (schemas.request?.headers) {
          let headersSchema: any = schemas.request.headers;
          if (isZodSchema(headersSchema)) {
            headersSchema = zodToJsonSchema(headersSchema as any, {
              target: 'openApi3',
            });
          }
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
          let paramsSchema: any = schemas.request.params;
          if (isZodSchema(paramsSchema)) {
            paramsSchema = zodToJsonSchema(paramsSchema as any, {
              target: 'openApi3',
            });
          }
          for (const paramName in paramsSchema.properties) {
            const paramSchema: any = paramsSchema.properties[paramName];
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
          let queriesSchema: any = schemas.request.query;
          if (isZodSchema(queriesSchema)) {
            queriesSchema = zodToJsonSchema(queriesSchema as any, {
              target: 'openApi3',
            });
          }
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
          let requestJsonSchema: any = schemas.request.json;
          if (isZodSchema(requestJsonSchema)) {
            requestJsonSchema = zodToJsonSchema(requestJsonSchema as any, {
              target: 'openApi3',
            });
          }
          const requestBody = (operation.requestBody = (operation.requestBody || {}) as any);
          const requestBodyContent = (requestBody.content = (requestBody.content || {}) as any);
          requestBodyContent['application/json'] = {
            schema: requestJsonSchema,
          };
        }
        if (schemas.request?.formData) {
          const requestBody = (operation.requestBody = (operation.requestBody || {}) as any);
          const requestBodyContent = (requestBody.content = (requestBody.content || {}) as any);
          let requestFormDataSchema: any = schemas.request.formData;
          if (isZodSchema(requestFormDataSchema)) {
            requestFormDataSchema = zodToJsonSchema(requestFormDataSchema as any, {
              target: 'openApi3',
            });
          }
          requestBodyContent['multipart/form-data'] = {
            schema: requestFormDataSchema,
          };
        }
      }
    },
  };
}
