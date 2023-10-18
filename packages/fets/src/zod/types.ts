import type { ZodSchema } from 'zod';
import {
  HTTPMethod,
  TypedRequest,
  TypedResponse,
  TypedResponseWithJSONStatusMap,
} from '../typed-fetch';
import { AddRouteWithTypesOpts, StatusCodeMap } from '../types';

export type ZodType = ZodSchema; // { _output: any; safeParse(input: any): any };
export type InferZodType<T extends ZodType> = T['_output'];

export type RouteZodSchemas = {
  request?:
    | {
        json?: ZodType | undefined;
        formData?: ZodType | undefined;
        headers?: ZodType | undefined;
        params?: ZodType | undefined;
        query?: ZodType | undefined;
      }
    | undefined;
  responses?: StatusCodeMap<ZodType> | undefined;
};

export type TypedRequestFromRouteZodSchemas<
  TRouteZodSchemas extends RouteZodSchemas,
  TMethod extends HTTPMethod,
> = TRouteZodSchemas extends { request: RouteZodSchemas['request'] }
  ? TypedRequest<
      TRouteZodSchemas['request'] extends { json: ZodType }
        ? InferZodType<TRouteZodSchemas['request']['json']>
        : any,
      TRouteZodSchemas['request'] extends { formData: ZodType }
        ? InferZodType<TRouteZodSchemas['request']['formData']>
        : Record<string, FormDataEntryValue | undefined>,
      TRouteZodSchemas['request'] extends { headers: ZodType }
        ? InferZodType<TRouteZodSchemas['request']['headers']>
        : Record<string, string>,
      TMethod,
      TRouteZodSchemas['request'] extends { query: ZodType }
        ? InferZodType<TRouteZodSchemas['request']['query']>
        : Record<string, string | string[]>,
      TRouteZodSchemas['request'] extends { params: ZodType }
        ? InferZodType<TRouteZodSchemas['request']['params']>
        : Record<string, any>
    >
  : TypedRequest<
      any,
      Record<string, FormDataEntryValue | undefined>,
      Record<string, string>,
      TMethod
    >;

export type TypedResponseFromRouteZodSchemas<TRouteZodSchemas extends RouteZodSchemas> =
  TRouteZodSchemas extends { responses: StatusCodeMap<ZodType> }
    ? TypedResponseWithJSONStatusMap<{
        [TStatusCode in keyof TRouteZodSchemas['responses']]: TRouteZodSchemas['responses'][TStatusCode] extends ZodType
          ? InferZodType<TRouteZodSchemas['responses'][TStatusCode]>
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

export function isZodSchema(value: any): value is ZodType {
  return value && typeof value === 'object' && typeof value.safeParse === 'function';
}
