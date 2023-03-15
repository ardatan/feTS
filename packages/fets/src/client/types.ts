/* eslint-disable camelcase */
import { OpenAPIV3_1 } from 'openapi-types';
import { HTTPMethod, TypedResponse } from '../typed-fetch.js';
import { FromSchema, JSONSchema } from '../types.js';

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Mutable<Type[Key]>;
};

export type OASPathMap<TOAS extends OpenAPIV3_1.Document> = TOAS['paths'];
export type OASMethodMap<
  TOAS extends OpenAPIV3_1.Document,
  TPath extends keyof OASPathMap<TOAS>,
> = OASPathMap<TOAS>[TPath];
export type OASStatusMap<
  TOAS extends OpenAPIV3_1.Document,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
> = OASMethodMap<TOAS, TPath>[TMethod] extends { responses: any }
  ? OASMethodMap<TOAS, TPath>[TMethod]['responses']
  : never;
export type OASJSONResponseSchema<
  TOAS extends OpenAPIV3_1.Document,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
  TStatus extends keyof OASStatusMap<TOAS, TPath, TMethod>,
> = OASStatusMap<TOAS, TPath, TMethod>[TStatus]['content']['application/json']['schema'];

type ToNumber<T extends string, R extends any[] = []> = T extends `${R['length']}`
  ? R['length']
  : ToNumber<T, [1, ...R]>;

export type OASResponse<
  TOAS extends OpenAPIV3_1.Document,
  TPath extends keyof TOAS['paths'],
  TMethod extends keyof TOAS['paths'][TPath],
> = {
  [TStatus in keyof OASStatusMap<TOAS, TPath, TMethod>]: TypedResponse<
    FromSchema<OASJSONResponseSchema<TOAS, TPath, TMethod, TStatus> & TOAS>,
    Record<string, string>,
    TStatus extends number
      ? TStatus
      : TStatus extends 'default'
      ? number
      : TStatus extends `${number}${number}${number}`
      ? ToNumber<TStatus>
      : never
  >;
}[keyof OASStatusMap<TOAS, TPath, TMethod>];

export type OASParamMap<
  TParameters extends { name: string; schema: JSONSchema }[],
  TParamType extends string,
> = {
  [TIndex in keyof TParameters]: {
    [TName in TParameters[TIndex]['name']]: TParameters[TIndex] extends { in: TParamType }
      ? FromSchema<TParameters[TIndex]['schema']>
      : never;
  };
}[keyof TParameters];

export type OASClient<TOAS extends OpenAPIV3_1.Document> = {
  [TPath in keyof OASPathMap<TOAS>]: {
    [TMethod in keyof OASMethodMap<TOAS, TPath>]: (
      requestParams?: OASRequestParams<TOAS, TPath, TMethod>,
    ) => Promise<OASResponse<TOAS, TPath, TMethod>>;
  };
};

export type OASModel<TOAS extends OpenAPIV3_1.Document, TName extends string> = TOAS extends {
  components: {
    schemas: {
      [TModelName in TName]: JSONSchema;
    };
  };
}
  ? FromSchema<TOAS['components']['schemas'][TName]>
  : never;

export type OASRequestParams<
  TOAS extends OpenAPIV3_1.Document,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
> = {
  json?: OASMethodMap<TOAS, TPath>[TMethod] extends {
    requestBody: { content: { 'application/json': { schema: JSONSchema } } };
  }
    ? FromSchema<
        OASMethodMap<TOAS, TPath>[TMethod]['requestBody']['content']['application/json']['schema']
      >
    : never;
  params?: OASMethodMap<TOAS, TPath>[TMethod] extends {
    parameters: { name: string; schema: JSONSchema }[];
  }
    ? OASParamMap<OASMethodMap<TOAS, TPath>[TMethod]['parameters'], 'path'>
    : never;
  query?: OASMethodMap<TOAS, TPath>[TMethod] extends {
    parameters: { name: string; schema: JSONSchema }[];
  }
    ? OASParamMap<OASMethodMap<TOAS, TPath>[TMethod]['parameters'], 'query'>
    : never;
  headers?: OASMethodMap<TOAS, TPath>[TMethod] extends {
    parameters: { name: string; schema: JSONSchema }[];
  }
    ? OASParamMap<OASMethodMap<TOAS, TPath>[TMethod]['parameters'], 'header'>
    : never;
  formData?: OASMethodMap<TOAS, TPath>[TMethod] extends {
    requestBody: { content: { 'multipart/form-data': { schema: JSONSchema } } };
  }
    ? FromSchema<
        OASMethodMap<
          TOAS,
          TPath
        >[TMethod]['requestBody']['content']['multipart/form-data']['schema']
      >
    : never;
};

export type OASInput<
  TOAS extends OpenAPIV3_1.Document,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
  TRequestType extends keyof OASRequestParams<TOAS, TPath, TMethod>,
> = OASRequestParams<TOAS, TPath, TMethod>[TRequestType];

export type OASOutput<
  TOAS extends OpenAPIV3_1.Document,
  TPath extends keyof OASPathMap<TOAS>,
  TMethod extends keyof OASMethodMap<TOAS, TPath>,
  TStatusCode extends keyof OASStatusMap<TOAS, TPath, TMethod> = 200,
> = FromSchema<OASJSONResponseSchema<TOAS, TPath, TMethod, TStatusCode> & TOAS>;

export type OASComponentSchema<
  TOAS extends OpenAPIV3_1.Document,
  TName extends string,
> = TOAS extends {
  components: {
    schemas: {
      [TModelName in TName]: JSONSchema;
    };
  };
}
  ? FromSchema<TOAS['components']['schemas'][TName]>
  : never;

export interface ClientOptions {
  endpoint?: string;
  fetchFn?: typeof fetch;
  plugins?: ClientPlugin[];
}

export interface ClientRequestParams {
  json?: any;
  formData?: FormData;
  params?: Record<string, string>;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string>;
}

export type ClientMethod = (requestParams?: ClientRequestParams) => Promise<Response>;

export interface ClientPlugin {
  onRequestInit?: OnRequestInitHook;
  onResponse?: OnResponseHook;
}

export type OnRequestInitHook = (payload: ClientOnRequestInitPayload) => Promise<void>;
export type OnResponseHook = (payload: ClientOnResponseHookPayload) => Promise<void>;

export interface ClientOnRequestInitPayload {
  path: string;
  method: HTTPMethod;
  requestParams: ClientRequestParams;
  requestInit: RequestInit;
  endResponse(response: Response): void;
}

export interface ClientOnResponseHookPayload {
  path: string;
  method: HTTPMethod;
  requestParams: ClientRequestParams;
  requestInit: RequestInit;
  response: Response;
}
