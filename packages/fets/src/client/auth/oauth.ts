import type { TypedResponseWithJSONStatusMap } from '../../typed-fetch.js';

export type OAuth2AuthParams<TSecurityScheme> = TSecurityScheme extends {
  type: 'oauth2';
}
  ? {
      headers: {
        Authorization: `Bearer ${string}`;
      };
    }
  : {};

export type OASOAuthPathRequestParamsWithHeader = {
  formUrlEncoded: {
    grant_type: 'client_credentials';
  };
  headers: {
    /**
     * The client ID and secret can be sent in the HTTP Basic auth header.
     * @example `Authorization: Basic <base64 encoded client_id:client_secret>`
     */
    Authorization: `Basic ${string}`;
  };
};

export type OASOAuthPathRequestParamsWithoutHeader = {
  grant_type: 'client_credentials';
  client_id: string;
  client_secret: string;
};

export type OASOAuthPath<TOAS> = TOAS extends {
  components: {
    securitySchemes: {
      [key: string]: {
        type: 'oauth2';
        flows: { authorizationCode: { tokenUrl: infer TTokenURL } };
      };
    };
  };
}
  ? {
      /**
       * OAuth 2.0 Token Endpoint which is needed for the client to obtain an access token.
       */
      [TPath in TTokenURL extends string ? TTokenURL : never]: {
        /**
         * The client needs to authenticate themselves for this request.
         * Typically the service will allow either additional request parameters `client_id` and `client_secret`,
         * or accept the client ID and secret in the HTTP Basic auth header.
         */
        post(
          requestParams:
            | OASOAuthPathRequestParamsWithHeader
            | OASOAuthPathRequestParamsWithoutHeader,
          requestInit?: RequestInit,
        ): Promise<
          TypedResponseWithJSONStatusMap<{
            200: OAuthPathSuccessResponse;
            400: OAuthPathFailedResponse;
          }>
        >;
      };
    }
  : {};

export type OAuthPathSuccessResponse = {
  /**
   * The access token string as issued by the authorization server.
   */
  access_token: string;
  /**
   * The type of token this is, typically just the string “Bearer”.
   */
  token_type: 'Bearer' | 'bearer';
  /**
   * If the access token expires, the server should reply with the duration of time the access token is granted for.
   */
  expires_in?: number;
  /**
   * If the access token will expire,
   * then it is useful to return a refresh token which applications can use to obtain another access token.
   * However, tokens issued with the implicit grant cannot be issued a refresh token.
   */
  refresh_token?: string;
  /**
   * If the scope the user granted is identical to the scope the app requested, this parameter is optional.
   * If the granted scope is different from the requested scope,
   * such as if the user modified the scope, then this parameter is required.
   */
  scope?: string;
};

export interface OAuthPathFailedResponse {
  error: OAuthPathErrorType;
  error_description?: string;
  error_uri?: string;
}

export enum OAuthPathErrorType {
  /**
   * The request is missing a parameter so the server can’t proceed with the request.
   * This may also be returned if the request includes an unsupported parameter or repeats a parameter.
   */
  invalid_request = 'invalid_request',
  /**
   * Client authentication failed, such as if the request contains an invalid client ID or secret.
   * Send an HTTP 401 response in this case.
   */
  invalid_client = 'invalid_client',
  /**
   * The authorization code (or user’s password for the password grant type) is invalid or expired.
   * This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request.
   */
  invalid_grant = 'invalid_grant',
  /**
   * For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request.
   */
  invalid_scope = 'invalid_scope',
  /**
   * This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps.
   */
  unauthorized_client = 'unauthorized_client',
  /**
   * If a grant type is requested that the authorization server doesn’t recognize, use this code.
   * Note that unknown grant types also use this specific error code rather than using the `invalid_request` above.
   */
  unsupported_grant_type = 'unsupported_grant_type',
}
