import { zodToJsonSchema } from 'zod-to-json-schema';
import { Response } from '../Response.js';
import swaggerUiHtml from '../swagger-ui-html.js';
import { StatusCode } from '../typed-fetch.js';
import {
  JSONSchema,
  OpenAPIDocument,
  OpenAPIOperationObject,
  OpenAPIPathObject,
  RouterPlugin,
} from '../types.js';
import { isZodSchema, ZodType } from '../zod/types.js';

export interface SwaggerUIOpts {
  spec?: OpenAPIDocument | undefined;
  dom_id?: string | undefined;
  displayOperationId?: boolean | undefined;
  tryItOutEnabled?: boolean | undefined;
  requestSnippetsEnabled?: boolean | undefined;
  displayRequestDuration?: boolean | undefined;
  defaultModelRendering?: 'model' | 'example' | 'schema' | undefined;
  defaultModelExpandDepth?: number | undefined;
  defaultModelsExpandDepth?: number | undefined;
  docExpansion?: 'none' | 'list' | 'full' | undefined;
  filter?: boolean | undefined;
  maxDisplayedTags?: number | undefined;
  showExtensions?: boolean | undefined;
  showCommonExtensions?: boolean | undefined;
  tagsSorter?: 'alpha' | undefined;
  operationsSorter?: 'alpha' | undefined;
  showTags?: boolean | undefined;
  showMutatedRequest?: boolean | undefined;
  oauth2RedirectUrl?: string | undefined;
  validatorUrl?: string | undefined;
  deepLinking?: boolean | undefined;
  presets?: any[] | undefined;
  plugins?: any[] | undefined;
  layout?: string | undefined;
}

export type OpenAPIPluginOptions = {
  oasEndpoint: string | false;
  swaggerUIEndpoint: string | false;
  swaggerUIOpts: SwaggerUIOpts;
};

export function useOpenAPI<TServerContext = any>({
  oasEndpoint,
  swaggerUIEndpoint,
  swaggerUIOpts,
}: OpenAPIPluginOptions): RouterPlugin<TServerContext> {
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
        const pathObj = (paths[pathForOAS] = paths[pathForOAS] || {});
        const lowerCasedMethod = method.toLowerCase();
        pathObj[lowerCasedMethod] = pathObj[lowerCasedMethod] || {};
        const operation = pathObj[lowerCasedMethod] as OpenAPIOperationObject;
        operation.operationId = operationId;
        operation.description = description;
        operation.tags = tags;
        if (schemas.responses) {
          for (const statusCode in schemas.responses) {
            let responseSchema: JSONSchema | ZodType | undefined =
              schemas.responses[statusCode as unknown as StatusCode];

            if (isZodSchema(responseSchema)) {
              // TODO: Possible bug. zodToJsonSchema is not returning the correct type.
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              responseSchema = zodToJsonSchema(responseSchema, {
                target: 'openApi3',
              });
            }
            operation.responses = operation.responses || {};
            operation.responses[statusCode] = {
              description: '',
              content: {
                'application/json': {
                  schema: responseSchema,
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
          let headersSchema = schemas.request.headers;

          if (isZodSchema(headersSchema)) {
            // TODO: Possible bug. zodToJsonSchema is not returning the correct type.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            headersSchema = zodToJsonSchema(headersSchema, {
              target: 'openApi3',
            });
          }
          if ('properties' in headersSchema) {
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
        }
        if (schemas.request?.params) {
          let paramsSchema = schemas.request.params;

          if (isZodSchema(paramsSchema)) {
            // TODO: Possible bug. zodToJsonSchema is not returning the correct type.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            paramsSchema = zodToJsonSchema(paramsSchema, {
              target: 'openApi3',
            });
          }

          if ('properties' in paramsSchema) {
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
        }
        if (schemas.request?.query) {
          let queriesSchema = schemas.request.query;
          if (isZodSchema(queriesSchema)) {
            // TODO: Possible bug. zodToJsonSchema is not returning the correct type.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            queriesSchema = zodToJsonSchema(queriesSchema, {
              target: 'openApi3',
            });
          }

          if ('properties' in queriesSchema) {
            for (const queryName in queriesSchema.properties) {
              const querySchema = queriesSchema.properties[queryName];
              operation.parameters = operation.parameters || [];
              operation.parameters.push({
                name: queryName,
                in: 'query',
                required: queriesSchema.required?.includes(queryName),
                schema: querySchema,
              });
            }
          }
        }
        if (schemas.request?.json) {
          let requestJsonSchema = schemas.request.json;

          if (isZodSchema(requestJsonSchema)) {
            // TODO: Possible bug. zodToJsonSchema is not returning the correct type.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            requestJsonSchema = zodToJsonSchema(requestJsonSchema, {
              target: 'openApi3',
            });
          }

          const requestBody = (operation.requestBody = operation.requestBody || {});
          requestBody.required = true;
          const requestBodyContent = (requestBody.content = requestBody.content || {});
          requestBodyContent['application/json'] = {
            schema: requestJsonSchema,
          };
        }
        if (schemas.request?.formData) {
          const requestBody = (operation.requestBody = operation.requestBody || {});
          requestBody.required = true;
          const requestBodyContent = (requestBody.content = requestBody.content || {});
          let requestFormDataSchema = schemas.request.formData;

          if (isZodSchema(requestFormDataSchema)) {
            // TODO: Possible bug. zodToJsonSchema is not returning the correct type.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            requestFormDataSchema = zodToJsonSchema(requestFormDataSchema, {
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
