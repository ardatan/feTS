/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import { Response } from '../Response.js';
import swaggerUiHtml from '../swagger-ui-html.js';
import { RouterPlugin } from '../types.js';

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
              status: 200,
            }),
        });
      }
    },
    onRoute({ method, path, operationId, description, schemas }) {
      if (schemas) {
        const pathForOAS = path.replace(/:([^/]+)/g, '{$1}');
        const pathObj = (paths[pathForOAS] = paths[pathForOAS] || {});
        const lowerCasedMethod = method.toLowerCase();
        pathObj[lowerCasedMethod] = (pathObj[lowerCasedMethod] || {}) as any;
        const operation = pathObj[lowerCasedMethod] as OpenAPIV3_1.OperationObject;
        operation.operationId = operationId;
        operation.description = description;
        if (schemas.responses) {
          for (const statusCode in schemas.responses) {
            const response = schemas.responses[statusCode as any as number];
            operation.responses = operation.responses || {};
            operation.responses[statusCode] = {
              description: '',
              content: {
                'application/json': {
                  schema: response as any,
                },
              },
            };
          }
        }
        if (
          schemas.request?.headers &&
          typeof schemas.request.headers === 'object' &&
          'properties' in schemas.request.headers
        ) {
          for (const headerName in schemas.request.headers.properties) {
            const headersSchema = schemas.request.headers.properties[headerName];
            operation.parameters = operation.parameters || [];
            operation.parameters.push({
              name: headerName,
              in: 'header',
              required: schemas.request.headers.required?.includes(headerName),
              schema: headersSchema as any,
            });
          }
        }
        if (
          schemas.request?.params &&
          typeof schemas.request.params === 'object' &&
          'properties' in schemas.request.params
        ) {
          for (const paramName in schemas.request.params.properties) {
            const paramSchema = schemas.request.params.properties[paramName];
            operation.parameters = operation.parameters || [];
            operation.parameters.push({
              name: paramName,
              in: 'path',
              required: schemas.request.params.required?.includes(paramName),
              schema: paramSchema as any,
            });
          }
        }
        if (
          schemas.request?.query &&
          typeof schemas.request.query === 'object' &&
          'properties' in schemas.request.query
        ) {
          for (const paramName in schemas.request.query.properties) {
            const paramSchema = schemas.request.query.properties[paramName];
            operation.parameters = operation.parameters || [];
            operation.parameters.push({
              name: paramName,
              in: 'query',
              required: schemas.request.query.required?.includes(paramName),
              schema: paramSchema as any,
            });
          }
        }
        if (schemas.request?.json) {
          operation.requestBody = {
            content: {
              'application/json': {
                schema: schemas.request.json as any,
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
