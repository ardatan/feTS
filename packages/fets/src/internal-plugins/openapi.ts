/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import zodToJsonSchema from 'zod-to-json-schema';
import { Response } from '../Response.js';
import swaggerUiHtml from '../swagger-ui-html.js';
import { RouterPlugin } from '../types.js';
import { isZodSchema } from '../zod/types.js';

export type OpenAPIPluginOptions = {
  oasEndpoint: string | false;
  swaggerUIEndpoint: string | false;
  baseOas: OpenAPIV3_1.Document;
};

export function useOpenAPI({
  oasEndpoint,
  swaggerUIEndpoint,
  baseOas: oas,
}: OpenAPIPluginOptions): RouterPlugin<any> {
  const paths: OpenAPIV3_1.PathsObject = (oas.paths ||= {});
  return {
    onRouterInit(router) {
      if (oasEndpoint) {
        router.route({
          method: 'GET',
          path: oasEndpoint,
          handler: () => Response.json(oas),
        });
      }
      if (swaggerUIEndpoint) {
        router.route({
          method: 'GET',
          path: swaggerUIEndpoint,
          handler: () =>
            new Response(swaggerUiHtml.replace('__OAS__', JSON.stringify(oas)), {
              headers: {
                'Content-Type': 'text/html',
              },
            }),
        });
      }
    },
    onRoute({ method, path, operationId, description, schemas }) {
      if (schemas) {
        let pathForOAS = path.replace(/:([^/]+)/g, '{$1}');
        if (!pathForOAS.startsWith('/')) {
          pathForOAS = `/${pathForOAS}`;
        }
        const pathObj = (paths[pathForOAS] = paths[pathForOAS] || {});
        const lowerCasedMethod = method.toLowerCase();
        pathObj[lowerCasedMethod] = (pathObj[lowerCasedMethod] || {}) as any;
        const operation = pathObj[lowerCasedMethod] as OpenAPIV3_1.OperationObject;
        operation.operationId = operationId;
        operation.description = description;
        if (schemas.responses) {
          for (const statusCode in schemas.responses) {
            let responseSchema = schemas.responses[statusCode as any as number];
            if (isZodSchema(responseSchema)) {
              responseSchema = zodToJsonSchema(responseSchema);
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
        }
        if (schemas.request?.headers) {
          let headersSchema: any = schemas.request.headers;
          if (isZodSchema(headersSchema)) {
            headersSchema = zodToJsonSchema(headersSchema);
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
            paramsSchema = zodToJsonSchema(paramsSchema);
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
            queriesSchema = zodToJsonSchema(queriesSchema);
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
            requestJsonSchema = zodToJsonSchema(requestJsonSchema);
          }
          operation.requestBody = {
            content: {
              'application/json': {
                schema: requestJsonSchema,
              },
            },
          };
        }
        if (schemas.request?.formData) {
          operation.requestBody = {
            content: {
              'multipart/form-data': {
                schema: schemas.request.formData as any,
              },
            },
          };
        }
      }
    },
  };
}
