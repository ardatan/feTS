import { z } from 'zod';
import {
  HTTPMethod,
  TypedRequest,
  TypedResponse,
  TypedResponseWithJSONStatusMap,
} from '../typed-fetch';
import { AddRouteWithTypesOpts, StatusCodeMap } from '../types';

export type RouteZodSchemas = {
  request?: {
    json?: z.ZodType;
    formData?: z.ZodType;
    headers?: z.ZodType;
    params?: z.ZodType;
    query?: z.ZodType;
  };
  responses?: StatusCodeMap<z.ZodType>;
};

export type TypedRequestFromRouteZodSchemas<
  TRouteZodSchemas extends RouteZodSchemas,
  TMethod extends HTTPMethod,
> = TRouteZodSchemas extends { request: Required<RouteZodSchemas>['request'] }
  ? TypedRequest<
      TRouteZodSchemas['request'] extends { json: z.ZodType }
        ? z.infer<TRouteZodSchemas['request']['json']>
        : any,
      TRouteZodSchemas['request'] extends { formData: z.ZodType }
        ? z.infer<TRouteZodSchemas['request']['formData']>
        : Record<string, FormDataEntryValue>,
      TRouteZodSchemas['request'] extends { headers: z.ZodType }
        ? z.infer<TRouteZodSchemas['request']['headers']>
        : Record<string, string>,
      TMethod,
      TRouteZodSchemas['request'] extends { query: z.ZodType }
        ? z.infer<TRouteZodSchemas['request']['query']>
        : Record<string, string | string[]>,
      TRouteZodSchemas['request'] extends { params: z.ZodType }
        ? z.infer<TRouteZodSchemas['request']['params']>
        : Record<string, any>
    >
  : TypedRequest<any, Record<string, FormDataEntryValue>, Record<string, string>, TMethod>;

export type TypedResponseFromRouteZodSchemas<TRouteZodSchemas extends RouteZodSchemas> =
  TRouteZodSchemas extends { responses: StatusCodeMap<z.ZodType> }
    ? TypedResponseWithJSONStatusMap<{
        [TStatusCode in keyof TRouteZodSchemas['responses']]: TRouteZodSchemas['responses'][TStatusCode] extends z.ZodType
          ? z.infer<TRouteZodSchemas['responses'][TStatusCode]>
          : never;
      }>
    : TypedResponse;

export type AddRouteWithZodSchemasOpts<
  TServerContext,
  TRouteZodSchemas extends RouteZodSchemas,
  TMethod extends HTTPMethod,
  TPath extends string,
  TTypedRequest extends TypedRequestFromRouteZodSchemas<TRouteZodSchemas, TMethod>,
  TTypedResponse extends TypedResponseFromRouteZodSchemas<TRouteZodSchemas>,
  > = {
  schemas: TRouteZodSchemas;
} & AddRouteWithTypesOpts<TServerContext, TMethod, TPath, TTypedRequest, TTypedResponse>;

export function isZodSchema(value: any): value is z.ZodType {
  return value && typeof value === 'object' && typeof value.parse === 'function';
}
