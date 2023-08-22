/* eslint-disable no-template-curly-in-string */
export default {
  components: {
    responses: {
      emptyResponse: {
        description:
          'Empty responses are sent when, for example, resources are deleted. The HTTP status code for empty responses is typically 201.',
      },
      identitySchemas: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/identitySchemas',
            },
          },
        },
        description: 'List Identity JSON Schemas Response',
      },
      listCourierMessages: {
        content: {
          'application/json': {
            schema: {
              items: {
                $ref: '#/components/schemas/message',
              },
              type: 'array',
            },
          },
        },
        description: 'Paginated Courier Message List Response',
      },
      listIdentities: {
        content: {
          'application/json': {
            schema: {
              items: {
                $ref: '#/components/schemas/identity',
              },
              type: 'array',
            },
          },
        },
        description: 'Paginated Identity List Response',
      },
      listIdentitySessions: {
        content: {
          'application/json': {
            schema: {
              items: {
                $ref: '#/components/schemas/session',
              },
              type: 'array',
            },
          },
        },
        description: 'List Identity Sessions Response',
      },
      listMySessions: {
        content: {
          'application/json': {
            schema: {
              items: {
                $ref: '#/components/schemas/session',
              },
              type: 'array',
            },
          },
        },
        description: 'List My Session Response',
      },
      listSessions: {
        content: {
          'application/json': {
            schema: {
              items: {
                $ref: '#/components/schemas/session',
              },
              type: 'array',
            },
          },
        },
        description:
          'Session List Response\n\nThe response given when listing sessions in an administrative context.',
      },
    },
    schemas: {
      DefaultError: {},
      Duration: {
        description:
          'A Duration represents the elapsed time between two instants\nas an int64 nanosecond count. The representation limits the\nlargest representable duration to approximately 290 years.',
        format: 'int64',
        type: 'integer',
      },
      ID: {
        format: 'int64',
        type: 'integer',
      },
      JSONRawMessage: {
        title:
          'JSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger.',
        type: 'object',
      },
      NullBool: {
        nullable: true,
        type: 'boolean',
      },
      NullInt: {
        nullable: true,
        type: 'integer',
      },
      NullString: {
        nullable: true,
        type: 'string',
      },
      NullTime: {
        format: 'date-time',
        nullable: true,
        type: 'string',
      },
      NullUUID: {
        format: 'uuid4',
        nullable: true,
        type: 'string',
      },
      OAuth2Client: {
        properties: {
          allowed_cors_origins: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          audience: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          authorization_code_grant_access_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          authorization_code_grant_id_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          authorization_code_grant_refresh_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          backchannel_logout_session_required: {
            description:
              'OpenID Connect Back-Channel Logout Session Required  Boolean value specifying whether the RP requires that a sid (session ID) Claim be included in the Logout Token to identify the RP session with the OP when the backchannel_logout_uri is used. If omitted, the default value is false.',
            type: 'boolean',
          },
          backchannel_logout_uri: {
            description:
              'OpenID Connect Back-Channel Logout URI  RP URL that will cause the RP to log itself out when sent a Logout Token by the OP.',
            type: 'string',
          },
          client_credentials_grant_access_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          client_id: {
            description: 'OAuth 2.0 Client ID  The ID is autogenerated and immutable.',
            type: 'string',
          },
          client_name: {
            description:
              'OAuth 2.0 Client Name  The human-readable name of the client to be presented to the end-user during authorization.',
            type: 'string',
          },
          client_secret: {
            description:
              'OAuth 2.0 Client Secret  The secret will be included in the create request as cleartext, and then never again. The secret is kept in hashed format and is not recoverable once lost.',
            type: 'string',
          },
          client_secret_expires_at: {
            description:
              'OAuth 2.0 Client Secret Expires At  The field is currently not supported and its value is always 0.',
            format: 'int64',
            type: 'integer',
          },
          client_uri: {
            description:
              'OAuth 2.0 Client URI  ClientURI is a URL string of a web page providing information about the client. If present, the server SHOULD display this URL to the end-user in a clickable fashion.',
            type: 'string',
          },
          contacts: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          created_at: {
            description:
              "OAuth 2.0 Client Creation Date  CreatedAt returns the timestamp of the client's creation.",
            format: 'date-time',
            type: 'string',
          },
          frontchannel_logout_session_required: {
            description:
              'OpenID Connect Front-Channel Logout Session Required  Boolean value specifying whether the RP requires that iss (issuer) and sid (session ID) query parameters be included to identify the RP session with the OP when the frontchannel_logout_uri is used. If omitted, the default value is false.',
            type: 'boolean',
          },
          frontchannel_logout_uri: {
            description:
              'OpenID Connect Front-Channel Logout URI  RP URL that will cause the RP to log itself out when rendered in an iframe by the OP. An iss (issuer) query parameter and a sid (session ID) query parameter MAY be included by the OP to enable the RP to validate the request and to determine which of the potentially multiple sessions is to be logged out; if either is included, both MUST be.',
            type: 'string',
          },
          grant_types: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          implicit_grant_access_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          implicit_grant_id_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          jwks: {
            description:
              "OAuth 2.0 Client JSON Web Key Set  Client's JSON Web Key Set [JWK] document, passed by value. The semantics of the jwks parameter are the same as the jwks_uri parameter, other than that the JWK Set is passed by value, rather than by reference. This parameter is intended only to be used by Clients that, for some reason, are unable to use the jwks_uri parameter, for instance, by native applications that might not have a location to host the contents of the JWK Set. If a Client can use jwks_uri, it MUST NOT use jwks. One significant downside of jwks is that it does not enable key rotation (which jwks_uri does, as described in Section 10 of OpenID Connect Core 1.0 [OpenID.Core]). The jwks_uri and jwks parameters MUST NOT be used together.",
          },
          jwks_uri: {
            description:
              "OAuth 2.0 Client JSON Web Key Set URL  URL for the Client's JSON Web Key Set [JWK] document. If the Client signs requests to the Server, it contains the signing key(s) the Server uses to validate signatures from the Client. The JWK Set MAY also contain the Client's encryption keys(s), which are used by the Server to encrypt responses to the Client. When both signing and encryption keys are made available, a use (Key Use) parameter value is REQUIRED for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate.",
            type: 'string',
          },
          jwt_bearer_grant_access_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          logo_uri: {
            description: "OAuth 2.0 Client Logo URI  A URL string referencing the client's logo.",
            type: 'string',
          },
          metadata: {},
          owner: {
            description:
              'OAuth 2.0 Client Owner  Owner is a string identifying the owner of the OAuth 2.0 Client.',
            type: 'string',
          },
          policy_uri: {
            description:
              'OAuth 2.0 Client Policy URI  PolicyURI is a URL string that points to a human-readable privacy policy document that describes how the deployment organization collects, uses, retains, and discloses personal data.',
            type: 'string',
          },
          post_logout_redirect_uris: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          redirect_uris: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          refresh_token_grant_access_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          refresh_token_grant_id_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          refresh_token_grant_refresh_token_lifespan: {
            description: 'Specify a time duration in milliseconds, seconds, minutes, hours.',
            type: 'string',
          },
          registration_access_token: {
            description:
              'OpenID Connect Dynamic Client Registration Access Token  RegistrationAccessToken can be used to update, get, or delete the OAuth2 Client. It is sent when creating a client using Dynamic Client Registration.',
            type: 'string',
          },
          registration_client_uri: {
            description:
              'OpenID Connect Dynamic Client Registration URL  RegistrationClientURI is the URL used to update, get, or delete the OAuth2 Client.',
            type: 'string',
          },
          request_object_signing_alg: {
            description:
              'OpenID Connect Request Object Signing Algorithm  JWS [JWS] alg algorithm [JWA] that MUST be used for signing Request Objects sent to the OP. All Request Objects from this Client MUST be rejected, if not signed with this algorithm.',
            type: 'string',
          },
          request_uris: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          response_types: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          scope: {
            description:
              'OAuth 2.0 Client Scope  Scope is a string containing a space-separated list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749]) that the client can use when requesting access tokens.',
            type: 'string',
          },
          sector_identifier_uri: {
            description:
              'OpenID Connect Sector Identifier URI  URL using the https scheme to be used in calculating Pseudonymous Identifiers by the OP. The URL references a file with a single JSON array of redirect_uri values.',
            type: 'string',
          },
          subject_type: {
            description:
              'OpenID Connect Subject Type  The `subject_types_supported` Discovery parameter contains a list of the supported subject_type values for this server. Valid types include `pairwise` and `public`.',
            type: 'string',
          },
          token_endpoint_auth_method: {
            description:
              'OAuth 2.0 Token Endpoint Authentication Method  Requested Client Authentication method for the Token Endpoint. The options are:  `client_secret_post`: (default) Send `client_id` and `client_secret` as `application/x-www-form-urlencoded` in the HTTP body. `client_secret_basic`: Send `client_id` and `client_secret` as `application/x-www-form-urlencoded` encoded in the HTTP Authorization header. `private_key_jwt`: Use JSON Web Tokens to authenticate the client. `none`: Used for public clients (native apps, mobile apps) which can not have secrets.',
            type: 'string',
          },
          token_endpoint_auth_signing_alg: {
            description:
              'OAuth 2.0 Token Endpoint Signing Algorithm  Requested Client Authentication signing algorithm for the Token Endpoint.',
            type: 'string',
          },
          tos_uri: {
            description:
              'OAuth 2.0 Client Terms of Service URI  A URL string pointing to a human-readable terms of service document for the client that describes a contractual relationship between the end-user and the client that the end-user accepts when authorizing the client.',
            type: 'string',
          },
          updated_at: {
            description:
              'OAuth 2.0 Client Last Update Date  UpdatedAt returns the timestamp of the last update.',
            format: 'date-time',
            type: 'string',
          },
          userinfo_signed_response_alg: {
            description:
              'OpenID Connect Request Userinfo Signed Response Algorithm  JWS alg algorithm [JWA] REQUIRED for signing UserInfo Responses. If this is specified, the response will be JWT [JWT] serialized, and signed using JWS. The default, if omitted, is for the UserInfo Response to return the Claims as a UTF-8 encoded JSON object using the application/json content-type.',
            type: 'string',
          },
        },
        title:
          'OAuth2Client OAuth 2.0 Clients are used to perform OAuth 2.0 and OpenID Connect flows. Usually, OAuth 2.0 clients are generated for applications which want to consume your OAuth 2.0 or OpenID Connect capabilities.',
        type: 'object',
      },
      OAuth2ConsentRequestOpenIDConnectContext: {
        description:
          'OAuth2ConsentRequestOpenIDConnectContext struct for OAuth2ConsentRequestOpenIDConnectContext',
        properties: {
          acr_values: {
            description:
              'ACRValues is the Authentication AuthorizationContext Class Reference requested in the OAuth 2.0 Authorization request. It is a parameter defined by OpenID Connect and expresses which level of authentication (e.g. 2FA) is required.  OpenID Connect defines it as follows: \u003e Requested Authentication AuthorizationContext Class Reference values. Space-separated string that specifies the acr values that the Authorization Server is being requested to use for processing this Authentication Request, with the values appearing in order of preference. The Authentication AuthorizationContext Class satisfied by the authentication performed is returned as the acr Claim Value, as specified in Section 2. The acr Claim is requested as a Voluntary Claim by this parameter.',
            items: {
              type: 'string',
            },
            type: 'array',
          },
          display: {
            description:
              'Display is a string value that specifies how the Authorization Server displays the authentication and consent user interface pages to the End-User. The defined values are: page: The Authorization Server SHOULD display the authentication and consent UI consistent with a full User Agent page view. If the display parameter is not specified, this is the default display mode. popup: The Authorization Server SHOULD display the authentication and consent UI consistent with a popup User Agent window. The popup User Agent window should be of an appropriate size for a login-focused dialog and should not obscure the entire window that it is popping up over. touch: The Authorization Server SHOULD display the authentication and consent UI consistent with a device that leverages a touch interface. wap: The Authorization Server SHOULD display the authentication and consent UI consistent with a \\"feature phone\\" type display.  The Authorization Server MAY also attempt to detect the capabilities of the User Agent and present an appropriate display.',
            type: 'string',
          },
          id_token_hint_claims: {
            additionalProperties: {},
            description:
              "IDTokenHintClaims are the claims of the ID Token previously issued by the Authorization Server being passed as a hint about the End-User's current or past authenticated session with the Client.",
            type: 'object',
          },
          login_hint: {
            description:
              'LoginHint hints about the login identifier the End-User might use to log in (if necessary). This hint can be used by an RP if it first asks the End-User for their e-mail address (or other identifier) and then wants to pass that value as a hint to the discovered authorization service. This value MAY also be a phone number in the format specified for the phone_number Claim. The use of this parameter is optional.',
            type: 'string',
          },
          ui_locales: {
            description:
              'UILocales is the End-User\'id preferred languages and scripts for the user interface, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. For instance, the value \\"fr-CA fr en\\" represents a preference for French as spoken in Canada, then French (without a region designation), followed by English (without a region designation). An error SHOULD NOT result if some or all of the requested locales are not supported by the OpenID Provider.',
            items: {
              type: 'string',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
      OAuth2LoginRequest: {
        description: 'OAuth2LoginRequest struct for OAuth2LoginRequest',
        properties: {
          challenge: {
            description:
              'ID is the identifier (\\"login challenge\\") of the login request. It is used to identify the session.',
            type: 'string',
          },
          client: {
            $ref: '#/components/schemas/OAuth2Client',
          },
          oidc_context: {
            $ref: '#/components/schemas/OAuth2ConsentRequestOpenIDConnectContext',
          },
          request_url: {
            description:
              'RequestURL is the original OAuth 2.0 Authorization URL requested by the OAuth 2.0 client. It is the URL which initiates the OAuth 2.0 Authorization Code or OAuth 2.0 Implicit flow. This URL is typically not needed, but might come in handy if you want to deal with additional request parameters.',
            type: 'string',
          },
          requested_access_token_audience: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          requested_scope: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          session_id: {
            description:
              'SessionID is the login session ID. If the user-agent reuses a login session (via cookie / remember flag) this ID will remain the same. If the user-agent did not have an existing authentication session (e.g. remember is false) this will be a new random value. This value is used as the \\"sid\\" parameter in the ID Token and in OIDC Front-/Back- channel logout. It\'s value can generally be used to associate consecutive login requests by a certain user.',
            type: 'string',
          },
          skip: {
            description:
              'Skip, if true, implies that the client has requested the same scopes from the same user previously. If true, you can skip asking the user to grant the requested scopes, and simply forward the user to the redirect URL.  This feature allows you to update / set session information.',
            type: 'boolean',
          },
          subject: {
            description:
              'Subject is the user ID of the end-user that authenticated. Now, that end user needs to grant or deny the scope requested by the OAuth 2.0 client. If this value is set and `skip` is true, you MUST include this subject type when accepting the login request, or the request will fail.',
            type: 'string',
          },
        },
        type: 'object',
      },
      RecoveryAddressType: {
        title:
          'RecoveryAddressType must not exceed 16 characters as that is the limitation in the SQL Schema.',
        type: 'string',
      },
      Time: {
        format: 'date-time',
        type: 'string',
      },
      UUID: {
        format: 'uuid4',
        type: 'string',
      },
      authenticatorAssuranceLevel: {
        description:
          'The authenticator assurance level can be one of "aal1", "aal2", or "aal3". A higher number means that it is harder\nfor an attacker to compromise the account.\n\nGenerally, "aal1" implies that one authentication factor was used while AAL2 implies that two factors (e.g.\npassword + TOTP) have been used.\n\nTo learn more about these levels please head over to: https://www.ory.sh/kratos/docs/concepts/credentials',
        enum: ['aal0', 'aal1', 'aal2', 'aal3'],
        title: 'Authenticator Assurance Level (AAL)',
        type: 'string',
      },
      batchPatchIdentitiesResponse: {
        description: 'Patch identities response',
        properties: {
          identities: {
            description: 'The patch responses for the individual identities.',
            items: {
              $ref: '#/components/schemas/identityPatchResponse',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
      continueWith: {
        discriminator: {
          mapping: {
            set_ory_session_token: '#/components/schemas/continueWithSetOrySessionToken',
            show_verification_ui: '#/components/schemas/continueWithVerificationUi',
          },
          propertyName: 'action',
        },
        oneOf: [
          {
            $ref: '#/components/schemas/continueWithVerificationUi',
          },
          {
            $ref: '#/components/schemas/continueWithSetOrySessionToken',
          },
        ],
      },
      continueWithSetOrySessionToken: {
        description:
          'Indicates that a session was issued, and the application should use this token for authenticated requests',
        properties: {
          action: {
            description:
              'Action will always be `set_ory_session_token`\nset_ory_session_token ContinueWithActionSetOrySessionToken\nshow_verification_ui ContinueWithActionShowVerificationUI',
            enum: ['set_ory_session_token', 'show_verification_ui'],
            type: 'string',
            'x-go-enum-desc':
              'set_ory_session_token ContinueWithActionSetOrySessionToken\nshow_verification_ui ContinueWithActionShowVerificationUI',
          },
          ory_session_token: {
            description: 'Token is the token of the session',
            type: 'string',
          },
        },
        required: ['action', 'ory_session_token'],
        type: 'object',
      },
      continueWithVerificationUi: {
        description: 'Indicates, that the UI flow could be continued by showing a verification ui',
        properties: {
          action: {
            description:
              'Action will always be `show_verification_ui`\nset_ory_session_token ContinueWithActionSetOrySessionToken\nshow_verification_ui ContinueWithActionShowVerificationUI',
            enum: ['set_ory_session_token', 'show_verification_ui'],
            type: 'string',
            'x-go-enum-desc':
              'set_ory_session_token ContinueWithActionSetOrySessionToken\nshow_verification_ui ContinueWithActionShowVerificationUI',
          },
          flow: {
            $ref: '#/components/schemas/continueWithVerificationUiFlow',
          },
        },
        required: ['action', 'flow'],
        type: 'object',
      },
      continueWithVerificationUiFlow: {
        properties: {
          id: {
            description: 'The ID of the verification flow',
            format: 'uuid',
            type: 'string',
          },
          url: {
            description: 'The URL of the verification flow',
            type: 'string',
          },
          verifiable_address: {
            description: 'The address that should be verified in this flow',
            type: 'string',
          },
        },
        required: ['id', 'verifiable_address'],
        type: 'object',
      },
      courierMessageStatus: {
        description: "A Message's Status",
        enum: ['queued', 'sent', 'processing', 'abandoned'],
        type: 'string',
      },
      courierMessageType: {
        description: 'It can either be `email` or `phone`',
        enum: ['email', 'phone'],
        title: "A Message's Type",
        type: 'string',
      },
      createIdentityBody: {
        description: 'Create Identity Body',
        properties: {
          credentials: {
            $ref: '#/components/schemas/identityWithCredentials',
          },
          metadata_admin: {
            description:
              'Store metadata about the user which is only accessible through admin APIs such as `GET /admin/identities/\u003cid\u003e`.',
          },
          metadata_public: {
            description:
              'Store metadata about the identity which the identity itself can see when calling for example the\nsession endpoint. Do not store sensitive information (e.g. credit score) about the identity in this field.',
          },
          recovery_addresses: {
            description:
              'RecoveryAddresses contains all the addresses that can be used to recover an identity.\n\nUse this structure to import recovery addresses for an identity. Please keep in mind\nthat the address needs to be represented in the Identity Schema or this field will be overwritten\non the next identity update.',
            items: {
              $ref: '#/components/schemas/recoveryIdentityAddress',
            },
            type: 'array',
          },
          schema_id: {
            description:
              "SchemaID is the ID of the JSON Schema to be used for validating the identity's traits.",
            type: 'string',
          },
          state: {
            $ref: '#/components/schemas/identityState',
          },
          traits: {
            description:
              "Traits represent an identity's traits. The identity is able to create, modify, and delete traits\nin a self-service manner. The input will always be validated against the JSON Schema defined\nin `schema_url`.",
            type: 'object',
          },
          verifiable_addresses: {
            description:
              'VerifiableAddresses contains all the addresses that can be verified by the user.\n\nUse this structure to import verified addresses for an identity. Please keep in mind\nthat the address needs to be represented in the Identity Schema or this field will be overwritten\non the next identity update.',
            items: {
              $ref: '#/components/schemas/verifiableIdentityAddress',
            },
            type: 'array',
          },
        },
        required: ['schema_id', 'traits'],
        type: 'object',
      },
      createRecoveryCodeForIdentityBody: {
        description: 'Create Recovery Code for Identity Request Body',
        properties: {
          expires_in: {
            description:
              'Code Expires In\n\nThe recovery code will expire after that amount of time has passed. Defaults to the configuration value of\n`selfservice.methods.code.config.lifespan`.',
            pattern: '^([0-9]+(ns|us|ms|s|m|h))*$',
            type: 'string',
          },
          identity_id: {
            description: "Identity to Recover\n\nThe identity's ID you wish to recover.",
            format: 'uuid',
            type: 'string',
          },
        },
        required: ['identity_id'],
        type: 'object',
      },
      createRecoveryLinkForIdentityBody: {
        description: 'Create Recovery Link for Identity Request Body',
        properties: {
          expires_in: {
            description:
              'Link Expires In\n\nThe recovery link will expire after that amount of time has passed. Defaults to the configuration value of\n`selfservice.methods.code.config.lifespan`.',
            pattern: '^[0-9]+(ns|us|ms|s|m|h)$',
            type: 'string',
          },
          identity_id: {
            description: "Identity to Recover\n\nThe identity's ID you wish to recover.",
            format: 'uuid',
            type: 'string',
          },
        },
        required: ['identity_id'],
        type: 'object',
      },
      deleteMySessionsCount: {
        description: 'Deleted Session Count',
        properties: {
          count: {
            description: 'The number of sessions that were revoked.',
            format: 'int64',
            type: 'integer',
          },
        },
        type: 'object',
      },
      errorAuthenticatorAssuranceLevelNotSatisfied: {
        properties: {
          error: {
            $ref: '#/components/schemas/genericError',
          },
          redirect_browser_to: {
            description: 'Points to where to redirect the user to next.',
            type: 'string',
          },
        },
        title:
          'Is returned when an active session was found but the requested AAL is not satisfied.',
        type: 'object',
      },
      errorBrowserLocationChangeRequired: {
        properties: {
          error: {
            $ref: '#/components/schemas/errorGeneric',
          },
          redirect_browser_to: {
            description: 'Points to where to redirect the user to next.',
            type: 'string',
          },
        },
        title: 'Is sent when a flow requires a browser to change its location.',
        type: 'object',
      },
      errorFlowReplaced: {
        description: 'Is sent when a flow is replaced by a different flow of the same class',
        properties: {
          error: {
            $ref: '#/components/schemas/genericError',
          },
          use_flow_id: {
            description:
              'The flow ID that should be used for the new flow as it contains the correct messages.',
            format: 'uuid',
            type: 'string',
          },
        },
        type: 'object',
      },
      errorGeneric: {
        description: 'The standard Ory JSON API error format.',
        properties: {
          error: {
            $ref: '#/components/schemas/genericError',
          },
        },
        required: ['error'],
        title: 'JSON API Error Response',
        type: 'object',
      },
      flowError: {
        properties: {
          created_at: {
            description: 'CreatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          error: {
            type: 'object',
          },
          id: {
            description: 'ID of the error container.',
            format: 'uuid',
            type: 'string',
          },
          updated_at: {
            description: 'UpdatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
        },
        required: ['id'],
        type: 'object',
      },
      genericError: {
        properties: {
          code: {
            description: 'The status code',
            example: 404,
            format: 'int64',
            type: 'integer',
          },
          debug: {
            description:
              'Debug information\n\nThis field is often not exposed to protect against leaking\nsensitive information.',
            example: 'SQL field "foo" is not a bool.',
            type: 'string',
          },
          details: {
            additionalProperties: false,
            description: 'Further error details',
            type: 'object',
          },
          id: {
            description:
              'The error ID\n\nUseful when trying to identify various errors in application logic.',
            type: 'string',
          },
          message: {
            description: "Error message\n\nThe error's message.",
            example: 'The resource could not be found',
            type: 'string',
          },
          reason: {
            description: 'A human-readable reason for the error',
            example: 'User with ID 1234 does not exist.',
            type: 'string',
          },
          request: {
            description:
              'The request ID\n\nThe request ID is often exposed internally in order to trace\nerrors across service architectures. This is often a UUID.',
            example: 'd7ef54b1-ec15-46e6-bccb-524b82c035e6',
            type: 'string',
          },
          status: {
            description: 'The status description',
            example: 'Not Found',
            type: 'string',
          },
        },
        required: ['message'],
        type: 'object',
      },
      healthNotReadyStatus: {
        properties: {
          errors: {
            additionalProperties: {
              type: 'string',
            },
            description: 'Errors contains a list of errors that caused the not ready status.',
            type: 'object',
          },
        },
        type: 'object',
      },
      healthStatus: {
        properties: {
          status: {
            description: 'Status always contains "ok".',
            type: 'string',
          },
        },
        type: 'object',
      },
      identity: {
        description:
          'An [identity](https://www.ory.sh/docs/kratos/concepts/identity-user-model) represents a (human) user in Ory.',
        properties: {
          created_at: {
            description: 'CreatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          credentials: {
            additionalProperties: {
              $ref: '#/components/schemas/identityCredentials',
            },
            description:
              'Credentials represents all credentials that can be used for authenticating this identity.',
            type: 'object',
          },
          id: {
            description:
              "ID is the identity's unique identifier.\n\nThe Identity ID can not be changed and can not be chosen. This ensures future\ncompatibility and optimization for distributed stores such as CockroachDB.",
            format: 'uuid',
            type: 'string',
          },
          metadata_admin: {
            $ref: '#/components/schemas/nullJsonRawMessage',
          },
          metadata_public: {
            $ref: '#/components/schemas/nullJsonRawMessage',
          },
          recovery_addresses: {
            description:
              'RecoveryAddresses contains all the addresses that can be used to recover an identity.',
            items: {
              $ref: '#/components/schemas/recoveryIdentityAddress',
            },
            type: 'array',
            'x-omitempty': true,
          },
          schema_id: {
            description:
              "SchemaID is the ID of the JSON Schema to be used for validating the identity's traits.",
            type: 'string',
          },
          schema_url: {
            description:
              "SchemaURL is the URL of the endpoint where the identity's traits schema can be fetched from.\n\nformat: url",
            type: 'string',
          },
          state: {
            $ref: '#/components/schemas/identityState',
          },
          state_changed_at: {
            $ref: '#/components/schemas/nullTime',
          },
          traits: {
            $ref: '#/components/schemas/identityTraits',
          },
          updated_at: {
            description: 'UpdatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          verifiable_addresses: {
            description:
              'VerifiableAddresses contains all the addresses that can be verified by the user.',
            items: {
              $ref: '#/components/schemas/verifiableIdentityAddress',
            },
            type: 'array',
            'x-omitempty': true,
          },
        },
        required: ['id', 'schema_id', 'schema_url', 'traits'],
        title: 'Identity represents an Ory Kratos identity',
        type: 'object',
      },
      identityCredentials: {
        description: 'Credentials represents a specific credential type',
        properties: {
          config: {
            $ref: '#/components/schemas/JSONRawMessage',
          },
          created_at: {
            description: 'CreatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          identifiers: {
            description:
              'Identifiers represents a list of unique identifiers this credential type matches.',
            items: {
              type: 'string',
            },
            type: 'array',
          },
          type: {
            $ref: '#/components/schemas/identityCredentialsType',
          },
          updated_at: {
            description: 'UpdatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          version: {
            description:
              'Version refers to the version of the credential. Useful when changing the config schema.',
            format: 'int64',
            type: 'integer',
          },
        },
        type: 'object',
      },
      identityCredentialsOidc: {
        properties: {
          providers: {
            items: {
              $ref: '#/components/schemas/identityCredentialsOidcProvider',
            },
            type: 'array',
          },
        },
        title: 'CredentialsOIDC is contains the configuration for credentials of the type oidc.',
        type: 'object',
      },
      identityCredentialsOidcProvider: {
        properties: {
          initial_access_token: {
            type: 'string',
          },
          initial_id_token: {
            type: 'string',
          },
          initial_refresh_token: {
            type: 'string',
          },
          provider: {
            type: 'string',
          },
          subject: {
            type: 'string',
          },
        },
        title:
          'CredentialsOIDCProvider is contains a specific OpenID COnnect credential for a particular connection (e.g. Google).',
        type: 'object',
      },
      identityCredentialsPassword: {
        properties: {
          hashed_password: {
            description: 'HashedPassword is a hash-representation of the password.',
            type: 'string',
          },
        },
        title:
          'CredentialsPassword is contains the configuration for credentials of the type password.',
        type: 'object',
      },
      identityCredentialsType: {
        description: 'and so on.',
        enum: ['password', 'totp', 'oidc', 'webauthn', 'lookup_secret'],
        title:
          'CredentialsType  represents several different credential types, like password credentials, passwordless credentials,',
        type: 'string',
      },
      identityPatch: {
        description: 'Payload for patching an identity',
        properties: {
          create: {
            $ref: '#/components/schemas/createIdentityBody',
          },
          patch_id: {
            description:
              'The ID of this patch.\n\nThe patch ID is optional. If specified, the ID will be returned in the\nresponse, so consumers of this API can correlate the response with the\npatch.',
            format: 'uuid',
            type: 'string',
          },
        },
        type: 'object',
      },
      identityPatchResponse: {
        description: 'Response for a single identity patch',
        properties: {
          action: {
            description:
              'The action for this specific patch\ncreate ActionCreate  Create this identity.',
            enum: ['create'],
            type: 'string',
            'x-go-enum-desc': 'create ActionCreate  Create this identity.',
          },
          identity: {
            description: 'The identity ID payload of this patch',
            format: 'uuid',
            type: 'string',
          },
          patch_id: {
            description: 'The ID of this patch response, if an ID was specified in the patch.',
            format: 'uuid',
            type: 'string',
          },
        },
        type: 'object',
      },
      identitySchema: {
        description: 'Raw JSON Schema',
        type: 'object',
      },
      identitySchemaContainer: {
        description: 'An Identity JSON Schema Container',
        properties: {
          id: {
            description: 'The ID of the Identity JSON Schema',
            type: 'string',
          },
          schema: {
            description: 'The actual Identity JSON Schema',
            type: 'object',
          },
        },
        type: 'object',
      },
      identitySchemas: {
        description: 'List of Identity JSON Schemas',
        items: {
          $ref: '#/components/schemas/identitySchemaContainer',
        },
        type: 'array',
      },
      identityState: {
        description: 'The state can either be `active` or `inactive`.',
        enum: ['active', 'inactive'],
        title: "An Identity's State",
        type: 'string',
      },
      identityTraits: {
        description:
          "Traits represent an identity's traits. The identity is able to create, modify, and delete traits\nin a self-service manner. The input will always be validated against the JSON Schema defined\nin `schema_url`.",
      },
      identityVerifiableAddressStatus: {
        description:
          'VerifiableAddressStatus must not exceed 16 characters as that is the limitation in the SQL Schema',
        type: 'string',
      },
      identityVerifiableAddressType: {
        description:
          'VerifiableAddressType must not exceed 16 characters as that is the limitation in the SQL Schema',
        type: 'string',
      },
      identityWithCredentials: {
        description: 'Create Identity and Import Credentials',
        properties: {
          oidc: {
            $ref: '#/components/schemas/identityWithCredentialsOidc',
          },
          password: {
            $ref: '#/components/schemas/identityWithCredentialsPassword',
          },
        },
        type: 'object',
      },
      identityWithCredentialsOidc: {
        description: 'Create Identity and Import Social Sign In Credentials',
        properties: {
          config: {
            $ref: '#/components/schemas/identityWithCredentialsOidcConfig',
          },
        },
        type: 'object',
      },
      identityWithCredentialsOidcConfig: {
        properties: {
          config: {
            $ref: '#/components/schemas/identityWithCredentialsPasswordConfig',
          },
          providers: {
            description: 'A list of OpenID Connect Providers',
            items: {
              $ref: '#/components/schemas/identityWithCredentialsOidcConfigProvider',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
      identityWithCredentialsOidcConfigProvider: {
        description: 'Create Identity and Import Social Sign In Credentials Configuration',
        properties: {
          provider: {
            description:
              'The OpenID Connect provider to link the subject to. Usually something like `google` or `github`.',
            type: 'string',
          },
          subject: {
            description:
              'The subject (`sub`) of the OpenID Connect connection. Usually the `sub` field of the ID Token.',
            type: 'string',
          },
        },
        required: ['subject', 'provider'],
        type: 'object',
      },
      identityWithCredentialsPassword: {
        description: 'Create Identity and Import Password Credentials',
        properties: {
          config: {
            $ref: '#/components/schemas/identityWithCredentialsPasswordConfig',
          },
        },
        type: 'object',
      },
      identityWithCredentialsPasswordConfig: {
        description: 'Create Identity and Import Password Credentials Configuration',
        properties: {
          hashed_password: {
            description:
              'The hashed password in [PHC format]( https://www.ory.sh/docs/kratos/concepts/credentials/username-email-password#hashed-password-format)',
            type: 'string',
          },
          password: {
            description: 'The password in plain text if no hash is available.',
            type: 'string',
          },
        },
        type: 'object',
      },
      jsonPatch: {
        description: 'A JSONPatch document as defined by RFC 6902',
        properties: {
          from: {
            description:
              'This field is used together with operation "move" and uses JSON Pointer notation.\n\nLearn more [about JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901#section-5).',
            example: '/name',
            type: 'string',
          },
          op: {
            description:
              'The operation to be performed. One of "add", "remove", "replace", "move", "copy", or "test".',
            example: 'replace',
            type: 'string',
          },
          path: {
            description:
              'The path to the target path. Uses JSON pointer notation.\n\nLearn more [about JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901#section-5).',
            example: '/name',
            type: 'string',
          },
          value: {
            description:
              'The value to be used within the operations.\n\nLearn more [about JSON Pointers](https://datatracker.ietf.org/doc/html/rfc6901#section-5).',
            example: 'foobar',
          },
        },
        required: ['op', 'path'],
        type: 'object',
      },
      jsonPatchDocument: {
        description: 'A JSONPatchDocument request',
        items: {
          $ref: '#/components/schemas/jsonPatch',
        },
        type: 'array',
      },
      loginFlow: {
        description:
          'This object represents a login flow. A login flow is initiated at the "Initiate Login API / Browser Flow"\nendpoint by a client.\n\nOnce a login flow is completed successfully, a session cookie or session token will be issued.',
        properties: {
          active: {
            $ref: '#/components/schemas/identityCredentialsType',
          },
          created_at: {
            description: 'CreatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          expires_at: {
            description:
              'ExpiresAt is the time (UTC) when the flow expires. If the user still wishes to log in,\na new flow has to be initiated.',
            format: 'date-time',
            type: 'string',
          },
          id: {
            description:
              "ID represents the flow's unique ID. When performing the login flow, this\nrepresents the id in the login UI's query parameter: http://\u003cselfservice.flows.login.ui_url\u003e/?flow=\u003cflow_id\u003e",
            format: 'uuid',
            type: 'string',
          },
          issued_at: {
            description: 'IssuedAt is the time (UTC) when the flow started.',
            format: 'date-time',
            type: 'string',
          },
          oauth2_login_challenge: {
            description:
              'Ory OAuth 2.0 Login Challenge.\n\nThis value is set using the `login_challenge` query parameter of the registration and login endpoints.\nIf set will cooperate with Ory OAuth2 and OpenID to act as an OAuth2 server / OpenID Provider.',
            type: 'string',
          },
          oauth2_login_request: {
            $ref: '#/components/schemas/OAuth2LoginRequest',
          },
          refresh: {
            description: 'Refresh stores whether this login flow should enforce re-authentication.',
            type: 'boolean',
          },
          request_url: {
            description:
              "RequestURL is the initial URL that was requested from Ory Kratos. It can be used\nto forward information contained in the URL's path or query for example.",
            type: 'string',
          },
          requested_aal: {
            $ref: '#/components/schemas/authenticatorAssuranceLevel',
          },
          return_to: {
            description: 'ReturnTo contains the requested return_to URL.',
            type: 'string',
          },
          session_token_exchange_code: {
            description:
              'SessionTokenExchangeCode holds the secret code that the client can use to retrieve a session token after the login flow has been completed.\nThis is only set if the client has requested a session token exchange code, and if the flow is of type "api",\nand only on creating the login flow.',
            type: 'string',
          },
          type: {
            $ref: '#/components/schemas/selfServiceFlowType',
          },
          ui: {
            $ref: '#/components/schemas/uiContainer',
          },
          updated_at: {
            description: 'UpdatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
        },
        required: ['id', 'type', 'expires_at', 'issued_at', 'request_url', 'ui'],
        title: 'Login Flow',
        type: 'object',
      },
      logoutFlow: {
        description: 'Logout Flow',
        properties: {
          logout_token: {
            description: 'LogoutToken can be used to perform logout using AJAX.',
            type: 'string',
          },
          logout_url: {
            description:
              'LogoutURL can be opened in a browser to sign the user out.\n\nformat: uri',
            type: 'string',
          },
        },
        required: ['logout_url', 'logout_token'],
        type: 'object',
      },
      message: {
        properties: {
          body: {
            type: 'string',
          },
          created_at: {
            description: 'CreatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          dispatches: {
            description:
              'Dispatches store information about the attempts of delivering a message\nMay contain an error if any happened, or just the `success` state.',
            items: {
              $ref: '#/components/schemas/messageDispatch',
            },
            type: 'array',
          },
          id: {
            format: 'uuid',
            type: 'string',
          },
          recipient: {
            type: 'string',
          },
          send_count: {
            format: 'int64',
            type: 'integer',
          },
          status: {
            $ref: '#/components/schemas/courierMessageStatus',
          },
          subject: {
            type: 'string',
          },
          template_type: {
            description:
              '\nrecovery_invalid TypeRecoveryInvalid\nrecovery_valid TypeRecoveryValid\nrecovery_code_invalid TypeRecoveryCodeInvalid\nrecovery_code_valid TypeRecoveryCodeValid\nverification_invalid TypeVerificationInvalid\nverification_valid TypeVerificationValid\nverification_code_invalid TypeVerificationCodeInvalid\nverification_code_valid TypeVerificationCodeValid\notp TypeOTP\nstub TypeTestStub',
            enum: [
              'recovery_invalid',
              'recovery_valid',
              'recovery_code_invalid',
              'recovery_code_valid',
              'verification_invalid',
              'verification_valid',
              'verification_code_invalid',
              'verification_code_valid',
              'otp',
              'stub',
            ],
            type: 'string',
            'x-go-enum-desc':
              'recovery_invalid TypeRecoveryInvalid\nrecovery_valid TypeRecoveryValid\nrecovery_code_invalid TypeRecoveryCodeInvalid\nrecovery_code_valid TypeRecoveryCodeValid\nverification_invalid TypeVerificationInvalid\nverification_valid TypeVerificationValid\nverification_code_invalid TypeVerificationCodeInvalid\nverification_code_valid TypeVerificationCodeValid\notp TypeOTP\nstub TypeTestStub',
          },
          type: {
            $ref: '#/components/schemas/courierMessageType',
          },
          updated_at: {
            description: 'UpdatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
        },
        required: [
          'id',
          'status',
          'type',
          'recipient',
          'body',
          'subject',
          'template_type',
          'send_count',
          'created_at',
          'updated_at',
        ],
        type: 'object',
      },
      messageDispatch: {
        description:
          'MessageDispatch represents an attempt of sending a courier message\nIt contains the status of the attempt (failed or successful) and the error if any occured',
        properties: {
          created_at: {
            description: 'CreatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          error: {
            $ref: '#/components/schemas/JSONRawMessage',
          },
          id: {
            description: 'The ID of this message dispatch',
            format: 'uuid',
            type: 'string',
          },
          message_id: {
            description: 'The ID of the message being dispatched',
            format: 'uuid',
            type: 'string',
          },
          status: {
            description:
              'The status of this dispatch\nEither "failed" or "success"\nfailed CourierMessageDispatchStatusFailed\nsuccess CourierMessageDispatchStatusSuccess',
            enum: ['failed', 'success'],
            type: 'string',
            'x-go-enum-desc':
              'failed CourierMessageDispatchStatusFailed\nsuccess CourierMessageDispatchStatusSuccess',
          },
          updated_at: {
            description: 'UpdatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
        },
        required: ['id', 'message_id', 'status', 'created_at', 'updated_at'],
        type: 'object',
      },
      needsPrivilegedSessionError: {
        properties: {
          error: {
            $ref: '#/components/schemas/genericError',
          },
          redirect_browser_to: {
            description: 'Points to where to redirect the user to next.',
            type: 'string',
          },
        },
        required: ['redirect_browser_to'],
        title: 'Is sent when a privileged session is required to perform the settings update.',
        type: 'object',
      },
      nullDuration: {
        nullable: true,
        pattern: '^[0-9]+(ns|us|ms|s|m|h)$',
        type: 'string',
      },
      nullInt64: {
        nullable: true,
        type: 'integer',
      },
      nullJsonRawMessage: {
        description:
          'NullJSONRawMessage represents a json.RawMessage that works well with JSON, SQL, and Swagger and is NULLable-',
        nullable: true,
      },
      nullTime: {
        format: 'date-time',
        title: 'NullTime implements sql.NullTime functionality.',
        type: 'string',
      },
      pagination: {
        properties: {
          page: {
            default: 1,
            description:
              'Pagination Page\n\nThis value is currently an integer, but it is not sequential. The value is not the page number, but a\nreference. The next page can be any number and some numbers might return an empty list.\n\nFor example, page 2 might not follow after page 1. And even if page 3 and 5 exist, but page 4 might not exist.',
            format: 'int64',
            minimum: 1,
            type: 'integer',
          },
          per_page: {
            default: 250,
            description: 'Items per Page\n\nThis is the number of items per page.',
            format: 'int64',
            maximum: 1000,
            minimum: 1,
            type: 'integer',
          },
        },
        type: 'object',
      },
      patchIdentitiesBody: {
        description: 'Patch Identities Body',
        properties: {
          identities: {
            description: 'Identities holds the list of patches to apply\n\nrequired',
            items: {
              $ref: '#/components/schemas/identityPatch',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
      performNativeLogoutBody: {
        description: 'Perform Native Logout Request Body',
        properties: {
          session_token: {
            description: 'The Session Token\n\nInvalidate this session token.',
            type: 'string',
          },
        },
        required: ['session_token'],
        type: 'object',
      },
      recoveryCodeForIdentity: {
        description: 'Used when an administrator creates a recovery code for an identity.',
        properties: {
          expires_at: {
            description:
              'Expires At is the timestamp of when the recovery flow expires\n\nThe timestamp when the recovery link expires.',
            format: 'date-time',
            type: 'string',
          },
          recovery_code: {
            description: 'RecoveryCode is the code that can be used to recover the account',
            type: 'string',
          },
          recovery_link: {
            description:
              'RecoveryLink with flow\n\nThis link opens the recovery UI with an empty `code` field.',
            type: 'string',
          },
        },
        required: ['recovery_link', 'recovery_code'],
        title: 'Recovery Code for Identity',
        type: 'object',
      },
      recoveryFlow: {
        description:
          'This request is used when an identity wants to recover their account.\n\nWe recommend reading the [Account Recovery Documentation](../self-service/flows/password-reset-account-recovery)',
        properties: {
          active: {
            description:
              'Active, if set, contains the recovery method that is being used. It is initially\nnot set.',
            type: 'string',
          },
          expires_at: {
            description:
              'ExpiresAt is the time (UTC) when the request expires. If the user still wishes to update the setting,\na new request has to be initiated.',
            format: 'date-time',
            type: 'string',
          },
          id: {
            description:
              "ID represents the request's unique ID. When performing the recovery flow, this\nrepresents the id in the recovery ui's query parameter: http://\u003cselfservice.flows.recovery.ui_url\u003e?request=\u003cid\u003e",
            format: 'uuid',
            type: 'string',
          },
          issued_at: {
            description: 'IssuedAt is the time (UTC) when the request occurred.',
            format: 'date-time',
            type: 'string',
          },
          request_url: {
            description:
              "RequestURL is the initial URL that was requested from Ory Kratos. It can be used\nto forward information contained in the URL's path or query for example.",
            type: 'string',
          },
          return_to: {
            description: 'ReturnTo contains the requested return_to URL.',
            type: 'string',
          },
          state: {
            $ref: '#/components/schemas/recoveryFlowState',
          },
          type: {
            $ref: '#/components/schemas/selfServiceFlowType',
          },
          ui: {
            $ref: '#/components/schemas/uiContainer',
          },
        },
        required: ['id', 'type', 'expires_at', 'issued_at', 'request_url', 'ui', 'state'],
        title: 'A Recovery Flow',
        type: 'object',
      },
      recoveryFlowState: {
        description:
          'The state represents the state of the recovery flow.\n\nchoose_method: ask the user to choose a method (e.g. recover account via email)\nsent_email: the email has been sent to the user\npassed_challenge: the request was successful and the recovery challenge was passed.',
        enum: ['choose_method', 'sent_email', 'passed_challenge'],
        title: 'Recovery Flow State',
        type: 'string',
      },
      recoveryIdentityAddress: {
        properties: {
          created_at: {
            description: 'CreatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          id: {
            format: 'uuid',
            type: 'string',
          },
          updated_at: {
            description: 'UpdatedAt is a helper struct field for gobuffalo.pop.',
            format: 'date-time',
            type: 'string',
          },
          value: {
            type: 'string',
          },
          via: {
            $ref: '#/components/schemas/RecoveryAddressType',
          },
        },
        required: ['id', 'value', 'via'],
        type: 'object',
      },
      recoveryLinkForIdentity: {
        description: 'Used when an administrator creates a recovery link for an identity.',
        properties: {
          expires_at: {
            description:
              'Recovery Link Expires At\n\nThe timestamp when the recovery link expires.',
            format: 'date-time',
            type: 'string',
          },
          recovery_link: {
            description: 'Recovery Link\n\nThis link can be used to recover the account.',
            type: 'string',
          },
        },
        required: ['recovery_link'],
        title: 'Identity Recovery Link',
        type: 'object',
      },
      registrationFlow: {
        properties: {
          active: {
            $ref: '#/components/schemas/identityCredentialsType',
          },
          expires_at: {
            description:
              'ExpiresAt is the time (UTC) when the flow expires. If the user still wishes to log in,\na new flow has to be initiated.',
            format: 'date-time',
            type: 'string',
          },
          id: {
            description:
              "ID represents the flow's unique ID. When performing the registration flow, this\nrepresents the id in the registration ui's query parameter: http://\u003cselfservice.flows.registration.ui_url\u003e/?flow=\u003cid\u003e",
            format: 'uuid',
            type: 'string',
          },
          issued_at: {
            description: 'IssuedAt is the time (UTC) when the flow occurred.',
            format: 'date-time',
            type: 'string',
          },
          oauth2_login_challenge: {
            description:
              'Ory OAuth 2.0 Login Challenge.\n\nThis value is set using the `login_challenge` query parameter of the registration and login endpoints.\nIf set will cooperate with Ory OAuth2 and OpenID to act as an OAuth2 server / OpenID Provider.',
            type: 'string',
          },
          oauth2_login_request: {
            $ref: '#/components/schemas/OAuth2LoginRequest',
          },
          request_url: {
            description:
              "RequestURL is the initial URL that was requested from Ory Kratos. It can be used\nto forward information contained in the URL's path or query for example.",
            type: 'string',
          },
          return_to: {
            description: 'ReturnTo contains the requested return_to URL.',
            type: 'string',
          },
          session_token_exchange_code: {
            description:
              'SessionTokenExchangeCode holds the secret code that the client can use to retrieve a session token after the flow has been completed.\nThis is only set if the client has requested a session token exchange code, and if the flow is of type "api",\nand only on creating the flow.',
            type: 'string',
          },
          transient_payload: {
            description: 'TransientPayload is used to pass data from the registration to a webhook',
            type: 'object',
          },
          type: {
            $ref: '#/components/schemas/selfServiceFlowType',
          },
          ui: {
            $ref: '#/components/schemas/uiContainer',
          },
        },
        required: ['id', 'type', 'expires_at', 'issued_at', 'request_url', 'ui'],
        type: 'object',
      },
      selfServiceFlowExpiredError: {
        description: 'Is sent when a flow is expired',
        properties: {
          error: {
            $ref: '#/components/schemas/genericError',
          },
          expired_at: {
            description: 'When the flow has expired',
            format: 'date-time',
            type: 'string',
          },
          since: {
            $ref: '#/components/schemas/Duration',
          },
          use_flow_id: {
            description:
              'The flow ID that should be used for the new flow as it contains the correct messages.',
            format: 'uuid',
            type: 'string',
          },
        },
        type: 'object',
      },
      selfServiceFlowType: {
        description: 'The flow type can either be `api` or `browser`.',
        title: 'Type is the flow type.',
        type: 'string',
      },
      session: {
        description: 'A Session',
        properties: {
          active: {
            description: 'Active state. If false the session is no longer active.',
            type: 'boolean',
          },
          authenticated_at: {
            description:
              'The Session Authentication Timestamp\n\nWhen this session was authenticated at. If multi-factor authentication was used this\nis the time when the last factor was authenticated (e.g. the TOTP code challenge was completed).',
            format: 'date-time',
            type: 'string',
          },
          authentication_methods: {
            $ref: '#/components/schemas/sessionAuthenticationMethods',
          },
          authenticator_assurance_level: {
            $ref: '#/components/schemas/authenticatorAssuranceLevel',
          },
          devices: {
            description: 'Devices has history of all endpoints where the session was used',
            items: {
              $ref: '#/components/schemas/sessionDevice',
            },
            type: 'array',
          },
          expires_at: {
            description: 'The Session Expiry\n\nWhen this session expires at.',
            format: 'date-time',
            type: 'string',
          },
          id: {
            description: 'Session ID',
            format: 'uuid',
            type: 'string',
          },
          identity: {
            $ref: '#/components/schemas/identity',
          },
          issued_at: {
            description:
              'The Session Issuance Timestamp\n\nWhen this session was issued at. Usually equal or close to `authenticated_at`.',
            format: 'date-time',
            type: 'string',
          },
        },
        required: ['id', 'identity'],
        type: 'object',
      },
      sessionAuthenticationMethod: {
        description: 'A singular authenticator used during authentication / login.',
        properties: {
          aal: {
            $ref: '#/components/schemas/authenticatorAssuranceLevel',
          },
          completed_at: {
            description: 'When the authentication challenge was completed.',
            format: 'date-time',
            type: 'string',
          },
          method: {
            enum: [
              'link_recovery',
              'code_recovery',
              'password',
              'totp',
              'oidc',
              'webauthn',
              'lookup_secret',
              'v0.6_legacy_session',
            ],
            title: 'The method used',
            type: 'string',
          },
          provider: {
            description: 'OIDC or SAML provider id used for authentication',
            type: 'string',
          },
        },
        title: 'AuthenticationMethod identifies an authentication method',
        type: 'object',
      },
      sessionAuthenticationMethods: {
        description: 'A list of authenticators which were used to authenticate the session.',
        items: {
          $ref: '#/components/schemas/sessionAuthenticationMethod',
        },
        title: 'List of (Used) AuthenticationMethods',
        type: 'array',
      },
      sessionDevice: {
        description: 'Device corresponding to a Session',
        properties: {
          id: {
            description: 'Device record ID',
            format: 'uuid',
            type: 'string',
          },
          ip_address: {
            description: 'IPAddress of the client',
            type: 'string',
          },
          location: {
            description: 'Geo Location corresponding to the IP Address',
            type: 'string',
          },
          user_agent: {
            description: 'UserAgent of the client',
            type: 'string',
          },
        },
        required: ['id'],
        type: 'object',
      },
      settingsFlow: {
        description:
          'This flow is used when an identity wants to update settings\n(e.g. profile data, passwords, ...) in a selfservice manner.\n\nWe recommend reading the [User Settings Documentation](../self-service/flows/user-settings)',
        properties: {
          active: {
            description:
              'Active, if set, contains the registration method that is being used. It is initially\nnot set.',
            type: 'string',
          },
          continue_with: {
            description:
              "Contains a list of actions, that could follow this flow\n\nIt can, for example, contain a reference to the verification flow, created as part of the user's\nregistration.",
            items: {
              $ref: '#/components/schemas/continueWith',
            },
            type: 'array',
          },
          expires_at: {
            description:
              'ExpiresAt is the time (UTC) when the flow expires. If the user still wishes to update the setting,\na new flow has to be initiated.',
            format: 'date-time',
            type: 'string',
          },
          id: {
            description:
              "ID represents the flow's unique ID. When performing the settings flow, this\nrepresents the id in the settings ui's query parameter: http://\u003cselfservice.flows.settings.ui_url\u003e?flow=\u003cid\u003e",
            format: 'uuid',
            type: 'string',
          },
          identity: {
            $ref: '#/components/schemas/identity',
          },
          issued_at: {
            description: 'IssuedAt is the time (UTC) when the flow occurred.',
            format: 'date-time',
            type: 'string',
          },
          request_url: {
            description:
              "RequestURL is the initial URL that was requested from Ory Kratos. It can be used\nto forward information contained in the URL's path or query for example.",
            type: 'string',
          },
          return_to: {
            description: 'ReturnTo contains the requested return_to URL.',
            type: 'string',
          },
          state: {
            $ref: '#/components/schemas/settingsFlowState',
          },
          type: {
            $ref: '#/components/schemas/selfServiceFlowType',
          },
          ui: {
            $ref: '#/components/schemas/uiContainer',
          },
        },
        required: [
          'id',
          'type',
          'expires_at',
          'issued_at',
          'request_url',
          'ui',
          'identity',
          'state',
        ],
        title: 'Flow represents a Settings Flow',
        type: 'object',
      },
      settingsFlowState: {
        description:
          'show_form: No user data has been collected, or it is invalid, and thus the form should be shown.\nsuccess: Indicates that the settings flow has been updated successfully with the provided data.\nDone will stay true when repeatedly checking. If set to true, done will revert back to false only\nwhen a flow with invalid (e.g. "please use a valid phone number") data was sent.',
        enum: ['show_form', 'success'],
        title: 'State represents the state of this flow. It knows two states:',
        type: 'string',
      },
      successfulCodeExchangeResponse: {
        description: 'The Response for Registration Flows via API',
        properties: {
          session: {
            $ref: '#/components/schemas/session',
          },
          session_token: {
            description:
              'The Session Token\n\nA session token is equivalent to a session cookie, but it can be sent in the HTTP Authorization\nHeader:\n\nAuthorization: bearer ${session-token}\n\nThe session token is only issued for API flows, not for Browser flows!',
            type: 'string',
          },
        },
        required: ['session'],
        type: 'object',
      },
      successfulNativeLogin: {
        description: 'The Response for Login Flows via API',
        properties: {
          session: {
            $ref: '#/components/schemas/session',
          },
          session_token: {
            description:
              'The Session Token\n\nA session token is equivalent to a session cookie, but it can be sent in the HTTP Authorization\nHeader:\n\nAuthorization: bearer ${session-token}\n\nThe session token is only issued for API flows, not for Browser flows!',
            type: 'string',
          },
        },
        required: ['session'],
        type: 'object',
      },
      successfulNativeRegistration: {
        description: 'The Response for Registration Flows via API',
        properties: {
          continue_with: {
            description:
              "Contains a list of actions, that could follow this flow\n\nIt can, for example, this will contain a reference to the verification flow, created as part of the user's\nregistration or the token of the session.",
            items: {
              $ref: '#/components/schemas/continueWith',
            },
            type: 'array',
          },
          identity: {
            $ref: '#/components/schemas/identity',
          },
          session: {
            $ref: '#/components/schemas/session',
          },
          session_token: {
            description:
              'The Session Token\n\nThis field is only set when the session hook is configured as a post-registration hook.\n\nA session token is equivalent to a session cookie, but it can be sent in the HTTP Authorization\nHeader:\n\nAuthorization: bearer ${session-token}\n\nThe session token is only issued for API flows, not for Browser flows!',
            type: 'string',
          },
        },
        required: ['identity'],
        type: 'object',
      },
      tokenPagination: {
        properties: {
          page_size: {
            default: 250,
            description:
              'Items per page\n\nThis is the number of items per page to return.\nFor details on pagination please head over to the [pagination documentation](https://www.ory.sh/docs/ecosystem/api-design#pagination).',
            format: 'int64',
            maximum: 1000,
            minimum: 1,
            type: 'integer',
          },
          page_token: {
            default: '1',
            description:
              'Next Page Token\n\nThe next page token.\nFor details on pagination please head over to the [pagination documentation](https://www.ory.sh/docs/ecosystem/api-design#pagination).',
            minimum: 1,
            type: 'string',
          },
        },
        type: 'object',
      },
      tokenPaginationHeaders: {
        properties: {
          link: {
            description:
              'The link header contains pagination links.\n\nFor details on pagination please head over to the [pagination documentation](https://www.ory.sh/docs/ecosystem/api-design#pagination).\n\nin: header',
            type: 'string',
          },
          'x-total-count': {
            description: 'The total number of clients.\n\nin: header',
            type: 'string',
          },
        },
        type: 'object',
      },
      uiContainer: {
        description:
          'Container represents a HTML Form. The container can work with both HTTP Form and JSON requests',
        properties: {
          action: {
            description:
              'Action should be used as the form action URL `\u003cform action="{{ .Action }}" method="post"\u003e`.',
            type: 'string',
          },
          messages: {
            $ref: '#/components/schemas/uiTexts',
          },
          method: {
            description: 'Method is the form method (e.g. POST)',
            type: 'string',
          },
          nodes: {
            $ref: '#/components/schemas/uiNodes',
          },
        },
        required: ['action', 'method', 'nodes'],
        type: 'object',
      },
      uiNode: {
        description:
          'Nodes are represented as HTML elements or their native UI equivalents. For example,\na node can be an `\u003cimg\u003e` tag, or an `\u003cinput element\u003e` but also `some plain text`.',
        properties: {
          attributes: {
            $ref: '#/components/schemas/uiNodeAttributes',
          },
          group: {
            description:
              'Group specifies which group (e.g. password authenticator) this node belongs to.\ndefault DefaultGroup\npassword PasswordGroup\noidc OpenIDConnectGroup\nprofile ProfileGroup\nlink LinkGroup\ncode CodeGroup\ntotp TOTPGroup\nlookup_secret LookupGroup\nwebauthn WebAuthnGroup',
            enum: [
              'default',
              'password',
              'oidc',
              'profile',
              'link',
              'code',
              'totp',
              'lookup_secret',
              'webauthn',
            ],
            type: 'string',
            'x-go-enum-desc':
              'default DefaultGroup\npassword PasswordGroup\noidc OpenIDConnectGroup\nprofile ProfileGroup\nlink LinkGroup\ncode CodeGroup\ntotp TOTPGroup\nlookup_secret LookupGroup\nwebauthn WebAuthnGroup',
          },
          messages: {
            $ref: '#/components/schemas/uiTexts',
          },
          meta: {
            $ref: '#/components/schemas/uiNodeMeta',
          },
          type: {
            description:
              "The node's type\ntext Text\ninput Input\nimg Image\na Anchor\nscript Script",
            enum: ['text', 'input', 'img', 'a', 'script'],
            type: 'string',
            'x-go-enum-desc': 'text Text\ninput Input\nimg Image\na Anchor\nscript Script',
          },
        },
        required: ['type', 'group', 'attributes', 'messages', 'meta'],
        title: "Node represents a flow's nodes",
        type: 'object',
      },
      uiNodeAnchorAttributes: {
        properties: {
          href: {
            description: "The link's href (destination) URL.\n\nformat: uri",
            type: 'string',
          },
          id: {
            description: 'A unique identifier',
            type: 'string',
          },
          node_type: {
            description:
              'NodeType represents this node\'s types. It is a mirror of `node.type` and\nis primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "a".',
            type: 'string',
          },
          title: {
            $ref: '#/components/schemas/uiText',
          },
        },
        required: ['href', 'title', 'id', 'node_type'],
        title: 'AnchorAttributes represents the attributes of an anchor node.',
        type: 'object',
      },
      uiNodeAttributes: {
        discriminator: {
          mapping: {
            a: '#/components/schemas/uiNodeAnchorAttributes',
            img: '#/components/schemas/uiNodeImageAttributes',
            input: '#/components/schemas/uiNodeInputAttributes',
            script: '#/components/schemas/uiNodeScriptAttributes',
            text: '#/components/schemas/uiNodeTextAttributes',
          },
          propertyName: 'node_type',
        },
        oneOf: [
          {
            $ref: '#/components/schemas/uiNodeInputAttributes',
          },
          {
            $ref: '#/components/schemas/uiNodeTextAttributes',
          },
          {
            $ref: '#/components/schemas/uiNodeImageAttributes',
          },
          {
            $ref: '#/components/schemas/uiNodeAnchorAttributes',
          },
          {
            $ref: '#/components/schemas/uiNodeScriptAttributes',
          },
        ],
        title: 'Attributes represents a list of attributes (e.g. `href="foo"` for links).',
      },
      uiNodeImageAttributes: {
        properties: {
          height: {
            description: 'Height of the image',
            format: 'int64',
            type: 'integer',
          },
          id: {
            description: 'A unique identifier',
            type: 'string',
          },
          node_type: {
            description:
              'NodeType represents this node\'s types. It is a mirror of `node.type` and\nis primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "img".',
            type: 'string',
          },
          src: {
            description: "The image's source URL.\n\nformat: uri",
            type: 'string',
          },
          width: {
            description: 'Width of the image',
            format: 'int64',
            type: 'integer',
          },
        },
        required: ['src', 'id', 'width', 'height', 'node_type'],
        title: 'ImageAttributes represents the attributes of an image node.',
        type: 'object',
      },
      uiNodeInputAttributes: {
        description: 'InputAttributes represents the attributes of an input node',
        properties: {
          autocomplete: {
            description:
              'The autocomplete attribute for the input.\nemail InputAttributeAutocompleteEmail\ntel InputAttributeAutocompleteTel\nurl InputAttributeAutocompleteUrl\ncurrent-password InputAttributeAutocompleteCurrentPassword\nnew-password InputAttributeAutocompleteNewPassword\none-time-code InputAttributeAutocompleteOneTimeCode',
            enum: ['email', 'tel', 'url', 'current-password', 'new-password', 'one-time-code'],
            type: 'string',
            'x-go-enum-desc':
              'email InputAttributeAutocompleteEmail\ntel InputAttributeAutocompleteTel\nurl InputAttributeAutocompleteUrl\ncurrent-password InputAttributeAutocompleteCurrentPassword\nnew-password InputAttributeAutocompleteNewPassword\none-time-code InputAttributeAutocompleteOneTimeCode',
          },
          disabled: {
            description: "Sets the input's disabled field to true or false.",
            type: 'boolean',
          },
          label: {
            $ref: '#/components/schemas/uiText',
          },
          name: {
            description: "The input's element name.",
            type: 'string',
          },
          node_type: {
            description:
              'NodeType represents this node\'s types. It is a mirror of `node.type` and\nis primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "input".',
            type: 'string',
          },
          onclick: {
            description:
              'OnClick may contain javascript which should be executed on click. This is primarily\nused for WebAuthn.',
            type: 'string',
          },
          pattern: {
            description: "The input's pattern.",
            type: 'string',
          },
          required: {
            description: 'Mark this input field as required.',
            type: 'boolean',
          },
          type: {
            description:
              "The input's element type.\ntext InputAttributeTypeText\npassword InputAttributeTypePassword\nnumber InputAttributeTypeNumber\ncheckbox InputAttributeTypeCheckbox\nhidden InputAttributeTypeHidden\nemail InputAttributeTypeEmail\ntel InputAttributeTypeTel\nsubmit InputAttributeTypeSubmit\nbutton InputAttributeTypeButton\ndatetime-local InputAttributeTypeDateTimeLocal\ndate InputAttributeTypeDate\nurl InputAttributeTypeURI",
            enum: [
              'text',
              'password',
              'number',
              'checkbox',
              'hidden',
              'email',
              'tel',
              'submit',
              'button',
              'datetime-local',
              'date',
              'url',
            ],
            type: 'string',
            'x-go-enum-desc':
              'text InputAttributeTypeText\npassword InputAttributeTypePassword\nnumber InputAttributeTypeNumber\ncheckbox InputAttributeTypeCheckbox\nhidden InputAttributeTypeHidden\nemail InputAttributeTypeEmail\ntel InputAttributeTypeTel\nsubmit InputAttributeTypeSubmit\nbutton InputAttributeTypeButton\ndatetime-local InputAttributeTypeDateTimeLocal\ndate InputAttributeTypeDate\nurl InputAttributeTypeURI',
          },
          value: {
            description: "The input's value.",
            nullable: true,
          },
        },
        required: ['name', 'type', 'disabled', 'node_type'],
        type: 'object',
      },
      uiNodeMeta: {
        description:
          'This might include a label and other information that can optionally\nbe used to render UIs.',
        properties: {
          label: {
            $ref: '#/components/schemas/uiText',
          },
        },
        title: "A Node's Meta Information",
        type: 'object',
      },
      uiNodeScriptAttributes: {
        properties: {
          async: {
            description: 'The script async type',
            type: 'boolean',
          },
          crossorigin: {
            description: 'The script cross origin policy',
            type: 'string',
          },
          id: {
            description: 'A unique identifier',
            type: 'string',
          },
          integrity: {
            description: "The script's integrity hash",
            type: 'string',
          },
          node_type: {
            description:
              'NodeType represents this node\'s types. It is a mirror of `node.type` and\nis primarily used to allow compatibility with OpenAPI 3.0. In this struct it technically always is "script".',
            type: 'string',
          },
          nonce: {
            description:
              'Nonce for CSP\n\nA nonce you may want to use to improve your Content Security Policy.\nYou do not have to use this value but if you want to improve your CSP\npolicies you may use it. You can also choose to use your own nonce value!',
            type: 'string',
          },
          referrerpolicy: {
            description: 'The script referrer policy',
            type: 'string',
          },
          src: {
            description: 'The script source',
            type: 'string',
          },
          type: {
            description: 'The script MIME type',
            type: 'string',
          },
        },
        required: [
          'src',
          'async',
          'referrerpolicy',
          'crossorigin',
          'integrity',
          'type',
          'id',
          'nonce',
          'node_type',
        ],
        title: 'ScriptAttributes represent script nodes which load javascript.',
        type: 'object',
      },
      uiNodeTextAttributes: {
        properties: {
          id: {
            description: 'A unique identifier',
            type: 'string',
          },
          node_type: {
            description:
              'NodeType represents this node\'s types. It is a mirror of `node.type` and\nis primarily used to allow compatibility with OpenAPI 3.0.  In this struct it technically always is "text".',
            type: 'string',
          },
          text: {
            $ref: '#/components/schemas/uiText',
          },
        },
        required: ['text', 'id', 'node_type'],
        title: 'TextAttributes represents the attributes of a text node.',
        type: 'object',
      },
      uiNodes: {
        items: {
          $ref: '#/components/schemas/uiNode',
        },
        type: 'array',
      },
      uiText: {
        properties: {
          context: {
            description: "The message's context. Useful when customizing messages.",
            type: 'object',
          },
          id: {
            $ref: '#/components/schemas/ID',
          },
          text: {
            description: 'The message text. Written in american english.',
            type: 'string',
          },
          type: {
            description: 'The message type.\ninfo Info\nerror Error\nsuccess Success',
            enum: ['info', 'error', 'success'],
            type: 'string',
            'x-go-enum-desc': 'info Info\nerror Error\nsuccess Success',
          },
        },
        required: ['id', 'text', 'type'],
        type: 'object',
      },
      uiTexts: {
        items: {
          $ref: '#/components/schemas/uiText',
        },
        type: 'array',
      },
      unexpectedError: {
        type: 'string',
      },
      updateIdentityBody: {
        description: 'Update Identity Body',
        properties: {
          credentials: {
            $ref: '#/components/schemas/identityWithCredentials',
          },
          metadata_admin: {
            description:
              'Store metadata about the user which is only accessible through admin APIs such as `GET /admin/identities/\u003cid\u003e`.',
          },
          metadata_public: {
            description:
              'Store metadata about the identity which the identity itself can see when calling for example the\nsession endpoint. Do not store sensitive information (e.g. credit score) about the identity in this field.',
          },
          schema_id: {
            description:
              "SchemaID is the ID of the JSON Schema to be used for validating the identity's traits. If set\nwill update the Identity's SchemaID.",
            type: 'string',
          },
          state: {
            $ref: '#/components/schemas/identityState',
          },
          traits: {
            description:
              "Traits represent an identity's traits. The identity is able to create, modify, and delete traits\nin a self-service manner. The input will always be validated against the JSON Schema defined\nin `schema_id`.",
            type: 'object',
          },
        },
        required: ['schema_id', 'traits', 'state'],
        type: 'object',
      },
      updateLoginFlowBody: {
        discriminator: {
          mapping: {
            lookup_secret: '#/components/schemas/updateLoginFlowWithLookupSecretMethod',
            oidc: '#/components/schemas/updateLoginFlowWithOidcMethod',
            password: '#/components/schemas/updateLoginFlowWithPasswordMethod',
            totp: '#/components/schemas/updateLoginFlowWithTotpMethod',
            webauthn: '#/components/schemas/updateLoginFlowWithWebAuthnMethod',
          },
          propertyName: 'method',
        },
        oneOf: [
          {
            $ref: '#/components/schemas/updateLoginFlowWithPasswordMethod',
          },
          {
            $ref: '#/components/schemas/updateLoginFlowWithOidcMethod',
          },
          {
            $ref: '#/components/schemas/updateLoginFlowWithTotpMethod',
          },
          {
            $ref: '#/components/schemas/updateLoginFlowWithWebAuthnMethod',
          },
          {
            $ref: '#/components/schemas/updateLoginFlowWithLookupSecretMethod',
          },
        ],
      },
      updateLoginFlowWithLookupSecretMethod: {
        description: 'Update Login Flow with Lookup Secret Method',
        properties: {
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          lookup_secret: {
            description: 'The lookup secret.',
            type: 'string',
          },
          method: {
            description:
              'Method should be set to "lookup_secret" when logging in using the lookup_secret strategy.',
            type: 'string',
          },
        },
        required: ['method', 'lookup_secret'],
        type: 'object',
      },
      updateLoginFlowWithOidcMethod: {
        description: 'Update Login Flow with OpenID Connect Method',
        properties: {
          csrf_token: {
            description: 'The CSRF Token',
            type: 'string',
          },
          method: {
            description:
              'Method to use\n\nThis field must be set to `oidc` when using the oidc method.',
            type: 'string',
          },
          provider: {
            description: 'The provider to register with',
            type: 'string',
          },
          traits: {
            description: 'The identity traits. This is a placeholder for the registration flow.',
            type: 'object',
          },
          upstream_parameters: {
            description:
              'UpstreamParameters are the parameters that are passed to the upstream identity provider.\n\nThese parameters are optional and depend on what the upstream identity provider supports.\nSupported parameters are:\n`login_hint` (string): The `login_hint` parameter suppresses the account chooser and either pre-fills the email box on the sign-in form, or selects the proper session.\n`hd` (string): The `hd` parameter limits the login/registration process to a Google Organization, e.g. `mycollege.edu`.\n`prompt` (string): The `prompt` specifies whether the Authorization Server prompts the End-User for reauthentication and consent, e.g. `select_account`.',
            type: 'object',
          },
        },
        required: ['provider', 'method'],
        type: 'object',
      },
      updateLoginFlowWithPasswordMethod: {
        description: 'Update Login Flow with Password Method',
        properties: {
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          identifier: {
            description: 'Identifier is the email or username of the user trying to log in.',
            type: 'string',
          },
          method: {
            description:
              'Method should be set to "password" when logging in using the identifier and password strategy.',
            type: 'string',
          },
          password: {
            description: "The user's password.",
            type: 'string',
          },
          password_identifier: {
            description:
              'Identifier is the email or username of the user trying to log in.\nThis field is deprecated!',
            type: 'string',
          },
        },
        required: ['method', 'password', 'identifier'],
        type: 'object',
      },
      updateLoginFlowWithTotpMethod: {
        description: 'Update Login Flow with TOTP Method',
        properties: {
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          method: {
            description: 'Method should be set to "totp" when logging in using the TOTP strategy.',
            type: 'string',
          },
          totp_code: {
            description: 'The TOTP code.',
            type: 'string',
          },
        },
        required: ['method', 'totp_code'],
        type: 'object',
      },
      updateLoginFlowWithWebAuthnMethod: {
        description: 'Update Login Flow with WebAuthn Method',
        properties: {
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          identifier: {
            description: 'Identifier is the email or username of the user trying to log in.',
            type: 'string',
          },
          method: {
            description:
              'Method should be set to "webAuthn" when logging in using the WebAuthn strategy.',
            type: 'string',
          },
          webauthn_login: {
            description:
              'Login a WebAuthn Security Key\n\nThis must contain the ID of the WebAuthN connection.',
            type: 'string',
          },
        },
        required: ['identifier', 'method'],
        type: 'object',
      },
      updateRecoveryFlowBody: {
        description: 'Update Recovery Flow Request Body',
        discriminator: {
          mapping: {
            code: '#/components/schemas/updateRecoveryFlowWithCodeMethod',
            link: '#/components/schemas/updateRecoveryFlowWithLinkMethod',
          },
          propertyName: 'method',
        },
        oneOf: [
          {
            $ref: '#/components/schemas/updateRecoveryFlowWithLinkMethod',
          },
          {
            $ref: '#/components/schemas/updateRecoveryFlowWithCodeMethod',
          },
        ],
      },
      updateRecoveryFlowWithCodeMethod: {
        description: 'Update Recovery Flow with Code Method',
        properties: {
          code: {
            description:
              'Code from the recovery email\n\nIf you want to submit a code, use this field, but make sure to _not_ include the email field, as well.',
            type: 'string',
          },
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          email: {
            description:
              'The email address of the account to recover\n\nIf the email belongs to a valid account, a recovery email will be sent.\n\nIf you want to notify the email address if the account does not exist, see\nthe [notify_unknown_recipients flag](https://www.ory.sh/docs/kratos/self-service/flows/account-recovery-password-reset#attempted-recovery-notifications)\n\nIf a code was already sent, including this field in the payload will invalidate the sent code and re-send a new code.\n\nformat: email',
            type: 'string',
          },
          method: {
            description:
              'Method is the method that should be used for this recovery flow\n\nAllowed values are `link` and `code`.\nlink RecoveryStrategyLink\ncode RecoveryStrategyCode',
            enum: ['link', 'code'],
            type: 'string',
            'x-go-enum-desc': 'link RecoveryStrategyLink\ncode RecoveryStrategyCode',
          },
        },
        required: ['method'],
        type: 'object',
      },
      updateRecoveryFlowWithLinkMethod: {
        description: 'Update Recovery Flow with Link Method',
        properties: {
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          email: {
            description:
              'Email to Recover\n\nNeeds to be set when initiating the flow. If the email is a registered\nrecovery email, a recovery link will be sent. If the email is not known,\na email with details on what happened will be sent instead.\n\nformat: email',
            type: 'string',
          },
          method: {
            description:
              'Method is the method that should be used for this recovery flow\n\nAllowed values are `link` and `code`\nlink RecoveryStrategyLink\ncode RecoveryStrategyCode',
            enum: ['link', 'code'],
            type: 'string',
            'x-go-enum-desc': 'link RecoveryStrategyLink\ncode RecoveryStrategyCode',
          },
        },
        required: ['email', 'method'],
        type: 'object',
      },
      updateRegistrationFlowBody: {
        description: 'Update Registration Request Body',
        discriminator: {
          mapping: {
            oidc: '#/components/schemas/updateRegistrationFlowWithOidcMethod',
            password: '#/components/schemas/updateRegistrationFlowWithPasswordMethod',
            webauthn: '#/components/schemas/updateRegistrationFlowWithWebAuthnMethod',
          },
          propertyName: 'method',
        },
        oneOf: [
          {
            $ref: '#/components/schemas/updateRegistrationFlowWithPasswordMethod',
          },
          {
            $ref: '#/components/schemas/updateRegistrationFlowWithOidcMethod',
          },
          {
            $ref: '#/components/schemas/updateRegistrationFlowWithWebAuthnMethod',
          },
        ],
      },
      updateRegistrationFlowWithOidcMethod: {
        description: 'Update Registration Flow with OpenID Connect Method',
        properties: {
          csrf_token: {
            description: 'The CSRF Token',
            type: 'string',
          },
          method: {
            description:
              'Method to use\n\nThis field must be set to `oidc` when using the oidc method.',
            type: 'string',
          },
          provider: {
            description: 'The provider to register with',
            type: 'string',
          },
          traits: {
            description: 'The identity traits',
            type: 'object',
          },
          transient_payload: {
            description: 'Transient data to pass along to any webhooks',
            type: 'object',
          },
          upstream_parameters: {
            description:
              'UpstreamParameters are the parameters that are passed to the upstream identity provider.\n\nThese parameters are optional and depend on what the upstream identity provider supports.\nSupported parameters are:\n`login_hint` (string): The `login_hint` parameter suppresses the account chooser and either pre-fills the email box on the sign-in form, or selects the proper session.\n`hd` (string): The `hd` parameter limits the login/registration process to a Google Organization, e.g. `mycollege.edu`.\n`prompt` (string): The `prompt` specifies whether the Authorization Server prompts the End-User for reauthentication and consent, e.g. `select_account`.',
            type: 'object',
          },
        },
        required: ['provider', 'method'],
        type: 'object',
      },
      updateRegistrationFlowWithPasswordMethod: {
        description: 'Update Registration Flow with Password Method',
        properties: {
          csrf_token: {
            description: 'The CSRF Token',
            type: 'string',
          },
          method: {
            description:
              'Method to use\n\nThis field must be set to `password` when using the password method.',
            type: 'string',
          },
          password: {
            description: 'Password to sign the user up with',
            type: 'string',
          },
          traits: {
            description: "The identity's traits",
            type: 'object',
          },
          transient_payload: {
            description: 'Transient data to pass along to any webhooks',
            type: 'object',
          },
        },
        required: ['password', 'traits', 'method'],
        type: 'object',
      },
      updateRegistrationFlowWithWebAuthnMethod: {
        description: 'Update Registration Flow with WebAuthn Method',
        properties: {
          csrf_token: {
            description: 'CSRFToken is the anti-CSRF token',
            type: 'string',
          },
          method: {
            description:
              'Method\n\nShould be set to "webauthn" when trying to add, update, or remove a webAuthn pairing.',
            type: 'string',
          },
          traits: {
            description: "The identity's traits",
            type: 'object',
          },
          transient_payload: {
            description: 'Transient data to pass along to any webhooks',
            type: 'object',
          },
          webauthn_register: {
            description:
              'Register a WebAuthn Security Key\n\nIt is expected that the JSON returned by the WebAuthn registration process\nis included here.',
            type: 'string',
          },
          webauthn_register_displayname: {
            description:
              'Name of the WebAuthn Security Key to be Added\n\nA human-readable name for the security key which will be added.',
            type: 'string',
          },
        },
        required: ['traits', 'method'],
        type: 'object',
      },
      updateSettingsFlowBody: {
        description: 'Update Settings Flow Request Body',
        discriminator: {
          mapping: {
            lookup_secret: '#/components/schemas/updateSettingsFlowWithLookupMethod',
            oidc: '#/components/schemas/updateSettingsFlowWithOidcMethod',
            password: '#/components/schemas/updateSettingsFlowWithPasswordMethod',
            profile: '#/components/schemas/updateSettingsFlowWithProfileMethod',
            totp: '#/components/schemas/updateSettingsFlowWithTotpMethod',
            webauthn: '#/components/schemas/updateSettingsFlowWithWebAuthnMethod',
          },
          propertyName: 'method',
        },
        oneOf: [
          {
            $ref: '#/components/schemas/updateSettingsFlowWithPasswordMethod',
          },
          {
            $ref: '#/components/schemas/updateSettingsFlowWithProfileMethod',
          },
          {
            $ref: '#/components/schemas/updateSettingsFlowWithOidcMethod',
          },
          {
            $ref: '#/components/schemas/updateSettingsFlowWithOidcMethod',
          },
          {
            $ref: '#/components/schemas/updateSettingsFlowWithTotpMethod',
          },
          {
            $ref: '#/components/schemas/updateSettingsFlowWithWebAuthnMethod',
          },
          {
            $ref: '#/components/schemas/updateSettingsFlowWithLookupMethod',
          },
        ],
      },
      updateSettingsFlowWithLookupMethod: {
        description: 'Update Settings Flow with Lookup Method',
        properties: {
          csrf_token: {
            description: 'CSRFToken is the anti-CSRF token',
            type: 'string',
          },
          lookup_secret_confirm: {
            description: 'If set to true will save the regenerated lookup secrets',
            type: 'boolean',
          },
          lookup_secret_disable: {
            description: 'Disables this method if true.',
            type: 'boolean',
          },
          lookup_secret_regenerate: {
            description: 'If set to true will regenerate the lookup secrets',
            type: 'boolean',
          },
          lookup_secret_reveal: {
            description: 'If set to true will reveal the lookup secrets',
            type: 'boolean',
          },
          method: {
            description:
              'Method\n\nShould be set to "lookup" when trying to add, update, or remove a lookup pairing.',
            type: 'string',
          },
        },
        required: ['method'],
        type: 'object',
      },
      updateSettingsFlowWithOidcMethod: {
        description: 'Update Settings Flow with OpenID Connect Method',
        properties: {
          flow: {
            description: "Flow ID is the flow's ID.\n\nin: query",
            type: 'string',
          },
          link: {
            description:
              'Link this provider\n\nEither this or `unlink` must be set.\n\ntype: string\nin: body',
            type: 'string',
          },
          method: {
            description: 'Method\n\nShould be set to profile when trying to update a profile.',
            type: 'string',
          },
          traits: {
            description: "The identity's traits\n\nin: body",
            type: 'object',
          },
          unlink: {
            description:
              'Unlink this provider\n\nEither this or `link` must be set.\n\ntype: string\nin: body',
            type: 'string',
          },
          upstream_parameters: {
            description:
              'UpstreamParameters are the parameters that are passed to the upstream identity provider.\n\nThese parameters are optional and depend on what the upstream identity provider supports.\nSupported parameters are:\n`login_hint` (string): The `login_hint` parameter suppresses the account chooser and either pre-fills the email box on the sign-in form, or selects the proper session.\n`hd` (string): The `hd` parameter limits the login/registration process to a Google Organization, e.g. `mycollege.edu`.\n`prompt` (string): The `prompt` specifies whether the Authorization Server prompts the End-User for reauthentication and consent, e.g. `select_account`.',
            type: 'object',
          },
        },
        required: ['method'],
        type: 'object',
      },
      updateSettingsFlowWithPasswordMethod: {
        description: 'Update Settings Flow with Password Method',
        properties: {
          csrf_token: {
            description: 'CSRFToken is the anti-CSRF token',
            type: 'string',
          },
          method: {
            description: 'Method\n\nShould be set to password when trying to update a password.',
            type: 'string',
          },
          password: {
            description: 'Password is the updated password',
            type: 'string',
          },
        },
        required: ['password', 'method'],
        type: 'object',
      },
      updateSettingsFlowWithProfileMethod: {
        description: 'Update Settings Flow with Profile Method',
        properties: {
          csrf_token: {
            description:
              'The Anti-CSRF Token\n\nThis token is only required when performing browser flows.',
            type: 'string',
          },
          method: {
            description: 'Method\n\nShould be set to profile when trying to update a profile.',
            type: 'string',
          },
          traits: {
            description: "Traits\n\nThe identity's traits.",
            type: 'object',
          },
        },
        required: ['traits', 'method'],
        type: 'object',
      },
      updateSettingsFlowWithTotpMethod: {
        description: 'Update Settings Flow with TOTP Method',
        properties: {
          csrf_token: {
            description: 'CSRFToken is the anti-CSRF token',
            type: 'string',
          },
          method: {
            description:
              'Method\n\nShould be set to "totp" when trying to add, update, or remove a totp pairing.',
            type: 'string',
          },
          totp_code: {
            description: 'ValidationTOTP must contain a valid TOTP based on the',
            type: 'string',
          },
          totp_unlink: {
            description:
              'UnlinkTOTP if true will remove the TOTP pairing,\neffectively removing the credential. This can be used\nto set up a new TOTP device.',
            type: 'boolean',
          },
        },
        required: ['method'],
        type: 'object',
      },
      updateSettingsFlowWithWebAuthnMethod: {
        description: 'Update Settings Flow with WebAuthn Method',
        properties: {
          csrf_token: {
            description: 'CSRFToken is the anti-CSRF token',
            type: 'string',
          },
          method: {
            description:
              'Method\n\nShould be set to "webauthn" when trying to add, update, or remove a webAuthn pairing.',
            type: 'string',
          },
          webauthn_register: {
            description:
              'Register a WebAuthn Security Key\n\nIt is expected that the JSON returned by the WebAuthn registration process\nis included here.',
            type: 'string',
          },
          webauthn_register_displayname: {
            description:
              'Name of the WebAuthn Security Key to be Added\n\nA human-readable name for the security key which will be added.',
            type: 'string',
          },
          webauthn_remove: {
            description:
              'Remove a WebAuthn Security Key\n\nThis must contain the ID of the WebAuthN connection.',
            type: 'string',
          },
        },
        required: ['method'],
        type: 'object',
      },
      updateVerificationFlowBody: {
        description: 'Update Verification Flow Request Body',
        discriminator: {
          mapping: {
            code: '#/components/schemas/updateVerificationFlowWithCodeMethod',
            link: '#/components/schemas/updateVerificationFlowWithLinkMethod',
          },
          propertyName: 'method',
        },
        oneOf: [
          {
            $ref: '#/components/schemas/updateVerificationFlowWithLinkMethod',
          },
          {
            $ref: '#/components/schemas/updateVerificationFlowWithCodeMethod',
          },
        ],
      },
      updateVerificationFlowWithCodeMethod: {
        properties: {
          code: {
            description:
              'Code from the recovery email\n\nIf you want to submit a code, use this field, but make sure to _not_ include the email field, as well.',
            type: 'string',
          },
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          email: {
            description:
              'The email address to verify\n\nIf the email belongs to a valid account, a verifiation email will be sent.\n\nIf you want to notify the email address if the account does not exist, see\nthe [notify_unknown_recipients flag](https://www.ory.sh/docs/kratos/self-service/flows/verify-email-account-activation#attempted-verification-notifications)\n\nIf a code was already sent, including this field in the payload will invalidate the sent code and re-send a new code.\n\nformat: email',
            type: 'string',
          },
          method: {
            description:
              'Method is the method that should be used for this verification flow\n\nAllowed values are `link` and `code`.\nlink VerificationStrategyLink\ncode VerificationStrategyCode',
            enum: ['link', 'code'],
            type: 'string',
            'x-go-enum-desc': 'link VerificationStrategyLink\ncode VerificationStrategyCode',
          },
        },
        required: ['method'],
        type: 'object',
      },
      updateVerificationFlowWithLinkMethod: {
        description: 'Update Verification Flow with Link Method',
        properties: {
          csrf_token: {
            description: 'Sending the anti-csrf token is only required for browser login flows.',
            type: 'string',
          },
          email: {
            description:
              'Email to Verify\n\nNeeds to be set when initiating the flow. If the email is a registered\nverification email, a verification link will be sent. If the email is not known,\na email with details on what happened will be sent instead.\n\nformat: email',
            type: 'string',
          },
          method: {
            description:
              'Method is the method that should be used for this verification flow\n\nAllowed values are `link` and `code`\nlink VerificationStrategyLink\ncode VerificationStrategyCode',
            enum: ['link', 'code'],
            type: 'string',
            'x-go-enum-desc': 'link VerificationStrategyLink\ncode VerificationStrategyCode',
          },
        },
        required: ['email', 'method'],
        type: 'object',
      },
      verifiableIdentityAddress: {
        description: "VerifiableAddress is an identity's verifiable address",
        properties: {
          created_at: {
            description: 'When this entry was created',
            example: '2014-01-01T23:28:56.782Z',
            format: 'date-time',
            type: 'string',
          },
          id: {
            description: 'The ID',
            format: 'uuid',
            type: 'string',
          },
          status: {
            $ref: '#/components/schemas/identityVerifiableAddressStatus',
          },
          updated_at: {
            description: 'When this entry was last updated',
            example: '2014-01-01T23:28:56.782Z',
            format: 'date-time',
            type: 'string',
          },
          value: {
            description: 'The address value\n\nexample foo@user.com',
            type: 'string',
          },
          verified: {
            description: 'Indicates if the address has already been verified',
            example: true,
            type: 'boolean',
          },
          verified_at: {
            $ref: '#/components/schemas/nullTime',
          },
          via: {
            $ref: '#/components/schemas/identityVerifiableAddressType',
          },
        },
        required: ['value', 'verified', 'via', 'status'],
        type: 'object',
      },
      verificationFlow: {
        description:
          'Used to verify an out-of-band communication\nchannel such as an email address or a phone number.\n\nFor more information head over to: https://www.ory.sh/docs/kratos/self-service/flows/verify-email-account-activation',
        properties: {
          active: {
            description:
              'Active, if set, contains the registration method that is being used. It is initially\nnot set.',
            type: 'string',
          },
          expires_at: {
            description:
              'ExpiresAt is the time (UTC) when the request expires. If the user still wishes to verify the address,\na new request has to be initiated.',
            format: 'date-time',
            type: 'string',
          },
          id: {
            description:
              "ID represents the request's unique ID. When performing the verification flow, this\nrepresents the id in the verify ui's query parameter: http://\u003cselfservice.flows.verification.ui_url\u003e?request=\u003cid\u003e\n\ntype: string\nformat: uuid",
            format: 'uuid',
            type: 'string',
          },
          issued_at: {
            description: 'IssuedAt is the time (UTC) when the request occurred.',
            format: 'date-time',
            type: 'string',
          },
          request_url: {
            description:
              "RequestURL is the initial URL that was requested from Ory Kratos. It can be used\nto forward information contained in the URL's path or query for example.",
            type: 'string',
          },
          return_to: {
            description: 'ReturnTo contains the requested return_to URL.',
            type: 'string',
          },
          state: {
            $ref: '#/components/schemas/verificationFlowState',
          },
          type: {
            $ref: '#/components/schemas/selfServiceFlowType',
          },
          ui: {
            $ref: '#/components/schemas/uiContainer',
          },
        },
        required: ['id', 'type', 'ui', 'state'],
        title: 'A Verification Flow',
        type: 'object',
      },
      verificationFlowState: {
        description:
          'The state represents the state of the verification flow.\n\nchoose_method: ask the user to choose a method (e.g. recover account via email)\nsent_email: the email has been sent to the user\npassed_challenge: the request was successful and the recovery challenge was passed.',
        enum: ['choose_method', 'sent_email', 'passed_challenge'],
        title: 'Verification Flow State',
        type: 'string',
      },
      version: {
        properties: {
          version: {
            description: "Version is the service's version.",
            type: 'string',
          },
        },
        type: 'object',
      },
      webAuthnJavaScript: {
        type: 'string',
      },
    },
    securitySchemes: {
      oryAccessToken: {
        in: 'header',
        name: 'Authorization',
        type: 'apiKey',
      },
    },
  },
  info: {
    contact: {
      email: 'office@ory.sh',
    },
    description:
      'This is the API specification for Ory Identities with features such as registration, login, recovery, account verification, profile settings, password reset, identity management, session management, email and sms delivery, and more.\n',
    license: {
      name: 'Apache 2.0',
    },
    title: 'Ory Identities API',
    version: '',
  },
  openapi: '3.0.3',
  paths: {
    '/self-service/registration': {
      post: {
        description:
          "Use this endpoint to complete a registration flow by sending an identity's traits and password. This endpoint\nbehaves differently for API and browser flows.\n\nAPI flows expect `application/json` to be sent in the body and respond with\nHTTP 200 and a application/json body with the created identity success - if the session hook is configured the\n`session` and `session_token` will also be included;\nHTTP 410 if the original flow expired with the appropriate error messages set and optionally a `use_flow_id` parameter in the body;\nHTTP 400 on form validation errors.\n\nBrowser flows expect a Content-Type of `application/x-www-form-urlencoded` or `application/json` to be sent in the body and respond with\na HTTP 303 redirect to the post/after registration URL or the `return_to` value if it was set and if the registration succeeded;\na HTTP 303 redirect to the registration UI URL with the flow ID containing the validation errors otherwise.\n\nBrowser flows with an accept header of `application/json` will not redirect but instead respond with\nHTTP 200 and a application/json body with the signed in identity and a `Set-Cookie` header on success;\nHTTP 303 redirect to a fresh login flow if the original flow expired with the appropriate error messages set;\nHTTP 400 on form validation errors.\n\nIf this endpoint is called with `Accept: application/json` in the header, the response contains the flow without a redirect. In the\ncase of an error, the `error.id` of the JSON response body can be one of:\n\n`session_already_available`: The user is already signed in.\n`security_csrf_violation`: Unable to fetch the flow because a CSRF violation occurred.\n`security_identity_mismatch`: The requested `?return_to` address is not allowed to be used. Adjust this in the configuration!\n`browser_location_change_required`: Usually sent when an AJAX request indicates that the browser needs to open a specific URL.\nMost likely used in Social Sign In flows.\n\nMore information can be found at [Ory Kratos User Login](https://www.ory.sh/docs/kratos/self-service/flows/user-login) and [User Registration Documentation](https://www.ory.sh/docs/kratos/self-service/flows/user-registration).",
        operationId: 'updateRegistrationFlow',
        parameters: [
          {
            description:
              'The Registration Flow ID\n\nThe value for this parameter comes from `flow` URL Query parameter sent to your\napplication (e.g. `/registration?flow=abcde`).',
            in: 'query',
            name: 'flow',
            required: true,
            schema: {
              type: 'string',
            },
          },
          {
            description:
              'HTTP Cookies\n\nWhen using the SDK in a browser app, on the server side you must include the HTTP Cookie Header\nsent by the client to your server here. This ensures that CSRF and session cookies are respected.',
            in: 'header',
            name: 'Cookie',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/updateRegistrationFlowBody',
              },
            },
            'application/x-www-form-urlencoded': {
              schema: {
                $ref: '#/components/schemas/updateRegistrationFlowBody',
              },
            },
          },
          required: true,
          'x-originalParamName': 'Body',
        },
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/successfulNativeRegistration',
                },
              },
            },
            description: 'successfulNativeRegistration',
          },
          '303': {
            $ref: '#/components/responses/emptyResponse',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/registrationFlow',
                },
              },
            },
            description: 'registrationFlow',
          },
          '410': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorGeneric',
                },
              },
            },
            description: 'errorGeneric',
          },
          '422': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorBrowserLocationChangeRequired',
                },
              },
            },
            description: 'errorBrowserLocationChangeRequired',
          },
          default: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorGeneric',
                },
              },
            },
            description: 'errorGeneric',
          },
        },
        summary: 'Update Registration Flow',
        tags: ['frontend'],
      },
    },
  },
  tags: [
    {
      description: 'APIs for managing identities.',
      name: 'identity',
    },
    {
      description:
        "Endpoints used by frontend applications (e.g. Single-Page-App, Native Apps, Server Apps, ...) to manage a user's own profile.",
      name: 'frontend',
    },
    {
      description: 'APIs for managing email and SMS message delivery.',
      name: 'courier',
    },
    {
      description:
        'Server Metadata provides relevant information about the running server. Only available when self-hosting this service.',
      name: 'metadata',
    },
  ],
  'x-forwarded-proto': 'string',
  'x-request-id': 'string',
} as const;
