/* eslint-disable */ export default {
  openapi: '3.0.0',
  info: {
    title: 'Fireblocks API',
    version: '1.6.2',
    contact: {
      email: 'support@fireblocks.com',
    },
  },
  servers: [
    {
      url: 'https://api.fireblocks.io/v1',
    },
  ],
  'x-readme': {
    'explorer-enabled': false,
    'samples-languages': ['curl', 'javascript', 'python'],
  },
  paths: {
    '/vault/accounts': {
      get: {
        summary: 'List vault accounts',
        description: 'Gets all vault accounts in your workspace.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vault_accounts = fireblocks.get_vault_accounts()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAccounts = await fireblocks.getVaultAccounts();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'query',
            name: 'namePrefix',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'nameSuffix',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'minAmountThreshold',
            required: false,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'query',
            name: 'assetId',
            required: false,
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'query',
            name: 'maxBip44AddressIndexUsed',
            required: false,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'query',
            name: 'maxBip44ChangeAddressIndexUsed',
            required: false,
            schema: {
              type: 'number',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A list of vault accounts',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/VaultAccount',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Create a new vault account',
        description: 'Creates a new vault account with the requested name.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAccount = fireblocks.create_vault_account(name, hiddenOnUI, customer_ref_id, auto_fueling)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAccount = await fireblocks.createVaultAccount(name, hiddenOnUI, customerRefId, autoFueling);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    description: 'Account Name',
                    type: 'string',
                  },
                  hiddenOnUI: {
                    description:
                      'Optional - if true, the created account and all related transactions will not be shown on Fireblocks console',
                    type: 'boolean',
                  },
                  customerRefId: {
                    description: 'Optional - Sets a customer reference ID',
                    type: 'string',
                  },
                  autoFuel: {
                    description: 'Optional - Sets the autoFuel property of the vault account',
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'A Vault Account object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/VaultAccount',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts_paged': {
      get: {
        summary: 'List vault acounts (Paginated)',
        description:
          'Gets all vault accounts in your workspace. This endpoint returns a limited amount of results with a quick response time.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vault_accounts = fireblocks.get_vault_accounts_with_page_info(filters)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo(filters);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'query',
            name: 'namePrefix',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'nameSuffix',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'minAmountThreshold',
            required: false,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'query',
            name: 'assetId',
            required: false,
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'query',
            name: 'maxBip44AddressIndexUsed',
            required: false,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'query',
            name: 'maxBip44ChangeAddressIndexUsed',
            required: false,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'query',
            name: 'orderBy',
            required: false,
            schema: {
              type: 'string',
              enum: ['ASC', 'DESC'],
              default: 'DESC',
            },
          },
          {
            in: 'query',
            name: 'before',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'after',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              type: 'number',
              minimum: 1,
              maximum: 500,
              default: 200,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A VaultAccountsPagedResponse object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/VaultAccountsPagedResponse',
                },
              },
            },
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}': {
      get: {
        summary: 'Find a vault account by ID',
        description: 'Returns the requested vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vault_account = fireblocks.get_vault_account(vault_account_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAccount = await fireblocks.getVaultAccount(vault_account_id);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account to return type: string',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Vault Account object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/VaultAccount',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      put: {
        summary: 'Rename a vault account',
        description: 'Renames the requested vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAccount = fireblocks.update_vault_account(vault_account_id, name)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAccount = await fireblocks.updateVaultAccount(vautlAccountId, name);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account to edit',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    description: 'Account Name',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/asset_wallets': {
      get: {
        summary: 'List asset wallets (Paginated)',
        description:
          'Gets all asset wallets at all of the vault accounts in your workspace. An asset wallet is an asset at a vault account. This method allows fast traversal of all account balances.\n**Note:**\n  - This API endpoint is in limited availability and available for selected customers. If you would like to get early access to this endpoint, please reach out to [Fireblocks Support](https://support.fireblocks.io/hc/en-us/requests/new?ticket_form_id=36000337220)\n  - This API call is subject to [rate limits](https://developers.fireblocks.com/reference/rate-limiting).\n',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vault_accounts = fireblocks.get_asset_wallets(filters)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAccounts = await fireblocks.getAssetWallets(filters);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'query',
            name: 'totalAmountLargerThan',
            description:
              'When specified, only asset wallets with total balance larger than this amount are returned.',
            required: false,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'query',
            name: 'assetId',
            required: false,
            description:
              'When specified, only asset wallets cross vault accounts that have this asset ID are returned.',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'query',
            name: 'before',
            required: false,
            description:
              'Fetches the next paginated response before this element. This element is a cursor and is returned at the response of the previous page.',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'after',
            required: false,
            description:
              'Fetches the next paginated response after this element. This element is a cursor and is returned at the response of the previous page.',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'limit',
            required: false,
            description:
              'The maximum number of asset wallets in a single response. The default is 200 and the maximum is 1000.',
            schema: {
              type: 'number',
              minimum: 1,
              maximum: 1000,
              default: 200,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A PaginatedAssetWalletResponse object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/PaginatedAssetWalletResponse',
                },
              },
            },
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/hide': {
      post: {
        summary: 'Hide a vault account in the console',
        description: 'Hides the requested vault account from the web console view.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.hide_vault_account(vault_account_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.hideVaultAccount(vaultAccountId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The vault account to hide',
            schema: {
              type: 'string',
              minimum: 1,
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/unhide': {
      post: {
        summary: 'Unhide a vault account in the console',
        description: 'Makes a hidden vault account visible in web console view.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.unhide_vault_account(vault_account_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.unhideVaultAccount(vaultAccountId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The vault account to unhide',
            schema: {
              type: 'string',
              minimum: 1,
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/activate': {
      post: {
        summary: 'Activate a wallet in a vault account',
        description: 'Initiates activation for a wallet in a vault account.',
        tags: ['Vaults'],
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description:
              "The ID of the vault account to return, or 'default' for the default vault account",
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CreateVaultAssetResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/set_customer_ref_id': {
      post: {
        summary: 'Set an AML/KYT customer reference ID for a vault account',
        description: 'Assigns an AML/KYT customer reference ID for the vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.set_vault_account_customer_ref_id(vault_account_id, customer_ref_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.setCustomerRefIdForVaultAccount(vaultAccountId, customerRefId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The vault account ID',
            schema: {
              type: 'string',
              minimum: 1,
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  customerRefId: {
                    description: 'Customer reference ID',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/set_auto_fuel': {
      post: {
        summary: 'Turn autofueling on or off',
        description: 'Sets the autofueling property of the vault account to enabled or disabled.',
        tags: ['Vaults'],
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The vault account ID',
            schema: {
              type: 'string',
              minimum: 1,
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  autoFuel: {
                    description: 'Auto Fuel',
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}': {
      get: {
        summary: 'Get the asset balance for a vault account',
        description: 'Returns a wallet for a specific asset of a vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.get_vault_account_asset(vault_account_id, asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.getVaultAccountAsset(vaultAccountId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account to return',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A VaultAsset object',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/VaultAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Create a new wallet',
        description: 'Creates a wallet for a specific asset in a vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.create_vault_asset(vault_account_id, asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.createVaultAsset(vaultAccountId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description:
              "The ID of the vault account to return, or 'default' for the default vault account",
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                properties: {
                  eosAccountName: {
                    description:
                      'Optional - when creating an EOS wallet, the account name. If not provided, a random name will be generated',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CreateVaultAssetResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/balance': {
      post: {
        summary: 'Refresh asset balance data',
        description: 'Updates the balance of a specific asset in a vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.refresh_vault_asset_balance(vault_account_id, asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.refreshVaultAssetBalance(vaultAccountId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account to return',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        requestBody: {
          required: false,
          content: {
            '*/*': {
              schema: {
                type: 'object',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'A VaultAsset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/VaultAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/addresses': {
      get: {
        summary: 'Get asset addresses',
        description: 'Lists all addresses for specific asset of vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'depositAddresses = fireblocks.get_deposit_addresses(vault_account_id, asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const depositAddresses = await fireblocks.getDepositAddresses(vaultAccountId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account to return',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A list of deposit addresses',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/VaultWalletAddress',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Create new asset deposit address',
        description: 'Creates a new deposit address for an asset of a vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'address = fireblocks.generate_new_address(vault_account_id, asset_id, description, customer_ref_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const address = await fireblocks.generateNewAddress(vaultAccountId, assetId, description, customerRefId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                properties: {
                  description: {
                    description: '(Optional) Attach a description to the new address',
                    type: 'string',
                  },
                  customerRefId: {
                    description: 'Optional - Sets a customer reference ID',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account to return',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'The created address',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CreateAddressResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/max_spendable_amount': {
      get: {
        summary: 'Get the maximum spendable amount in a single transaction.',
        description:
          'Get the maximum amount of a particular asset that can be spent in a single transaction from a specified vault account (UTXO assets only, with a limitation on number of inputs embedded). Send several transactions if you want to spend more than the maximum spendable amount.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'address = fireblocks.set_address_description(vault_account_id, asset_id, address, tag, description)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const address = await fireblocks.setAddressDescription(vaultAccountId, assetId, address, tag, description);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: "The ID of the vault account, or 'default' for the default vault account",
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'query',
            name: 'manualSignging',
            required: false,
            description:
              'False by default. The maximum number of inputs depends if the transaction will be signed by an automated co-signer server or on a mobile device.',
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}': {
      put: {
        summary: 'Update address description',
        description:
          'Updates the description of an existing address of an asset in a vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'address = fireblocks.set_address_description(vault_account_id, asset_id, address, tag, description)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const address = await fireblocks.setAddressDescription(vaultAccountId, assetId, address, tag, description);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                properties: {
                  description: {
                    description: 'The address description',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'path',
            name: 'addressId',
            required: true,
            description:
              'The address for which to add a description. For XRP, use <address>:<tag>, for all other assets, use only the address',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}/set_customer_ref_id': {
      post: {
        summary: 'Assign AML customer reference ID',
        description: 'Sets an AML/KYT customer reference ID for a specific address.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.set_customer_ref_id_for_address(vault_account_id, asset_id, address_id, customer_ref_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.setCustomerRefIdForAddress(vaultAccountId, assetId, addressId, customerRefId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'path',
            name: 'addressId',
            required: true,
            description:
              'The address for which to add a description. For XRP, use <address>:<tag>, for all other assets, use only the address',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  customerRefId: {
                    description: 'Customer reference ID',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/addresses/{addressId}/create_legacy': {
      post: {
        summary: 'Convert a segwit address to legacy format',
        description: 'Converts an existing segwit address to the legacy format.',
        tags: ['Vaults'],
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'path',
            name: 'addressId',
            required: true,
            description: 'The segwit address to translate',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'The created address',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CreateAddressResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/unspent_inputs': {
      get: {
        summary: 'Get UTXO unspent inputs information',
        description: 'Returns unspent inputs information of an asset in a vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'vaultAsset = fireblocks.get_unspent_inputs(vault_account_id, asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const vaultAsset = await fireblocks.getUnspentInputs(vaultAccountId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            description: 'The ID of the vault account',
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List of Unspent information per input',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UnspentInputsResponse',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/public_key_info/': {
      get: {
        summary: 'Get the public key information',
        description:
          'Gets the public key information based on derivation path and signing algorithm.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'pubKey = fireblocks.get_public_key_info(algorithm, derivation_path, compressed)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: "const PublicKeyInfoArgs = { algorithm: 'MPC_ECDSA_SECP256K1', derivationPath: '[44,0,0,0,0]' } const pubKey = await fireblocks.getPublicKeyInfo(PublicKeyInfoArgs);\n",
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'query',
            name: 'derivationPath',
            required: true,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'algorithm',
            required: true,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'compressed',
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Public key information',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/PublicKeyInformation',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/accounts/{vaultAccountId}/{assetId}/{change}/{addressIndex}/public_key_info': {
      get: {
        summary: 'Get the public key for a vault account',
        description: 'Gets the public key information for the vault account.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'pubKey = fireblocks.get_public_key_info_for_vault_account(vault_account_id, asset_id, change, address_index, compressed)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: "const PublicKeyInfoArgs = { algorithm: 'MPC_ECDSA_SECP256K1', derivationPath: '[44,0,0,0,0]' } const pubKey = await fireblocks.getPublicKeyInfo(PublicKeyInfoArgs);\n",
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'vaultAccountId',
            required: true,
            schema: {
              type: 'string',
              format: 'numeric',
              'x-fb-entity': 'vault_account',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'path',
            name: 'change',
            required: true,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'path',
            name: 'addressIndex',
            required: true,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'query',
            name: 'compressed',
            required: false,
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Public Key Information',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/PublicKeyInformation',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/assets': {
      get: {
        summary: 'Get asset balance for chosen assets',
        description: 'Gets the assets amount summary for all accounts or filtered accounts.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'assets_balance = fireblocks.get_vault_assets_balance(accout_name_prefix, account_name_suffix)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const assetsBalance = await fireblocks.getVaultAssetsBalance(accountNamePrefix, accountNameSuffix);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'query',
            name: 'accountNamePrefix',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'accountNameSuffix',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Amount by asset',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/VaultAsset',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/vault/assets/{assetId}': {
      get: {
        summary: 'Get vault balance by asset',
        description: 'Gets the vault balance summary for an asset.',
        tags: ['Vaults'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'assets_balance = fireblocks.get_vault_balance_by_asset(asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const assetsBalance = await fireblocks.getVaultBalanceByAsset(assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'assetId',
            required: true,
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Vault amount by asset',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/VaultAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/exchange_accounts': {
      get: {
        summary: 'List exchange accounts',
        description: 'Returns all exchange accounts.',
        tags: ['Exchange accounts'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'exchangeAccounts = fireblocks.get_exchange_accounts()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const exchangeAccounts = await fireblocks.getExchangeAccounts();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'An ExchangeAccount object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ExchangeAccount',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/exchange_accounts/{exchangeAccountId}': {
      get: {
        summary: 'Find a specific exchange account',
        description: 'Returns an exchange account by ID.',
        tags: ['Exchange accounts'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'exchangeAccount = fireblocks.get_exchange_account(exchangeAccountId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const exchnageAccount = await fireblocks.get_exchange_account(exchangeAccountId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'exchangeAccountId',
            required: true,
            description: 'The ID of the exchange account to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'An ExchangeAccount object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ExchangeAccount',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/exchange_accounts/{exchangeAccountId}/internal_transfer': {
      post: {
        summary: 'Internal tranfer for exchange accounts',
        description: 'Transfers funds between trading accounts under the same exchange account.',
        tags: ['Exchange accounts'],
        parameters: [
          {
            in: 'path',
            name: 'exchangeAccountId',
            required: true,
            description: 'The ID of the exchange account to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '201': {
            description: 'Transfer succeeded',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  asset: {
                    type: 'string',
                  },
                  amount: {
                    type: 'string',
                  },
                  sourceType: {
                    $ref: '#/components/schemas/TradingAccountType',
                  },
                  destType: {
                    $ref: '#/components/schemas/TradingAccountType',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/exchange_accounts/{exchangeAccountId}/convert': {
      post: {
        summary:
          'Convert exchange account funds from the source asset to the destination asset. Coinbase (USD to USDC, USDC to USD) and Bitso (MXN to USD) are supported conversions.',
        tags: ['Exchange accounts'],
        parameters: [
          {
            in: 'path',
            name: 'exchangeAccountId',
            required: true,
            description:
              'The ID of the exchange account. Please make sure the exchange supports conversions. To find the ID of your exchange account, use GET/exchange_accounts.',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Conversion successful',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  srcAsset: {
                    type: 'string',
                    description:
                      'Name of the source asset (must be in a currency that is supported for conversions in the selected exchange type that corresponds to your exchange ID)',
                  },
                  destAsset: {
                    type: 'string',
                    description:
                      'Name of the destination asset (must be in a currency that is supported for conversions in the selected exchange type that corresponds to your exchange ID)',
                  },
                  amount: {
                    type: 'number',
                    description: 'The amount to transfer (in the currency of the source asset)',
                  },
                },
                required: ['srcAsset', 'destAsset', 'amount'],
              },
            },
          },
        },
      },
    },
    '/exchange_accounts/{exchangeAccountId}/{assetId}': {
      get: {
        summary: 'Find an asset for an exchange account',
        description: 'Returns an asset for an exchange account.',
        tags: ['Exchange accounts'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'exchangeAsset = fireblocks.get_exchange_account_asset(exchangeAccountId, assetId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const exchangeAsset = await fireblocks.getExchangeAsset(exchangeAccountId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'exchangeAccountId',
            required: true,
            description: 'The ID of the exchange account to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'An ExchangeAccountAsset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ExchangeAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/fiat_accounts': {
      get: {
        summary: 'List fiat accounts',
        description: 'Returns all fiat accounts.',
        tags: ['Fiat accounts'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'transactions = fireblocks.get_fiat_accounts()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const transactions = await fireblocks.getFiatAccounts();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'A fiat account object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/FiatAccount',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/fiat_accounts/{accountId}': {
      get: {
        summary: 'Find a specific fiat account',
        description: 'Returns a fiat account by ID.',
        tags: ['Fiat accounts'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'transactions = fireblocks.get_fiat_account_by_id(account_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const transactions = await fireblocks.getFiatAccountById(accountId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'accountId',
            required: true,
            description: 'The ID of the fiat account to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A fiat account object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/FiatAccount',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/fiat_accounts/{accountId}/redeem_to_linked_dda': {
      post: {
        summary: 'Redeem funds to DDA',
        description: 'Redeems funds to the linked DDA.',
        tags: ['Fiat accounts'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'transactions = fireblocks.redeem_to_linked_dda(account_id, amount)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const transactions = await fireblocks.redeemToLinkedDDA(accountId, amount);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'accountId',
            required: true,
            description: 'The ID of the fiat account to use',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '201': {
            description: 'Transfer succeeded',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  amount: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/fiat_accounts/{accountId}/deposit_from_linked_dda': {
      post: {
        summary: 'Deposit funds from DDA',
        description: 'Deposits funds from the linked DDA.',
        tags: ['Fiat accounts'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'transactions = fireblocks.deposit_from_linked_dda(account_id, amount)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const transactions = await fireblocks.depositFromLinkedDDA(accountId, amount);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'accountId',
            required: true,
            description: 'The ID of the fiat account to use',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '201': {
            description: 'Transfer succeeded',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  amount: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/network_connections': {
      get: {
        summary: 'List network connections',
        description:
          'Returns all network connections.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'network_connections = fireblocks.get_network_connections()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const networkConnections = await fireblocks.getNetworkConnections();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'A list of network connections',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/NetworkConnectionResponse',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Creates a new network connection',
        description:
          'Initiates a new network connection.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NetworkConnection',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'A Network Connection object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/NetworkConnectionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_connections/{connectionId}/set_routing_policy': {
      patch: {
        summary: 'Update network connection routing policy.',
        description:
          'Updates an existing network connection\'s routing policy.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'connectionId',
            required: true,
            description: 'The ID of the network connection',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  routingPolicy: {
                    $ref: '#/components/schemas/NetworkConnectionRoutingPolicy',
                  },
                },
                required: ['routingPolicy'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Network ID',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                  },
                  required: ['success'],
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_connections/{connectionId}/is_third_party_routing/{assetType}': {
      get: {
        summary: 'Retrieve third-party network routing validation by asset type.',
        description:
          'The Fireblocks Network allows for flexibility around incoming deposits. A receiver can receive network deposits to locations other than Fireblocks. This endpoint validates whether future transactions are routed to the displayed recipient or to a 3rd party.',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'connectionId',
            required: true,
            description: 'The ID of the network connection',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetType',
            required: true,
            description: 'The destination asset type',
            schema: {
              type: 'string',
              enum: ['CRYPTO', 'SIGNET', 'SEN', 'SIGNET_TEST', 'SEN_TEST'],
            },
          },
        ],
        responses: {
          '200': {
            description: 'result for the validation',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  properties: {
                    isThirdPartyRouting: {
                      type: 'boolean',
                    },
                    description: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_connections/{connectionId}': {
      get: {
        summary: 'Get a network connection',
        description:
          'Gets a network connection by ID.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'network_connection = fireblocks.get_network_connection_by_id(connectionId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const network_connection = await fireblocks.getNetworkConnection(connectionId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'connectionId',
            required: true,
            description: 'The ID of the connection',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A network connection',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/NetworkConnectionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      delete: {
        summary: 'Deletes a network connection by ID',
        description:
          'Deletes an existing network connection specified by its connection ID.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'connectionId',
            required: true,
            description: 'The ID of the network connection to delete',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Network ID',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                  },
                  required: ['success'],
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_ids': {
      get: {
        summary: 'Returns all network IDs, both local IDs and discoverable remote IDs',
        description:
          'Retrieves a list of all local and discoverable remote network IDs.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        responses: {
          '200': {
            description: 'A list of network IDs',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    allOf: [
                      {
                        $ref: '#/components/schemas/NetworkIdResponse',
                      },
                    ],
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Creates a new Network ID',
        description:
          'Creates a new Network ID.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    type: 'string',
                  },
                  routingPolicy: {
                    $ref: '#/components/schemas/NetworkIdRoutingPolicy',
                  },
                },
                required: ['name'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Returns the new network ID in your workspace',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/NetworkIdResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_ids/{networkId}': {
      get: {
        summary: 'Returns specific network ID.',
        description:
          'Retrieves a network by its ID.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'networkId',
            required: true,
            description: 'The ID of the network',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Network ID',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/NetworkIdResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      delete: {
        summary: 'Deletes specific network ID.',
        description:
          'Deletes a network by its ID.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'networkId',
            required: true,
            description: 'The ID of the network',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Network ID',
            content: {
              '*/*': {
                schema: {
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                  },
                  required: ['success'],
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_ids/{networkId}/set_routing_policy': {
      patch: {
        summary: 'Update network id routing policy.',
        description:
          'Updates the routing policy of a specified network ID.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'networkId',
            required: true,
            description: 'The ID of the network',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  routingPolicy: {
                    $ref: '#/components/schemas/NetworkIdRoutingPolicy',
                  },
                },
                required: ['routingPolicy'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Network ID',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                  },
                  required: ['success'],
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_ids/{networkId}/set_discoverability': {
      patch: {
        summary: "Update network ID's discoverability.",
        description:
          'Update whether or not the network ID is discoverable by others.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'networkId',
            required: true,
            description: 'The ID of the network',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  isDiscoverable: {
                    type: 'boolean',
                  },
                },
                required: ['isDiscoverable'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Network ID',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                  },
                  required: ['success'],
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/network_ids/{networkId}/set_name': {
      patch: {
        summary: "Update network ID's name.",
        description:
          'Updates name of a specified network ID.\n\n**Note:** This API call is subject to Flexible Routing Schemes.\n\nYour routing policy defines how your transactions are routed.\nYou can choose 1 of the 3 different schemes mentioned below for each asset type:\n  - **None**; Defines the profile routing to no destination for that asset type. Incoming transactions to asset types routed to `None` will fail.\n  - **Custom**; Route to an account that you choose. If you remove the account, incoming transactions will fail until you choose another one.\n  - **Default**; Use the routing specified by the network profile the connection is connected to. This scheme is also referred to as "Profile Routing"\n\nDefault Workspace Presets:\n  - Network Profile Crypto → **Custom**\n  - Network Profile FIAT → **None**\n  - Network Connection Crypto → **Default**\n  - Network Connection FIAT → **Default**\n\n    - **Note**: By default, Custom routing scheme uses (`dstId` = `0`, `dstType` = `VAULT`).\n',
        tags: ['Network connections'],
        parameters: [
          {
            in: 'path',
            name: 'networkId',
            required: true,
            description: 'The ID of the network',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    type: 'string',
                  },
                },
                required: ['name'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Network ID',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  properties: {
                    success: {
                      type: 'boolean',
                    },
                  },
                  required: ['success'],
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/internal_wallets': {
      get: {
        summary: 'List internal wallets',
        tags: ['Internal wallets'],
        description:
          'Gets a list of internal wallets.\n\n**Note**: BTC-based assets belonging to whitelisted addresses cannot be retrieved between 00:00 UTC and 00:01 UTC daily due to third-party provider, Blockchair, being unavailable for this 60 second period. Please wait until the next minute to retrieve BTC-based assets.\n',
        responses: {
          '200': {
            description: 'A list of internal wallets',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UnmanagedWallet',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Create an internal wallet',
        tags: ['Internal wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'internalWallet = fireblocks.create_internal_wallet(name, customer_ref_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const internalWallet = await fireblocks.createInternalWallet(name, customerRefId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        description: 'Creates a new internal wallet with the requested name.',
        responses: {
          '200': {
            description: 'A new wallet object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/UnmanagedWallet',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    type: 'string',
                    description: "the wallet's display name",
                  },
                  customerRefId: {
                    description: 'Optional - Sets a customer reference ID',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/internal_wallets/{walletId}': {
      get: {
        summary: 'Get assets for internal wallet',
        tags: ['Internal wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'internalWallet = fireblocks.get_internal_wallet(walletId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.getInternalWallet(walletId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        description: 'Returns all assets in an internal wallet by ID.',
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/UnmanagedWallet',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      delete: {
        summary: 'Delete an internal wallet',
        tags: ['Internal wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = firebocks.delete_internal_wallet(walletId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.deleteInternalWallet(walletId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        description: 'Deletes an internal wallet by ID.',
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet to delete',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/internal_wallets/{walletId}/set_customer_ref_id': {
      post: {
        summary: 'Set an AML/KYT customer reference ID for an internal wallet',
        tags: ['Internal wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = firebocks.set_customer_ref_id_for_internal_wallet(wallet_id, customer_ref_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.setCustomerRefIdForInternalWallet(walletId, customerRefId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        description: 'Sets an AML/KYT customer reference ID for the specific internal wallet.',
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The wallet ID',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  customerRefId: {
                    description: 'Customer reference ID',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/internal_wallets/{walletId}/{assetId}': {
      get: {
        summary: 'Get an asset from an internal wallet',
        tags: ['Internal wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'internalWalletAsset = fireblocks.get_internal_wallet_asset(walletId, assetId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const internalWalletAsset = fireblocks.getInternalWalletAsset(walletId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        description: 'Returns information for an asset in an internal wallet.',
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to return',
            schema: {
              type: 'string',
              minimum: 1,
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet Asset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/WalletAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Add an asset to an internal wallet',
        tags: ['Internal wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'internalWalletAsset = fireblocks.create_internal_wallet_asset(walletId, assetId, address, tag)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const internalWalletAsset = await fireblocks.createInternalWalletAsset(walletContainerId, assetId, address, tag);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        description: 'Adds an asset to an existing internal wallet.',
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to add',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet Asset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/WalletAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  address: {
                    type: 'string',
                    description: "The wallet's address or, for EOS wallets, the account name",
                  },
                  tag: {
                    type: 'string',
                    description:
                      'for XRP wallets, the destination tag; for EOS, the memo; for the fiat providers (BLINC by BCB Group), the Bank Transfer Description',
                  },
                },
                required: ['address'],
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete a whitelisted address from an internal wallet',
        tags: ['Internal wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.delete_internal_wallet_asset(walletId, assetId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.deleteInternalWalletAsset(walletId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        description: 'Deletes a whitelisted address (for an asset) from an internal wallet.',
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to delete',
            schema: {
              type: 'string',
              minimum: 1,
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/external_wallets': {
      get: {
        summary: 'List external wallets',
        description: 'Gets a list of external wallets under the workspace.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'externalWallets = fireblocks.get_external_wallets()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const externalWallets = await fireblocks.getExternalWallets();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'A list of external wallets',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UnmanagedWallet',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Create an external wallet',
        description: 'Creates a new external wallet with the requested name.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'externalWallet = fireblocks.create_external_wallet(name, customer_ref_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const externalWallet = await fireblocks.createExternalWallet(name, customerRefId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'A Wallet object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/UnmanagedWallet',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    type: 'string',
                    description: "the wallet's display name",
                  },
                  customerRefId: {
                    description: 'Optional - Sets a customer reference ID',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/external_wallets/{walletId}': {
      get: {
        summary: 'Find an external wallet',
        description: 'Returns an external wallet by ID.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'externalWallet = fireblocks.get_external_wallet(walletId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const externalWallet = await fireblocks.getExternalWallet(walletId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/UnmanagedWallet',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      delete: {
        summary: 'Delete an external wallet',
        description: 'Deletes an external wallet by ID.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = firebocks.delete_external_wallet(walletId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.deleteExternalWallet(walletId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet to delete',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/external_wallets/{walletId}/set_customer_ref_id': {
      post: {
        summary: 'Set an AML customer reference ID for an external wallet',
        description: 'Sets an AML/KYT customer reference ID for the specific external wallet.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = firebocks.set_customer_ref_id_for_external_wallet(wallet_id, customer_ref_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.setCustomerRefIdForExternalWallet(walletId, customerRefId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The wallet ID',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  customerRefId: {
                    description: 'Customer reference ID',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/external_wallets/{walletId}/{assetId}': {
      get: {
        summary: 'Get an asset from an external wallet',
        description: 'Returns an external wallet by wallet ID and asset ID.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'externalWalletAsset = fireblocks.get_external_wallet_asset(walletId, assetId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const externalWalletAsset = fireblocks.getExternalWalletAsset(walletId, assetId)',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to return',
            schema: {
              type: 'string',
              minimum: 1,
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet Asset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ExternalWalletAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Add an asset to an external wallet.',
        description: 'Adds an asset to an existing external wallet.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'externalWalletAsset = fireblocks.create_external_wallet_asset(walletId, assetId, address, tag)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const externalWalletAsset = await fireblocks.createExternalWalletAsset(walletContainerId, assetId, address, tag);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to add',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet Asset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ExternalWalletAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  address: {
                    type: 'string',
                    description: "The wallet's address (or xpub) of the wallet",
                  },
                  tag: {
                    type: 'string',
                    description:
                      'For XRP wallets, the destination tag; for EOS/XLM, the memo; for the fiat providers (BLINC by BCB Group), the Bank Transfer Description',
                  },
                },
                required: ['address'],
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete an asset from an external wallet',
        description: 'Deletes an external wallet asset by ID.',
        tags: ['External wallets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.delete_external_wallet_asset(walletId, assetId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.deleteExternalWalletAsset(walletId, assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'walletId',
            required: true,
            description: 'The ID of the wallet',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to delete',
            schema: {
              type: 'string',
              minimum: 1,
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/contracts': {
      get: {
        summary: 'List contracts',
        description: 'Gets a list of contracts.',
        tags: ['Contracts'],
        responses: {
          '200': {
            description: 'A list of contracts',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/UnmanagedWallet',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Create a contract',
        description: 'Creates a new contract.',
        tags: ['Contracts'],
        responses: {
          '200': {
            description: 'A Wallet object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/UnmanagedWallet',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    type: 'string',
                    description: "the contract's display name",
                  },
                },
              },
            },
          },
        },
      },
    },
    '/contracts/{contractId}': {
      get: {
        summary: 'Find a specific contract',
        description: 'Returns a contract by ID.',
        tags: ['Contracts'],
        parameters: [
          {
            in: 'path',
            name: 'contractId',
            required: true,
            description: 'The ID of the contract to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/UnmanagedWallet',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      delete: {
        summary: 'Delete a contract',
        description: 'Deletes a contract by ID.',
        tags: ['Contracts'],
        parameters: [
          {
            in: 'path',
            name: 'contractId',
            required: true,
            description: 'The ID of the contract to delete',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/contracts/{contractId}/{assetId}': {
      get: {
        summary: 'Find a contract asset',
        description: 'Returns a contract asset by ID.',
        tags: ['Contracts'],
        parameters: [
          {
            in: 'path',
            name: 'contractId',
            required: true,
            description: 'The ID of the contract',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to return',
            schema: {
              type: 'string',
              minimum: 1,
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet Asset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ExternalWalletAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Add an asset to a contract',
        description: 'Adds an asset to an existing contract.',
        tags: ['Contracts'],
        parameters: [
          {
            in: 'path',
            name: 'contractId',
            required: true,
            description: 'The ID of the contract',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to add',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A Wallet Asset object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ExternalWalletAsset',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  address: {
                    type: 'string',
                    description: "The contract's address (or xpub) of the wallet",
                  },
                  tag: {
                    type: 'string',
                    description: 'The destination tag, for XRP wallets',
                  },
                },
                required: ['address'],
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete a contract asset',
        description: 'Deletes a contract asset by ID.',
        tags: ['Contracts'],
        parameters: [
          {
            in: 'path',
            name: 'contractId',
            required: true,
            description: 'The ID of the contract',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The ID of the asset to delete',
            schema: {
              type: 'string',
              minimum: 1,
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/supported_assets': {
      get: {
        summary: 'List all asset types supported by Fireblocks',
        description: 'Returns all asset types supported by Fireblocks.',
        tags: ['Supported assets'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'supportedAssets = fireblocks.get_supported_assets()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const supportedAssets = await fireblocks.getSupportedAssets();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'A Transaction object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AssetTypeResponse',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/transactions': {
      get: {
        summary: 'List transaction history',
        description: 'Lists the transaction history for your workspace.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'transactions = fireblocks.get_transactions()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const transactions = await fireblocks.getTransactions({\n status: args.status,\nafter: from });\n',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'query',
            name: 'before',
            description:
              'Unix timestamp in milliseconds. Returns only transactions created before the specified date',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'after',
            description:
              'Unix timestamp in milliseconds. Returns only transactions created after the specified date',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'status',
            description: 'You can filter by one of the statuses.',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'orderBy',
            description: 'The field to order the results by',
            required: false,
            schema: {
              type: 'string',
              enum: ['createdAt', 'lastUpdated'],
            },
          },
          {
            in: 'query',
            name: 'sort',
            description: 'The direction to order the results by',
            required: false,
            schema: {
              type: 'string',
              enum: ['ASC', 'DESC'],
            },
          },
          {
            in: 'query',
            name: 'limit',
            description:
              'Limits the number of results. If not provided, a limit of 200 will be used. The maximum allowed limit is 500',
            required: false,
            schema: {
              type: 'integer',
              minimum: 1,
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'sourceType',
            description: 'The source type of the transaction',
            required: false,
            schema: {
              type: 'string',
              enum: [
                'VAULT_ACCOUNT',
                'EXCHANGE_ACCOUNT',
                'INTERNAL_WALLET',
                'EXTERNAL_WALLET',
                'FIAT_ACCOUNT',
                'NETWORK_CONNECTION',
                'COMPOUND',
                'UNKNOWN',
                'GAS_STATION',
                'OEC_PARTNER',
                'END_USER_WALLET',
              ],
            },
          },
          {
            in: 'query',
            name: 'sourceId',
            description: 'The source ID of the transaction',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'destType',
            description: 'The destination type of the transaction',
            required: false,
            schema: {
              type: 'string',
              enum: [
                'VAULT_ACCOUNT',
                'EXCHANGE_ACCOUNT',
                'INTERNAL_WALLET',
                'EXTERNAL_WALLET',
                'FIAT_ACCOUNT',
                'NETWORK_CONNECTION',
                'COMPOUND',
                'ONE_TIME_ADDRESS',
                'OEC_PARTNER',
                'END_USER_WALLET',
              ],
            },
          },
          {
            in: 'query',
            name: 'destId',
            description: 'The destination ID of the transaction',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'assets',
            description: 'A list of assets to filter by, seperated by commas',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'txHash',
            description: 'Returns only results with a specified txHash',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A list of transactions',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TransactionResponse',
                  },
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
      post: {
        summary: 'Create a new transaction',
        description: 'Creates a new transaction.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'tx_result = client.create_transaction( asset_id="BTC", amount="50", source=TransferPeerPath(VAULT_ACCOUNT, from_vault_account_id), destination=DestinationTransferPeerPath(VAULT_ACCOUNT, to_vault_account_id) )\n',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const payload: TransactionArguments = { assetId: asset, source: { type: sourceType, id: sourceId || 0 }, destination: { type: destinationType, id: String(destinationId) }, amount: String(amount), fee: String(fee), note: "Created by fireblocks SDK" }; const result = await fireblocks.createTransaction(payload);\n',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'A transaction object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CreateTransactionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TransactionRequest',
              },
            },
          },
        },
      },
    },
    '/transactions/estimate_fee': {
      post: {
        summary: 'Estimate transaction fee',
        description:
          'Estimates the transaction fee for a transaction request.\n* Note: Supports all Fireblocks assets except ZCash (ZEC).',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'estimated_fee = client.estimate_fee_for_transaction( asset_id="BTC", amount="50", source=TransferPeerPath(VAULT_ACCOUNT, from_vault_account_id), destination=DestinationTransferPeerPath(VAULT_ACCOUNT, to_vault_account_id) )\n',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const payload: TransactionArguments = { assetId: asset, source: { type: sourceType, id: sourceId || 0 }, destination: { type: destinationType, id: String(destinationId) }, amount: Number(amount) }; const estimatedFee = await fireblocks.estimateFeeForTransaction(payload);\n',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TransactionRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Estimated fees response',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/EstimatedTransactionFeeResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/transactions/{txId}': {
      get: {
        summary: 'Find a specific transaction by Fireblocks transaction ID',
        description: 'Returns a transaction by ID.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'tx = fireblocks.get_transaction_by_id(txId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const tx = await fireblocks.getTransactionById(txId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'txId',
            required: true,
            example: '00000000-0000-0000-0000-000000000000',
            description: 'The ID of the transaction to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'An Transaction object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/TransactionResponse',
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/Error',
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/transactions/external_tx_id/{externalTxId}/': {
      get: {
        summary: 'Find a specific transaction by external transaction ID',
        description: 'Returns transaction by external transaction ID.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'tx = fireblocks.get_transaction_by_external_tx_id(externalTxId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const tx = await fireblocks.getTransactionByExternalTxId(externalTxId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'externalTxId',
            example: '00000000-0000-0000-0000-000000000000',
            required: true,
            description: 'The external ID of the transaction to return',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'An Transaction object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/TransactionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/transactions/{txId}/set_confirmation_threshold': {
      post: {
        summary: 'Set confirmation threshold by transaction ID',
        description:
          'Overrides the required number of confirmations for transaction completion by transaction ID.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'set_conf_threshold = client.set_confirmation_threshold_by_tx_id(body)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const setConfThreshold = await fireblocks.setConfirmationThresholdByTxId(body);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SetConfirmationsThresholdRequest',
              },
            },
          },
        },
        parameters: [
          {
            in: 'path',
            name: 'txId',
            required: true,
            description: 'The ID of the transaction',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Set successfully',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/SetConfirmationsThresholdResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/transactions/{txId}/drop': {
      post: {
        summary: 'Drop ETH transaction by ID',
        description: 'Drops a stuck ETH transaction and creates a replacement transaction.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.drop_transaction(txId, fee_level)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.dropTransaction(txId, feeLevel);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DropTransactionRequest',
              },
            },
          },
        },
        parameters: [
          {
            in: 'path',
            name: 'txId',
            required: true,
            description: 'The ID of the transaction',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Created successfully',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/DropTransactionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/transactions/{txId}/cancel': {
      post: {
        summary: 'Cancel a transaction',
        description: 'Cancels a transaction by ID.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.cancel_transaction_by_id(txId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.cancelTransactionById(txId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'txId',
            required: true,
            description: 'The ID of the transaction to cancel',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'An Transaction object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CancelTransactionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/transactions/{txId}/freeze': {
      post: {
        summary: 'Freeze a transaction',
        description: 'Freezes a transaction by ID.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.freeze_transaction(txId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.freezeTransaction(txId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'txId',
            required: true,
            description: 'The ID of the transaction to freeze',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'freeze response',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/FreezeTransactionResponse',
                },
              },
            },
          },
        },
      },
    },
    '/transactions/{txId}/unfreeze': {
      post: {
        summary: 'Unfreeze a transaction',
        description: 'Unfreezes a transaction by ID and makes the transaction available again.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.unfreeze_transaction(txId)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.unfreezeTransaction(txId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'txId',
            required: true,
            description: 'The ID of the transaction to unfreeze',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Unfreeze response',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/UnfreezeTransactionResponse',
                },
              },
            },
          },
        },
      },
    },
    '/transactions/validate_address/{assetId}/{address}': {
      get: {
        summary: 'Validate destination address',
        description: 'Checks if an address is valid (for XRP, DOT, XLM, and EOS).',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.(asset_id, address)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.(assetId, address);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'assetId',
            required: true,
            description: 'The asset of the address',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
          {
            in: 'path',
            name: 'address',
            required: true,
            description: 'The address to validate',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'An Transaction object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ValidateAddressResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/txHash/{txHash}/set_confirmation_threshold': {
      post: {
        summary: 'Set confirmation threshold by transaction hash',
        description:
          'Overrides the required number of confirmations for transaction completion by transaction hash.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'set_conf_threshold = client.set_confirmation_threshold_by_tx_hash(body)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const setConfThreshold = await fireblocks.setConfirmationThresholdByTxHash(body);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SetConfirmationsThresholdRequest',
              },
            },
          },
        },
        parameters: [
          {
            in: 'path',
            name: 'txHash',
            required: true,
            description: 'The TxHash',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'A list of transactions affected by the change',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/SetConfirmationsThresholdResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/estimate_network_fee': {
      get: {
        summary: 'Estimate the required fee for an asset',
        description:
          'Gets the estimated required fee for an asset. For UTXO based assets, the response will contain the suggested fee per byte, for ETH/ETC based assets, the suggested gas price, and for XRP/XLM, the transaction fee.',
        tags: ['Transactions'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'fee_result = fireblocks.get_fee_for_asset(asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const feeResult = await fireblocks.getFeeForAsset(assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'query',
            name: 'assetId',
            description: 'The asset for which to estimate the fee',
            required: true,
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Estimated fees response',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/EstimatedNetworkFeeResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/payments/xb-settlements/configs': {
      post: {
        tags: ['Payments - cross-border settlement'],
        summary: 'Create a new cross-border settlement configuration',
        description:
          '<u><b>Create a new cross-border settlement configuration. </u></b></br>Configurations define the default assets, on-ramps, and off-ramps to use for the cross-border settlement. </br> \nA configuration must contain at least two steps - `ON_RAMP` and `VAULT_ACCOUNT`. </br>\nAll other steps (e.g., `OFF_RAMP`, `FIAT_DESTINATION`, etc.) are optional. </br>\nEvery step must include the `accountId` to be used, while `inputAssetId` and `outputAssetId` are optional. \nIf those are not provided, a default value will be used from the Corridor Settings.</br>\nIf the inputAssetId or the outputAssetId is provided for one of the objects, all assets in the objects must be consistent. For example, if the output asset of ON_RAMP is XLM_USDC_5F3T, then the input asset of the VAULT_ACCOUNT must also be XLM_USDC_5F3T..</br>\nYou can set a slippage amount for your configuration. Slippage is defined by basis points (bps). This value can be overloaded on execution. If you do not configure a slippage amount, the default slippage of 10000 bps (10%) is used. </br>\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/XBSettlementConfigCreationRequestBody',
              },
              example: {
                name: 'Flow Config Example',
                corridorId: 'CO_US',
                steps: {
                  ON_RAMP: {
                    accountId: '3b7a1451-3453-4c96-a6a5-683cc8971d04',
                  },
                  VAULT_ACCOUNT: {
                    accountId: '2',
                  },
                  OFF_RAMP: {
                    accountId: 'f2f74204-93ec-4614-870a-4ea2ad13aa0b',
                  },
                },
                conversionSlippageBasisPoints: 75,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Cross-border settlement configuration created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementConfigCreationResponse',
                },
                example: {
                  configId: '074791cc-ef32-4920-8373-95efbeea66c5',
                  corridorId: 'CO_US',
                  name: 'Flow Config Example',
                  steps: {
                    ON_RAMP: {
                      accountId: '3b7a1451-3453-4c96-a6a5-683cc8971d04',
                      inputAssetId: 'COP',
                      outputAssetId: 'USD',
                    },
                    VAULT_ACCOUNT: {
                      accountId: '2',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                    OFF_RAMP: {
                      accountId: 'f2f74204-93ec-4614-870a-4ea2ad13aa0b',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                  },
                  conversionSlippageBasisPoints: 75,
                  createdAt: 1680625226267,
                },
              },
            },
          },
          '400': {
            description: 'Error creating cross-border request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Payments - cross-border settlement'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Get all the cross-border settlement configurations',
        description:
          'Get all the cross-border settlement configurations. </br>\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n',
        responses: {
          '200': {
            description: 'Returns all the cross-border settlement configurations',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementGetAllConfigsResponse',
                },
                example: {
                  configurations: [
                    {
                      configId: '074791cc-ef32-4920-8373-95efbeea66c5',
                      corridorId: 'CO_US',
                      name: 'Flow Config Example',
                      steps: {
                        ON_RAMP: {
                          accountId: '3b7a1451-3453-4c96-a6a5-683cc8971d04',
                          inputAssetId: 'COP',
                          outputAssetId: 'USD',
                        },
                        VAULT_ACCOUNT: {
                          accountId: '2',
                          inputAssetId: 'XLM_USDC_5F3T',
                          outputAssetId: 'XLM_USDC_5F3T',
                        },
                        OFF_RAMP: {
                          accountId: 'f2f74204-93ec-4614-870a-4ea2ad13aa0b',
                          inputAssetId: 'XLM_USDC_5F3T',
                          outputAssetId: 'XLM_USDC_5F3T',
                        },
                      },
                      conversionSlippageBasisPoints: 75,
                      createdAt: 1680625226267,
                    },
                    {
                      configId: 'a4b0a706-4578-4467-bd5b-a852761dd2aa',
                      corridorId: 'MX_US',
                      name: 'MX to US flow',
                      steps: {
                        ON_RAMP: {
                          accountId: '3d6241ad-879b-4a11-842f-4cee9cd7fbba',
                          inputAssetId: 'MXN',
                          outputAssetId: 'USD',
                        },
                        VAULT_ACCOUNT: {
                          accountId: '1',
                          inputAssetId: 'XLM_USDC_5F3T',
                          outputAssetId: 'XLM_USDC_5F3T',
                        },
                        OFF_RAMP: {
                          accountId: '1cf7f750-117f-4c36-b4ef-14c420d118ce',
                          inputAssetId: 'XLM_USDC_5F3T',
                          outputAssetId: 'XLM_USDC_5F3T',
                        },
                      },
                      conversionSlippageBasisPoints: 10,
                      createdAt: 1665166171134,
                    },
                  ],
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/payments/xb-settlements/configs/{configId}': {
      get: {
        tags: ['Payments - cross-border settlement'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Get a specific cross-border settlement configuration',
        description:
          'Get a specific cross-border settlement configuration.</br>\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n',
        parameters: [
          {
            in: 'path',
            name: 'configId',
            required: true,
            description: 'The cross-border settlement configuration ID.',
            schema: {
              type: 'string',
            },
            example: '074791cc-ef32-4920-8373-95efbeea66c5',
          },
        ],
        responses: {
          '200': {
            description: 'Returns the requested cross-border settlement configuration',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementGetConfigResponse',
                },
                example: {
                  configId: '074791cc-ef32-4920-8373-95efbeea66c5',
                  corridorId: 'CO_US',
                  name: 'Flow Config Example',
                  steps: {
                    ON_RAMP: {
                      accountId: '3b7a1451-3453-4c96-a6a5-683cc8971d04',
                      inputAssetId: 'COP',
                      outputAssetId: 'USD',
                    },
                    VAULT_ACCOUNT: {
                      accountId: '2',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                    OFF_RAMP: {
                      accountId: 'f2f74204-93ec-4614-870a-4ea2ad13aa0b',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                  },
                  conversionSlippageBasisPoints: 75,
                  createdAt: 1680625226267,
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'No cross-border settlement configuration exists with the provided ID.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Payments - cross-border settlement'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Edit a cross-border settlement configuration',
        description:
          'Edit a cross-border settlement configuration.\nEditing a configuration does not affect previously executed flows that used the configuration.\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n',
        parameters: [
          {
            in: 'path',
            name: 'configId',
            required: true,
            description: 'The cross-border settlement configuration ID.',
            schema: {
              type: 'string',
            },
            example: '074791cc-ef32-4920-8373-95efbeea66c5',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/XBSettlementConfigEditRequestBody',
              },
              example: {
                name: 'Flow Config Example - Edited',
                steps: {
                  ON_RAMP: {
                    accountId: 'e9dec04a-3c57-4052-a89a-288c545f6430',
                  },
                  VAULT_ACCOUNT: {
                    accountId: '2',
                  },
                  OFF_RAMP: {
                    accountId: 'f2f74204-93ec-4614-870a-4ea2ad13aa0b',
                  },
                },
                corridorId: 'CO_US',
                conversionSlippageBasisPoints: 30,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Cross-border settlement configuration edited successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementConfigEditResponse',
                },
                example: {
                  configId: '074791cc-ef32-4920-8373-95efbeea66c5',
                  corridorId: 'CO_US',
                  name: 'Flow Config Example - Edited',
                  steps: {
                    ON_RAMP: {
                      accountId: 'e9dec04a-3c57-4052-a89a-288c545f6430',
                      inputAssetId: 'COP',
                      outputAssetId: 'USD',
                    },
                    VAULT_ACCOUNT: {
                      accountId: '2',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                    OFF_RAMP: {
                      accountId: 'f2f74204-93ec-4614-870a-4ea2ad13aa0b',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                  },
                  conversionSlippageBasisPoints: 30,
                  createdAt: 1680625226267,
                },
              },
            },
          },
          '400': {
            description: 'Error creating the cross-border request. Configuration not modified.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'No cross-border settlement configuration exists with the provided ID.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Payments - cross-border settlement'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'configId',
            required: true,
            description: 'The cross-border settlement configuration ID.',
            schema: {
              type: 'string',
            },
            example: '074791cc-ef32-4920-8373-95efbeea66c5',
          },
        ],
        summary: 'Delete a cross-border settlement configuration',
        description:
          'Delete a cross-border settlement configuration.\nThis does not delete or remove previously executed flows that used this configuration.\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n',
        responses: {
          '200': {
            description:
              'Cross-border settlement configuration deleted successfully. Returns the deleted configuration.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementConfigDeletionResponse',
                },
                example: {
                  configId: '074791cc-ef32-4920-8373-95efbeea66c5',
                  corridorId: 'CO_US',
                  name: 'Flow Config Example - Edited',
                  steps: {
                    ON_RAMP: {
                      accountId: 'e9dec04a-3c57-4052-a89a-288c545f6430',
                      inputAssetId: 'COP',
                      outputAssetId: 'USD',
                    },
                    VAULT_ACCOUNT: {
                      accountId: '2',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                    OFF_RAMP: {
                      accountId: 'f2f74204-93ec-4614-870a-4ea2ad13aa0b',
                      inputAssetId: 'XLM_USDC_5F3T',
                      outputAssetId: 'XLM_USDC_5F3T',
                    },
                  },
                  conversionSlippageBasisPoints: 30,
                  createdAt: 1680625226267,
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'No cross-border settlement configuration exists with the provided ID.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/payments/xb-settlements/flows': {
      post: {
        tags: ['Payments - cross-border settlement'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Create a new cross-border settlement flow',
        description:
          'Create a cross-border flow (based on a cross-border configuration) with an amount to transfer. \nThe assetId is defined by the cross-border configuration.\nCreating a flow triggers a calculation of the flow estimations, including FX rates, times, and fees based on the amount provided.\nCreating a cross-border flow will not execute the flow.\n\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/XBSettlementCreateFlowRequestBody',
              },
              example: {
                configId: 'a4b0a706-4578-4467-bd5b-a852761dd2aa',
                amount: '100',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Cross-border settlement flow created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementCreateFlowResponse',
                },
                example: {
                  flowId: '98fb5a8b-65ff-4f15-b89c-80910aedbfb3',
                  configId: 'a4b0a706-4578-4467-bd5b-a852761dd2aa',
                  conversionRate: '0.05481268',
                  inputAmount: {
                    amount: '100',
                    assetId: 'MXN',
                  },
                  estimatedOutputAmount: {
                    amount: '5.461268',
                    assetId: 'XLM_USDC_5F3T',
                  },
                  totalEstimatedFee: {
                    amount: '0.063503',
                    assetId: 'XLM_USDC_5F3T',
                  },
                  steps: {
                    ON_RAMP: {
                      accountId: '3d6241ad-879b-4a11-842f-4cee9cd7fbba',
                      inputAmount: {
                        amount: '100',
                        assetId: 'MXN',
                      },
                      outputAmount: {
                        amount: '5.48126865',
                        assetId: 'USD',
                      },
                      estimatedFeeAmount: {
                        amount: '0.043503',
                        assetId: 'USD',
                      },
                      estimatedTime: 10,
                      isSignRequired: false,
                    },
                    VAULT_ACCOUNT: {
                      accountId: '1',
                      inputAmount: {
                        amount: '5.48126865',
                        assetId: 'USD',
                      },
                      outputAmount: {
                        amount: '5.471268',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      estimatedFeeAmount: {
                        amount: '0.01',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      estimatedTime: 63,
                      isSignRequired: true,
                    },
                    OFF_RAMP: {
                      accountId: '1cf7f750-117f-4c36-b4ef-14c420d118ce',
                      inputAmount: {
                        amount: '5.471268',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      outputAmount: {
                        amount: '5.461268',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      estimatedFeeAmount: {
                        amount: '0.01',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      estimatedTime: 95,
                      isSignRequired: true,
                    },
                  },
                  totalEstimatedTime: 696,
                },
              },
            },
          },
          '400': {
            description: 'Unable to create cross-border flow, invalid configuration ID.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/payments/xb-settlements/flows/{flowId}': {
      get: {
        tags: ['Payments - cross-border settlement'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'flowId',
            required: true,
            description: 'The cross-border settlement flow ID.',
            schema: {
              type: 'string',
            },
            example: '98fb5a8b-65ff-4f15-b89c-80910aedbfb3',
          },
        ],
        summary: 'Get specific cross-border settlement flow details',
        description:
          'Gets details for a specific cross-border settlement flow\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n',
        responses: {
          '200': {
            description:
              'Returns cross-border settlement flow details.\nFor unexecuted flows, a preview object will return, showing the estimated time, amounts, and fees.\nNote that this data structure updates as the flow progresses, including the total fees (accumulated), state, and steps.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementGetFlowResponse',
                },
                examples: {
                  'not executed': {
                    value: {
                      preview: {
                        flowId: '98fb5a8b-65ff-4f15-b89c-80910aedbfb3',
                        configId: 'a4b0a706-4578-4467-bd5b-a852761dd2aa',
                        conversionRate: '0.055369',
                        inputAmount: {
                          amount: '32',
                          assetId: 'MXN',
                        },
                        estimatedOutputAmount: {
                          amount: '1.741824',
                          assetId: 'XLM_USDC_5F3T',
                        },
                        totalEstimatedFee: {
                          amount: '0.044063',
                          assetId: 'XLM_USDC_5F3T',
                        },
                        totalEstimatedTime: 831,
                        steps: {
                          ON_RAMP: {
                            accountId: '3d6241ad-879b-4a11-842f-4cee9cd7fbba',
                            inputAmount: {
                              amount: '32',
                              assetId: 'MXN',
                            },
                            outputAmount: {
                              amount: '1.77182407',
                              assetId: 'USD',
                            },
                            estimatedFeeAmount: {
                              amount: '0.014063',
                              assetId: 'USD',
                            },
                            estimatedTime: 10,
                            isSignRequired: false,
                          },
                          VAULT_ACCOUNT: {
                            accountId: '1',
                            inputAmount: {
                              amount: '1.77182407',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            outputAmount: {
                              amount: '1.761824',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            estimatedFeeAmount: {
                              amount: '0.01',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            estimatedTime: 111,
                            isSignRequired: true,
                          },
                          OFF_RAMP: {
                            accountId: '1cf7f750-117f-4c36-b4ef-14c420d118ce',
                            inputAmount: {
                              amount: '1.761824',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            outputAmount: {
                              amount: '1.751824',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            estimatedFeeAmount: {
                              amount: '0.01',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            estimatedTime: 293,
                            isSignRequired: true,
                          },
                        },
                      },
                    },
                  },
                  'in progress': {
                    value: {
                      execution: {
                        flowId: '98fb5a8b-65ff-4f15-b89c-80910aedbfb3',
                        configId: 'a4b0a706-4578-4467-bd5b-a852761dd2aa',
                        inputAmount: {
                          amount: '32',
                          assetId: 'MXN',
                        },
                        outputAmount: {
                          amount: '1.471824',
                          assetId: 'XLM_USDC_5F3T',
                        },
                        totalFee: {
                          amount: '0.004415',
                          assetId: 'XLM_USDC_5F3T',
                        },
                        initiatedAt: 1684919822759,
                        initiatedBy: 'a92e87a0-5231-531e-a624-fb29c1283764',
                        state: 'PROCESSING',
                        selectedConversionSlippage: {
                          basisPoints: 10,
                          reason: 'FLOW',
                        },
                        steps: {
                          ON_RAMP: {
                            id: 'c1863abf-e7fa-4f3a-908a-bcd6381f7eb4',
                            accountId: '3d6241ad-879b-4a11-842f-4cee9cd7fbba',
                            status: 'COMPLETED',
                            inputAmount: {
                              amount: '32',
                              assetId: 'MXN',
                            },
                            outputAmount: {
                              amount: '1.77182407',
                              assetId: 'USD',
                            },
                            fee: {
                              amount: '0.014063',
                              assetId: 'USD',
                            },
                            startedAt: 1684919823052,
                            completedAt: 1684919830456,
                            isSignRequired: false,
                          },
                          VAULT_ACCOUNT: {
                            id: '2aa2634d-2bab-44ac-9b4e-36e2e4db5d49',
                            accountId: '1',
                            status: 'COMPLETED',
                            inputAmount: {
                              amount: '1.77182407',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            outputAmount: {
                              amount: '1.761824',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            fee: {
                              amount: '0.01',
                              assetId: 'XLM',
                            },
                            startedAt: 1684919831385,
                            completedAt: 1684920680227,
                            isSignRequired: true,
                          },
                          OFF_RAMP: {
                            id: 'b221ed63-a05c-4e78-b2f2-205dcffeabda',
                            accountId: '1cf7f750-117f-4c36-b4ef-14c420d118ce',
                            status: 'PROCESSING',
                            inputAmount: {
                              amount: '1.761824',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            startedAt: 1684920681088,
                            isSignRequired: true,
                          },
                        },
                      },
                    },
                  },
                  completed: {
                    value: {
                      execution: {
                        flowId: '98fb5a8b-65ff-4f15-b89c-80910aedbfb3',
                        configId: 'a4b0a706-4578-4467-bd5b-a852761dd2aa',
                        inputAmount: {
                          amount: '32',
                          assetId: 'MXN',
                        },
                        outputAmount: {
                          amount: '1.471824',
                          assetId: 'XLM_USDC_5F3T',
                        },
                        totalFee: {
                          amount: '0.004415',
                          assetId: 'XLM_USDC_5F3T',
                        },
                        initiatedAt: 1684919822759,
                        initiatedBy: 'a92e87a0-5231-531e-a624-fb29c1283764',
                        state: 'COMPLETED',
                        selectedConversionSlippage: {
                          basisPoints: 10,
                          reason: 'FLOW',
                        },
                        steps: {
                          ON_RAMP: {
                            id: 'b1bec144-c4dd-4ff8-80ed-4204c83dd422',
                            accountId: '3d6241ad-879b-4a11-842f-4cee9cd7fbba',
                            status: 'COMPLETED',
                            inputAmount: {
                              amount: '32',
                              assetId: 'MXN',
                            },
                            outputAmount: {
                              amount: '1.77182407',
                              assetId: 'USD',
                            },
                            fee: {
                              amount: '0.014063',
                              assetId: 'USD',
                            },
                            startedAt: 1684919823052,
                            completedAt: 1684919830456,
                            isSignRequired: false,
                          },
                          VAULT_ACCOUNT: {
                            id: 'df7e0103-04cf-4508-9654-aa5e4b90dd50',
                            accountId: '1',
                            status: 'COMPLETED',
                            inputAmount: {
                              amount: '1.77182407',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            outputAmount: {
                              amount: '1.761824',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            fee: {
                              amount: '0.01',
                              assetId: 'XLM',
                            },
                            startedAt: 1684919831385,
                            completedAt: 1684920680227,
                            isSignRequired: true,
                          },
                          OFF_RAMP: {
                            id: '34c2d597-271a-4c11-937a-3c246f5d39c2',
                            accountId: '1cf7f750-117f-4c36-b4ef-14c420d118ce',
                            status: 'COMPLETED',
                            inputAmount: {
                              amount: '1.761824',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            outputAmount: {
                              amount: '1.761823',
                              assetId: 'XLM_USDC_5F3T',
                            },
                            fee: {
                              amount: '0.00001',
                              assetId: 'XLM',
                            },
                            startedAt: 1684920681088,
                            completedAt: 1684921261453,
                            isSignRequired: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Invalid flowId.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/payments/xb-settlements/flows/{flowId}/actions/execute': {
      post: {
        tags: ['Payments - cross-border settlement'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'flowId',
            required: true,
            description: 'The cross-border settlement flow ID.',
            schema: {
              type: 'string',
            },
            example: '98fb5a8b-65ff-4f15-b89c-80910aedbfb3',
          },
        ],
        summary: 'Execute cross-border settlement flow',
        description:
          "Send a payment flow with 'flowId' for execution.\nIf a differet slippage configuraion is needed for this execution than configured in the flow configuration, the request body must define the desired slippage configuration for this execution.\n\n**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoint includes APIs available only for customers with the Payments Engine enabled on their accounts.\nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about the Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n",
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/XBSettlementFlowExecutionRequestBody',
              },
              example: {
                conversionSlippageBasisPoints: 10,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Cross-border settlement flow started to execute successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/XBSettlementFlowExecutionResponse',
                },
                example: {
                  flowId: '98fb5a8b-65ff-4f15-b89c-80910aedbfb3',
                  configId: 'a4b0a706-4578-4467-bd5b-a852761dd2aa',
                  inputAmount: {
                    amount: '32',
                    assetId: 'MXN',
                  },
                  outputAmount: {
                    amount: '1.471824',
                    assetId: 'XLM_USDC_5F3T',
                  },
                  totalFee: {
                    amount: '0.004415',
                    assetId: 'XLM_USDC_5F3T',
                  },
                  initiatedAt: 1684919822759,
                  initiatedBy: 'a92e87a0-5231-531e-a624-fb29c1283764',
                  state: 'PROCESSING',
                  selectedConversionSlippage: {
                    basisPoints: 10,
                    reason: 'FLOW',
                  },
                  steps: {
                    ON_RAMP: {
                      id: 'c1863abf-e7fa-4f3a-908a-bcd6381f7eb4',
                      accountId: '3d6241ad-879b-4a11-842f-4cee9cd7fbba',
                      status: 'COMPLETED',
                      inputAmount: {
                        amount: '32',
                        assetId: 'MXN',
                      },
                      outputAmount: {
                        amount: '1.77182407',
                        assetId: 'USD',
                      },
                      fee: {
                        amount: '0.014063',
                        assetId: 'USD',
                      },
                      startedAt: 1684919823052,
                      completedAt: 1684919830456,
                      isSignRequired: false,
                    },
                    VAULT_ACCOUNT: {
                      id: '2aa2634d-2bab-44ac-9b4e-36e2e4db5d49',
                      accountId: '1',
                      status: 'PROCESSING',
                      inputAmount: {
                        amount: '1.77182407',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      outputAmount: {
                        amount: '1.761824',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      fee: {
                        amount: '0.01',
                        assetId: 'XLM',
                      },
                      startedAt: 1684919831385,
                      isSignRequired: true,
                    },
                    OFF_RAMP: {
                      id: 'b221ed63-a05c-4e78-b2f2-205dcffeabda',
                      accountId: '1cf7f750-117f-4c36-b4ef-14c420d118ce',
                      status: 'NOT_STARTED',
                      inputAmount: {
                        amount: '1.761824',
                        assetId: 'XLM_USDC_5F3T',
                      },
                      isSignRequired: true,
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Error while trying to execute the cross-border flow',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'Invalid flowId.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/payments/payout': {
      post: {
        tags: ['Payments - Payout'],
        description:
          '**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoints include APIs available only for customers with Payments Engine enabled on their accounts. </br>\n</br>These endpoints are currently in beta and might be subject to changes.</br>\n</br>If you want to learn more about Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or email CSM@fireblocks.com. </br>\n</br> <b u>Create a payout instruction set.</b> </u></br>\nA payout instruction set is a set of instructions for distributing payments from a single payment account to a list of payee accounts. </br>\nThe instruction set defines: </br>\n<ul>\n<li>the payment account and its account type (vault, exchange, or fiat). </li>\n<li>the account type (vault account, exchange account, whitelisted address, network connection, fiat account, or merchant account), the amount, and the asset of payment for each payee account.</li>\n</ul>\n',
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Create a payout instruction set',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreatePayoutRequest',
              },
              example: {
                paymentAccount: {
                  id: 'EX_SUB3',
                  type: 'EXCHANGE_ACCOUNT',
                },
                instructionSet: [
                  {
                    payeeAccount: {
                      id: 'bef85a1c-b605-4b2e-bdb5-2d400f4d0bf3',
                      type: 'EXTERNAL_WALLET',
                    },
                    amount: {
                      amount: '43',
                      assetId: 'USDC',
                    },
                  },
                  {
                    payeeAccount: {
                      id: '3adc1f92-e791-44a8-9aee-7f31c2108b78',
                      type: 'NETWORK_CONNECTION',
                    },
                    amount: {
                      amount: '4423',
                      assetId: 'USDC',
                    },
                  },
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description:
              'The payout instruction set creation succeeded and returns the generated instruction set with a unique payout IDThe payout ID will be used for executing the payout and checking the payout status.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PayoutResponse',
                },
                example: {
                  payoutId: '1fe3b61f-7e1f-4a19-aff0-4f0a524d44d7',
                  paymentAccount: {
                    id: 'EX_SUB3',
                    type: 'EXCHANGE_ACCOUNT',
                  },
                  createdAt: 1645365800,
                  state: 'REQUESTED',
                  status: 'REGISTERED',
                  initMethod: 'API',
                  instructionSet: [
                    {
                      id: '6ea4a016-536b-49af-b1a0-40b343ccf879',
                      name: 'payee-wallet-name',
                      payeeAccount: {
                        id: 'bef85a1c-b605-4b2e-bdb5-2d400f4d0bf3',
                        type: 'EXTERNAL_WALLET',
                      },
                      amount: {
                        amount: '43',
                        assetId: 'USDC',
                      },
                      state: 'NOT_STARTED',
                      transactions: [],
                    },
                    {
                      id: 'e783a79b-6acc-4d18-885d-ed533cad8eeb',
                      name: 'payee-by-network',
                      payeeAccount: {
                        id: '3adc1f92-e791-44a8-9aee-7f31c2108b78',
                        type: 'NETWORK_CONNECTION',
                      },
                      amount: {
                        amount: '4423.23',
                        assetId: 'USDC',
                      },
                      state: 'NOT_STARTED',
                      transactions: [],
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/payments/payout/{payoutId}/actions/execute': {
      post: {
        tags: ['Payments - Payout'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Execute a payout instruction set',
        description:
          '**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoints include APIs available only for customers with Payments Engine enabled on their accounts. </br>\n</br>These endpoints are currently in beta and might be subject to changes.</br>\n</br>If you want to learn more about Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or email CSM@fireblocks.com. </br>\n</br><b u>Execute a payout instruction set.</b> </u> </br>\n</br>The instruction set will be verified and executed.</br>\n<b><u>Source locking</br></b> </u>\nIf you are executing a payout instruction set from a payment account with an already active payout the active payout will complete before the new payout instruction set can be executed. </br>\nYou cannot execute the same payout instruction set more than once.\n',
        parameters: [
          {
            name: 'payoutId',
            description: 'the payout id received from the creation of the payout instruction set',
            in: 'path',
            schema: {
              type: 'string',
            },
            required: true,
            example: '1fe3b61f-7e1f-4a19-aff0-4f0a524d44d7',
          },
        ],
        responses: {
          '200': {
            description: 'Executed the payout instruction set',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DispatchPayoutResponse',
                },
                example: {
                  payoutId: '1fe3b61f-7e1f-4a19-aff0-4f0a524d44d7',
                },
              },
            },
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/payments/payout/{payoutId}': {
      get: {
        tags: ['Payments - Payout'],
        summary: 'Get the status of a payout instruction set',
        description:
          '**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoints include APIs available only for customers with Payments Engine enabled on their accounts. </br>\n</br>These endpoints are currently in beta and might be subject to changes.</br>\n</br>If you want to learn more about Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or email CSM@fireblocks.com. </br>\n',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'payoutId',
            description: 'the payout id received from the creation of the payout instruction set',
            in: 'path',
            schema: {
              type: 'string',
            },
            required: true,
            example: '1fe3b61f-7e1f-4a19-aff0-4f0a524d44d7',
          },
        ],
        responses: {
          '200': {
            description:
              'Returns the current status of the payout instruction set, including the status of each payout instruction and the transactions created in the process.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PayoutResponse',
                },
                example: {
                  payoutId: '1fe3b61f-7e1f-4a19-aff0-4f0a524d44d7',
                  paymentAccount: {
                    id: 'EX_SUB3',
                    type: 'EXCHANGE_ACCOUNT',
                  },
                  createdAt: 1645365800,
                  state: 'FINALIZED',
                  status: 'DONE',
                  initMethod: 'API',
                  instructionSet: [
                    {
                      id: '6ea4a016-536b-49af-b1a0-40b343ccf879',
                      name: 'payee-wallet-name',
                      payeeAccount: {
                        id: 'bef85a1c-b605-4b2e-bdb5-2d400f4d0bf3',
                        type: 'EXTERNAL_WALLET',
                      },
                      amount: {
                        amount: '4312',
                        assetId: 'USDC',
                      },
                      state: 'COMPLETED',
                      transactions: [
                        {
                          id: '35a4b10c-1f83-4f0b-ba2a-da0e73be2d6e',
                          state: 'COMPLETED',
                          timestamp: 1645367429,
                        },
                      ],
                    },
                    {
                      id: 'e783a79b-6acc-4d18-885d-ed533cad8eeb',
                      name: 'payee-by-network',
                      payeeAccount: {
                        id: '3adc1f92-e791-44a8-9aee-7f31c2108b78',
                        type: 'NETWORK_CONNECTION',
                      },
                      amount: {
                        amount: '4423.23',
                        assetId: 'USDC',
                      },
                      state: 'COMPLETED',
                      transactions: [
                        {
                          id: '4505e7d9-bfc7-41bc-9750-54311fcbbf26',
                          state: 'COMPLETED',
                          timestamp: 1645367449,
                        },
                      ],
                    },
                  ],
                  reportUrl: 'https://some-url.com/reports/cc5777c1-75a9-4337-aebd-f1f5a40a9391',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized. Missing / invalid JWT token in Authorization header.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'No payout with the given payout ID exists.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '5XX': {
            description: 'Internal error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/gas_station': {
      get: {
        summary: 'Get gas station settings',
        description: 'Returns gas station settings and ETH balance.',
        tags: ['Gas stations'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'gas_station_info = fireblocks.get_gas_station_info()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const gasStationInfo = await fireblocks.gasStationInfo();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'Gas Station properties',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/GasStationPropertiesResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/gas_station/{assetId}': {
      get: {
        summary: 'Get gas station settings by asset',
        description: 'Returns gas station settings and balances for a requested asset.',
        tags: ['Gas stations'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'gas_station_info = fireblocks.get_gas_station_info(asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const gasStationInfo = await fireblocks.gasStationInfo(assetId);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            required: true,
            name: 'assetId',
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Gas Station properties',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/GasStationPropertiesResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/gas_station/configuration': {
      put: {
        summary: 'Edit gas station settings',
        description: 'Configures gas station settings for ETH.',
        tags: ['Gas stations'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'gas_station = fireblocks.set_gas_station_configuration(gas_threshold, gas_cap, max_gas_price, asset_id)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const gasStation = await fireblocks.setGasStationConfiguration(gasThreshold, gasCap, maxGasPrice)',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GasStationConfiguration',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/gas_station/configuration/{assetId}': {
      put: {
        summary: 'Edit gas station settings for an asset',
        description: 'Configures gas station settings for a requested asset.',
        tags: ['Gas stations'],
        parameters: [
          {
            in: 'path',
            required: true,
            name: 'assetId',
            description: 'The ID of the asset',
            schema: {
              type: 'string',
              'x-fb-entity': 'asset',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GasStationConfiguration',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/users': {
      get: {
        summary: 'List users',
        description:
          'List all users for the workspace.\n\nPlease note that this endpoint is available only for API keys with Admin permissions.\n',
        tags: ['Users'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'users = fireblocks.get_users()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const users = await fireblocks.getUsers();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'List of users',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/GetUsersResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/audits': {
      get: {
        summary: 'Get audit logs',
        tags: ['Audit Logs'],
        parameters: [
          {
            in: 'query',
            name: 'timePeriod',
            required: true,
            description: 'The last time period to fetch audit logs',
            schema: {
              type: 'string',
              enum: ['DAY', 'WEEK'],
            },
          },
        ],
        responses: {
          '200': {
            description: 'Audit logs from requested time period',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/off_exchange/add': {
      post: {
        summary: 'add collateral',
        description: 'add collateral, create deposit request',
        tags: ['Off exchanges'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AddCollateralRequestBody',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'A transaction object',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CreateTransactionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/off_exchange/remove': {
      post: {
        summary: 'remove collateral',
        description: 'remove collateral, create withdraw request',
        tags: ['Off exchanges'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RemoveCollateralRequestBody',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'A transaction object',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/CreateTransactionResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/off_exchange/settlements/trader': {
      post: {
        summary: 'create settlement for a trader',
        description: 'create settlement for a trader',
        tags: ['Off exchanges'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SettlementRequestBody',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'A settlement object',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/SettlementResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/off_exchange/settlements/transactions': {
      get: {
        summary: 'get settlements transactions from exchange',
        description: 'get settlements transactions from exchange',
        tags: ['Off exchanges'],
        parameters: [
          {
            in: 'query',
            name: 'mainExchangeAccountId',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A settlement transactions',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/GetSettlementResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/off_exchange/collateral_accounts/{mainExchangeAccountId}': {
      get: {
        summary: 'Find a specific collateral exchange account',
        description: 'Returns a collateral account by mainExchangeAccountId.',
        tags: ['Off exchanges'],
        parameters: [
          {
            in: 'path',
            name: 'mainExchangeAccountId',
            required: true,
            description:
              'The id of the main exchange account for which the requested collateral account is associated with',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        responses: {
          '200': {
            description: 'An ExchangeAccount object',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ExchangeAccount',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/webhooks/resend': {
      post: {
        summary: 'Resend failed webhooks',
        description: 'Resends all failed webhook notifications.',
        tags: ['Webhooks'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.resend_webhooks()',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.resendWebhooks();',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/ResendWebhooksResponse',
                },
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/webhooks/resend/{txId}': {
      post: {
        summary: 'Resend failed webhooks for a transaction by ID',
        description: 'Resends failed webhook notifications for a transaction by ID.',
        tags: ['Webhooks'],
        'x-readme': {
          'code-samples': [
            {
              language: 'python',
              code: 'result = fireblocks.resend_transaction_webhooks_by_id(txId, resend_created, resend_status_updated)',
              name: 'Fireblocks SDK Python example',
            },
            {
              language: 'javascript',
              code: 'const result = await fireblocks.resendTransactionWebhooksById(txId, resendCreated, resendStatusUpdated);',
              name: 'Fireblocks SDK Javascript example',
            },
          ],
        },
        parameters: [
          {
            in: 'path',
            name: 'txId',
            required: true,
            description: 'The ID of the transaction for webhooks',
            schema: {
              type: 'string',
              minimum: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  resendCreated: {
                    type: 'boolean',
                  },
                  resendStatusUpdated: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          default: {
            $ref: '#/components/responses/Error',
          },
        },
      },
    },
    '/nfts/ownership/tokens': {
      put: {
        operationId: 'refreshNFTOwnershipByVault',
        summary: 'Refresh vault account tokens',
        description:
          'Updates all tokens and balances per blockchain and vault account.\n\n**Note**: This endpoint is now in Beta, disabled for general availability at this time.\n\nTo enroll in beta & enable this endpoint, contact your Fireblocks Customer Success Manager or reach out to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).\n',
        parameters: [
          {
            name: 'blockchainDescriptor',
            required: true,
            in: 'query',
            description: 'Blockchain descriptor filter',
            schema: {
              enum: ['ETH', 'ETH_TEST3', 'POLYGON', 'POLYGON_TEST_MUMBAI'],
              type: 'string',
            },
          },
          {
            name: 'vaultAccountId',
            required: true,
            in: 'query',
            description: 'Vault account filter',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '202': {
            description: '',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
        },
        tags: ['NFTs (Beta)'],
      },
      get: {
        operationId: 'getOwnedNFTs',
        summary: 'List all owned tokens (paginated)',
        description:
          'Returns all tokens and their data in your workspace.\n\n**Note**: This endpoint is now in Beta, disabled for general availability at this time.\n\nTo enroll in beta & enable this endpoint, contact your Fireblocks Customer Success Manager or reach out to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).\n',
        parameters: [
          {
            name: 'blockchainDescriptor',
            required: false,
            in: 'query',
            description: 'Blockchain descriptor filter',
            schema: {
              enum: ['ETH', 'ETH_TEST3', 'POLYGON', 'POLYGON_TEST_MUMBAI'],
              type: 'string',
            },
          },
          {
            name: 'vaultAccountIds',
            required: false,
            in: 'query',
            description:
              'A comma separated list of Vault Account IDs. Up to 100 are allowed in a single request',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'ids',
            required: false,
            in: 'query',
            description:
              'A comma separated list of NFT IDs. Up to 100 are allowed in a single request.',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'collectionIds',
            required: false,
            in: 'query',
            description:
              'A comma separated list of collection IDs. Up to 100 are allowed in a single request.',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'pageCursor',
            required: false,
            in: 'query',
            description: 'Page cursor to fetch',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'pageSize',
            required: false,
            in: 'query',
            description: 'Items per page (max 100)',
            schema: {
              minimum: 1,
              maximum: 100,
              type: 'number',
            },
          },
          {
            name: 'sort',
            required: false,
            in: 'query',
            description:
              'Sort by param, it can be one param or a list of params separated by comma',
            schema: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['ownershipLastUpdateTime', 'name', 'collection.name'],
              },
            },
          },
          {
            name: 'order',
            required: false,
            in: 'query',
            description: 'Order direction, it can be `ASC` for ascending or `DESC` for descending',
            schema: {
              default: 'ASC',
              enum: ['DESC', 'ASC'],
              type: 'string',
            },
          },
          {
            name: 'status',
            required: false,
            in: 'query',
            description: 'Token ownership status',
            schema: {
              default: 'LISTED',
              enum: ['LISTED', 'ARCHIVED'],
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              'application/json': {
                schema: {
                  properties: {
                    paging: {
                      $ref: '#/components/schemas/Paging',
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/TokenOwnershipResponse',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: ['NFTs (Beta)'],
      },
    },
    '/nfts/tokens/{id}': {
      put: {
        operationId: 'refreshNFTMetadata',
        summary: 'Refresh token metadata',
        description:
          'Updates the latest token metadata.\n\n**Note**: This endpoint is now in Beta, disabled for general availability at this time.\n\nTo enroll in beta & enable this endpoint, contact your Fireblocks Customer Success Manager or reach out to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).\n',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'NFT ID',
            example: 'NFT-abcdefabcdefabcdefabcdefabcdefabcdefabcd',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '202': {
            description: '',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
        },
        tags: ['NFTs (Beta)'],
      },
      get: {
        operationId: 'getNFT',
        summary: 'List token data by ID',
        description:
          'Returns the requested token data.\n\n**Note**: This endpoint is now in Beta, disabled for general availability at this time.\n\nTo enroll in beta & enable this endpoint, contact your Fireblocks Customer Success Manager or reach out to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).\n',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'NFT ID',
            example: 'NFT-abcdefabcdefabcdefabcdefabcdefabcdefabcd',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TokenResponse',
                },
              },
            },
          },
        },
        tags: ['NFTs (Beta)'],
      },
    },
    '/nfts/tokens': {
      get: {
        operationId: 'getNFTs',
        summary: 'List tokens by IDs',
        description:
          'Returns the requested tokens data\n\n**Note**: This endpoint is now in Beta, disabled for general availability at this time.\n\nTo enroll in beta & enable this endpoint, contact your Fireblocks Customer Success Manager or reach out to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).\n',
        parameters: [
          {
            name: 'ids',
            required: true,
            in: 'query',
            description:
              'A comma separated list of NFT IDs. Up to 100 are allowed in a single request.',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'pageCursor',
            required: false,
            in: 'query',
            description: 'Page cursor to fetch',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'pageSize',
            required: false,
            in: 'query',
            description: 'Items per page (max 100)',
            schema: {
              minimum: 1,
              maximum: 100,
              type: 'number',
            },
          },
          {
            name: 'sort',
            required: false,
            in: 'query',
            description:
              'Sort by param, it can be one param or a list of params separated by comma',
            schema: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['collection.name', 'name'],
              },
            },
          },
          {
            name: 'order',
            required: false,
            in: 'query',
            description: 'Order direction, it can be `ASC` for ascending or `DESC` for descending',
            schema: {
              default: 'ASC',
              enum: ['DESC', 'ASC'],
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              'application/json': {
                schema: {
                  properties: {
                    paging: {
                      $ref: '#/components/schemas/Paging',
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/TokenResponse',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: ['NFTs (Beta)'],
      },
    },
    '/nfts/ownership/tokens/{id}/status': {
      put: {
        operationId: 'updateTokenOwnershipStatus',
        summary: 'Update token ownership status',
        description:
          'Updates token ownership status for a tenant, in all tenant vaults.\n\n**Note**: This endpoint is now in Beta, disabled for general availability at this time.\n\nTo enroll in beta & enable this endpoint, contact your Fireblocks Customer Success Manager or reach out to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).\n',
        parameters: [
          {
            name: 'id',
            required: true,
            in: 'path',
            description: 'NFT ID',
            example: 'NFT-abcdefabcdefabcdefabcdefabcdefabcdefabcd',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTokenOwnershipStatusDto',
              },
            },
          },
        },
        responses: {
          '200': {
            description: '',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
        },
        tags: ['NFTs (Beta)'],
      },
    },
    '/connections': {
      get: {
        operationId: 'get',
        summary: 'List all open Web3 connections.',
        description: 'Get open Web3 connections.',
        parameters: [
          {
            name: 'order',
            required: false,
            in: 'query',
            description: 'List order; ascending or descending.',
            schema: {
              type: 'string',
              enum: ['ASC', 'DESC'],
              default: 'ASC',
            },
          },
          {
            name: 'filter',
            required: false,
            in: 'query',
            description: 'Parsed filter object',
            examples: {
              object: {
                summary: 'The filter object',
                description: '',
                value: {
                  id: 'string',
                  userId: 'string',
                  vaultAccountId: 'number',
                  connectionMethod: 'string',
                  feeLevel: 'string',
                  appUrl: 'string',
                  appName: 'string',
                },
              },
              stringified: {
                summary: 'The stringified parsed object',
                description:
                  "About stringified parsed objects:\n\n* Each key-value pair is separated by '=', and each pair is separated by ',' (you can use [`qs`](https://www.npmjs.com/package/qs) package for this)",
                value:
                  'id=string,userId=string,vaultAccountId=number,connectionMethod=string,feeLevel=string,appUrl=string,appName=string',
              },
            },
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                userId: {
                  type: 'string',
                },
                vaultAccountId: {
                  type: 'number',
                },
                connectionMethod: {
                  type: 'string',
                },
                feeLevel: {
                  type: 'string',
                },
                appUrl: {
                  type: 'string',
                },
                appName: {
                  type: 'string',
                },
              },
            },
          },
          {
            name: 'sort',
            required: false,
            in: 'query',
            description: 'Property to sort Web3 connections by.',
            schema: {
              type: 'string',
              enum: [
                'id',
                'userId',
                'vaultAccountId',
                'createdAt',
                'feeLevel',
                'appUrl',
                'appName',
              ],
              default: 'createdAt',
            },
          },
          {
            name: 'pageSize',
            required: false,
            in: 'query',
            description: 'Amount of results to return in the next page.',
            schema: {
              type: 'number',
              default: 10,
              maximum: 50,
            },
          },
          {
            name: 'next',
            required: false,
            in: 'query',
            description: 'Cursor to the next page',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GetConnectionsResponse',
                },
              },
            },
          },
          '400': {
            description: 'Query parameters were invalid',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          '500': {
            description: 'Something went wrong',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
        },
        tags: ['Web3 connections'],
      },
    },
    '/connections/wc': {
      post: {
        operationId: 'create',
        summary: 'Create a new Web3 connection.',
        description:
          'Initiate a new Web3 connection.\n\n* Note: After this succeeds, make a request to `PUT /v1/connections/wc/{id}` (below) to approve or reject the new Web3 connection.',
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateConnectionRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Web3 connection initiated successfully',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateConnectionResponse',
                },
              },
            },
          },
          '400': {
            description: 'Invalid data sent',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          '500': {
            description: 'Something went wrong',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
        },
        tags: ['Web3 connections'],
      },
    },
    '/connections/wc/{id}': {
      put: {
        operationId: 'submit',
        summary: 'Respond to a pending Web3 connection request.',
        description:
          'Submit a response to *approve* or *reject* an initiated Web3 connection.\n* Note: This call is used to complete your `POST /v1/connections/wc/` request.\n\nAfter this succeeds, your new Web3 connection is created and functioning.',
        parameters: [
          {
            name: 'id',
            description: 'The ID of the initiated Web3 connection to approve.',
            required: true,
            in: 'path',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RespondToConnectionRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Connection submitted successfully',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          '400': {
            description: 'Invalid data sent',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          '404': {
            description: 'Connection not found',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          '500': {
            description: 'Something went wrong',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
        },
        tags: ['Web3 connections'],
      },
      delete: {
        operationId: 'remove',
        summary: 'Remove an existing Web3 connection.',
        description: 'Remove a Web3 connection',
        parameters: [
          {
            name: 'id',
            description: 'The ID of the existing Web3 connection to remove.',
            required: true,
            in: 'path',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Connection removed successfully',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          '404': {
            description: 'Connection not found',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
          '500': {
            description: 'Something went wrong',
            headers: {
              'X-Request-ID': {
                $ref: '#/components/headers/X-Request-ID',
              },
            },
          },
        },
        tags: ['Web3 connections'],
      },
    },
    '/screening/travel_rule/transaction/validate': {
      post: {
        operationId: 'TravelRuleApiController_validate',
        summary: 'Validate Travel Rule Transaction',
        description:
          "Validate Travel Rule transactions.\n\nChecks what beneficiary VASP details are required by your jurisdiction and the beneficiary's jurisdiction.\n\n**Note:** The reference content in this section documents the Travel Rule beta endpoint. The beta endpoint includes APIs that are currently in preview and aren't yet generally available.\n\nTo enroll in the beta and enable this endpoint, contact your Fireblocks Customer Success Manager or send an email to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TravelRuleValidateTransactionRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Transaction validated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TravelRuleValidateTransactionResponse',
                },
              },
            },
          },
          '400': {
            description: 'Invalid request body',
          },
          '500': {
            description: 'Internal server error',
          },
        },
        tags: ['Travel Rule (Beta)'],
      },
    },
    '/screening/travel_rule/transaction/validate/full': {
      post: {
        operationId: 'TravelRuleApiController_validateFull',
        summary: 'Validate Full Travel Rule Transaction',
        description:
          "Validate Full Travel Rule transactions.\n\nChecks for all required information on the originator and beneficiary VASPs.\n\n**Note:** The reference content in this section documents the Travel Rule beta endpoint. The beta endpoint includes APIs that are currently in preview and aren't yet generally available.\n\nTo enroll in the beta and enable this endpoint, contact your Fireblocks Customer Success Manager or send an email to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TravelRuleValidateFullTransactionRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Transaction validated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TravelRuleValidateTransactionResponse',
                },
              },
            },
          },
          '400': {
            description: 'Invalid request body',
          },
          '500': {
            description: 'Internal server error',
          },
        },
        tags: ['Travel Rule (Beta)'],
      },
    },
    '/screening/travel_rule/vasp/{did}': {
      get: {
        operationId: 'TravelRuleApiController_findVasp',
        summary: 'Get VASP details',
        description:
          "Get VASP Details.\n\nReturns information about a VASP that has the specified DID.\n\n**Note:** The reference content in this section documents the Travel Rule beta endpoint. The beta endpoint includes APIs that are currently in preview and aren't yet generally available.\n\nTo enroll in the beta and enable this endpoint, contact your Fireblocks Customer Success Manager or send an email to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).",
        parameters: [
          {
            name: 'did',
            required: true,
            in: 'path',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'fields',
            required: false,
            in: 'query',
            description:
              'CSV of fields to return (all, "blank" or see list of all field names below)',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Transaction validated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TravelRuleVASP',
                },
              },
            },
          },
          '400': {
            description: 'Invalid request body',
          },
          '500': {
            description: 'Internal server error',
          },
        },
        tags: ['Travel Rule (Beta)'],
      },
    },
    '/screening/travel_rule/vasp': {
      get: {
        operationId: 'TravelRuleApiController_findAllVasp',
        summary: 'Get All VASPs',
        description:
          "Get All VASPs.\n\nReturns a list of VASPs. VASPs can be searched and sorted and results are paginated.\n\n**Note:** The reference content in this section documents the Travel Rule beta endpoint. The beta endpoint includes APIs that are currently in preview and aren't yet generally available.\n\nTo enroll in the beta and enable this endpoint, contact your Fireblocks Customer Success Manager or send an email to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).",
        parameters: [
          {
            name: 'order',
            required: false,
            in: 'query',
            description: 'Field to order by',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'per_page',
            required: false,
            in: 'query',
            description: 'Records per page',
            schema: {
              type: 'number',
            },
          },
          {
            name: 'page',
            required: false,
            in: 'query',
            description: 'Page number',
            schema: {
              type: 'number',
            },
          },
          {
            name: 'fields',
            required: false,
            in: 'query',
            description:
              'CSV of fields to return (all, "blank" or see list of all field names below)',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get all VASPs',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TravelRuleGetAllVASPsResponse',
                },
              },
            },
          },
        },
        tags: ['Travel Rule (Beta)'],
      },
    },
    '/screeening/travel_rule/vasp/update': {
      put: {
        operationId: 'TravelRuleApiController_updateVasp',
        summary: 'Add jsonDidKey to VASP details',
        description:
          "Update VASP Details.\n\nUpdates a VASP with the provided parameters. Use this endpoint to add your public jsonDIDkey generated by Notabene.\n\n**Note:** The reference content in this section documents the Travel Rule beta endpoint. The beta endpoint includes APIs that are currently in preview and aren't yet generally available.\n\nTo enroll in the beta and enable this endpoint, contact your Fireblocks Customer Success Manager or send an email to [CSM@fireblocks.com](mailto:CSM@fireblocks.com).",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TravelRuleUpdateVASPDetails',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'VASP updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TravelRuleUpdateVASPDetails',
                },
              },
            },
          },
          '400': {
            description: 'Invalid request body',
          },
          '500': {
            description: 'Internal server error',
          },
        },
        tags: ['Travel Rule (Beta)'],
      },
    },
  },
  components: {
    responses: {
      Error: {
        description: 'Error Response',
        headers: {
          'X-Request-ID': {
            $ref: '#/components/headers/X-Request-ID',
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
    headers: {
      'X-Request-ID': {
        schema: {
          type: 'string',
        },
        description:
          'Unique ID correlated to the API request. Please provide it in any support ticket you create or on Github issues related to Fireblocks SDKs',
      },
    },
    requestBodies: {
      NewWallet: {
        content: {
          'application/json': {
            schema: {
              properties: {
                name: {
                  type: 'string',
                  description: "the wallet's display name",
                },
              },
            },
          },
        },
      },
      WalletAddressProperties: {
        content: {
          'application/json': {
            schema: {
              properties: {
                address: {
                  type: 'string',
                  description: "The wallet's address (or xpub) of the wallet",
                },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerTokenAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
      },
    },
    schemas: {
      MediaEntityResponse: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Cached accessible URL',
          },
          contentType: {
            type: 'string',
            enum: [
              'IMAGE',
              'VIDEO',
              'ANIMATION',
              'THREE_D',
              'TEXT',
              'GIF',
              'UNKNOWN_TYPE',
              'SVG',
              'AUDIO',
            ],
            description: 'Media type',
          },
        },
        required: ['url', 'contentType'],
      },
      TokenCollectionResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          symbol: {
            type: 'string',
          },
        },
        required: ['id', 'name', 'symbol'],
      },
      TokenResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The Fireblocks NFT asset id',
          },
          tokenId: {
            type: 'string',
            description: 'Token id within the contract/collection',
          },
          standard: {
            type: 'string',
            description: 'ERC721 / ERC1155',
          },
          metadataURI: {
            type: 'string',
            description: 'URL of the original token JSON metadata',
          },
          cachedMetadataURI: {
            type: 'string',
            description: 'URL of the cached token JSON metadata',
          },
          media: {
            description: 'Media items extracted from metadata JSON',
            type: 'array',
            items: {
              $ref: '#/components/schemas/MediaEntityResponse',
            },
          },
          collection: {
            description: 'Parent collection information',
            allOf: [
              {
                $ref: '#/components/schemas/TokenCollectionResponse',
              },
            ],
          },
          blockchainDescriptor: {
            type: 'string',
            enum: ['ETH', 'ETH_TEST3', 'POLYGON', 'POLYGON_TEST_MUMBAI'],
          },
          description: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
        required: [
          'id',
          'tokenId',
          'standard',
          'media',
          'blockchainDescriptor',
          'description',
          'name',
        ],
      },
      UpdateTokenOwnershipStatusDto: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['LISTED', 'ARCHIVED'],
          },
        },
        required: ['status'],
      },
      Paging: {
        type: 'object',
        properties: {
          next: {
            type: 'string',
            description: 'Cursor to the next page',
          },
        },
        required: ['next'],
      },
      TokenOwnershipResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The Fireblocks NFT asset id',
          },
          tokenId: {
            type: 'string',
            description: 'Token id within the contract/collection',
          },
          standard: {
            type: 'string',
            description: 'ERC721 / ERC1155',
          },
          metadataURI: {
            type: 'string',
            description: 'URL of the original token JSON metadata',
          },
          cachedMetadataURI: {
            type: 'string',
            description: 'URL of the cached token JSON metadata',
          },
          media: {
            description: 'Media items extracted from metadata JSON',
            type: 'array',
            items: {
              $ref: '#/components/schemas/MediaEntityResponse',
            },
          },
          collection: {
            description: 'Parent collection information',
            allOf: [
              {
                $ref: '#/components/schemas/TokenCollectionResponse',
              },
            ],
          },
          balance: {
            type: 'string',
          },
          vaultAccountId: {
            type: 'string',
          },
          ownershipStartTime: {
            type: 'number',
          },
          ownershipLastUpdateTime: {
            type: 'number',
          },
          blockchainDescriptor: {
            enum: ['ETH', 'ETH_TEST3', 'POLYGON', 'POLYGON_TEST_MUMBAI'],
            type: 'string',
          },
          description: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
        required: [
          'id',
          'tokenId',
          'standard',
          'media',
          'balance',
          'vaultAccountId',
          'ownershipStartTime',
          'ownershipLastUpdateTime',
          'blockchainDescriptor',
          'description',
          'name',
        ],
      },
      WalletAsset: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          balance: {
            type: 'string',
          },
          lockedAmount: {
            type: 'string',
          },
          status: {
            $ref: '#/components/schemas/ConfigChangeRequestStatus',
          },
          address: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
          activationTime: {
            type: 'string',
          },
        },
      },
      ExternalWalletAsset: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          status: {
            $ref: '#/components/schemas/ConfigChangeRequestStatus',
          },
          address: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
          activationTime: {
            type: 'string',
          },
        },
      },
      ExchangeAsset: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          balance: {
            type: 'string',
          },
          lockedAmount: {
            type: 'string',
          },
          total: {
            type: 'string',
          },
          available: {
            type: 'string',
          },
        },
      },
      ExchangeTradingAccount: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          assets: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ExchangeAsset',
            },
          },
        },
      },
      FiatAsset: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          balance: {
            type: 'string',
          },
        },
      },
      CreateVaultAssetResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          legacyAddress: {
            type: 'string',
          },
          enterpriseAddress: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
          eosAccountName: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          activationTxId: {
            type: 'string',
          },
        },
      },
      RewardsInfo: {
        type: 'object',
        properties: {
          pendingRewards: {
            description: 'Amount that is pending for rewards',
            type: 'string',
          },
        },
      },
      VaultAsset: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          total: {
            description:
              'The total wallet balance. In EOS this value includes the network balance, self staking and pending refund. For all other coins it is the balance as it appears on the blockchain.',
            type: 'string',
          },
          balance: {
            deprecated: true,
            description: 'Deprecated - replaced by "total"',
            type: 'string',
          },
          available: {
            description:
              'Funds available for transfer. Equals the blockchain balance minus any locked amounts',
            type: 'string',
          },
          pending: {
            description: 'The cumulative balance of all transactions pending to be cleared',
            type: 'string',
          },
          frozen: {
            description: 'The cumulative frozen balance',
            type: 'string',
          },
          lockedAmount: {
            description: 'Funds in outgoing transactions that are not yet published to the network',
            type: 'string',
          },
          staked: {
            description: 'Staked balance',
            type: 'string',
          },
          maxBip44AddressIndexUsed: {
            description: 'The maximum BIP44 index used in deriving addresses for this wallet',
            type: 'number',
          },
          maxBip44ChangeAddressIndexUsed: {
            description:
              'The maximum BIP44 index used in deriving change addresses for this wallet',
            type: 'number',
          },
          totalStakedCPU: {
            type: 'number',
            description: 'Deprecated',
          },
          totalStakedNetwork: {
            type: 'string',
            description: 'Deprecated',
          },
          selfStakedCPU: {
            type: 'string',
            description: 'Deprecated',
          },
          selfStakedNetwork: {
            type: 'string',
            description: 'Deprecated',
          },
          pendingRefundCPU: {
            type: 'string',
            description: 'Deprecated',
          },
          pendingRefundNetwork: {
            type: 'string',
            description: 'Deprecated',
          },
          blockHeight: {
            type: 'string',
          },
          blockHash: {
            type: 'string',
          },
          rewardsInfo: {
            $ref: '#/components/schemas/RewardsInfo',
          },
        },
      },
      VaultWalletAddress: {
        type: 'object',
        properties: {
          assetId: {
            type: 'string',
            'x-fb-entity': 'asset',
          },
          address: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
          customerRefId: {
            type: 'string',
          },
          addressFormat: {
            type: 'string',
            enum: ['SEGWIT', 'LEGACY'],
          },
          legacyAddress: {
            type: 'string',
          },
          enterpriseAddress: {
            type: 'string',
          },
          bip44AddressIndex: {
            type: 'integer',
          },
          userDefined: {
            type: 'boolean',
          },
        },
      },
      CreateAddressResponse: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
          },
          legacyAddress: {
            type: 'string',
          },
          enterpriseAddress: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
          bip44AddressIndex: {
            type: 'integer',
          },
        },
      },
      VaultAccountsPagedResponse: {
        type: 'object',
        properties: {
          accounts: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/VaultAccount',
            },
          },
          paging: {
            type: 'object',
            properties: {
              before: {
                type: 'string',
              },
              after: {
                type: 'string',
              },
            },
          },
          previousUrl: {
            type: 'string',
          },
          nextUrl: {
            type: 'string',
          },
        },
      },
      PaginatedAssetWalletResponse: {
        type: 'object',
        properties: {
          assetWallets: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AssetWallet',
            },
          },
          paging: {
            type: 'object',
            properties: {
              before: {
                description:
                  'A string representing a cursor. Users can use this with a new request to this API endpoint as the “before” request parameter to fetch the previous page of results.',
                type: 'string',
              },
              after: {
                description:
                  'A string representing a cursor. Users can use this with a new request to this API endpoint as the “before” request parameter to fetch the next page of results.',
                type: 'string',
              },
            },
          },
        },
      },
      AssetWallet: {
        type: 'object',
        properties: {
          vaultId: {
            description:
              'ID of the vault account. You can [get the vault account by this ID](https://developers.fireblocks.com/reference/get_vault-accounts-vaultaccountid) to retrieve vault properties such as its name, auto fueling, hidden on UI or customer reference ID.',
            type: 'string',
          },
          assetId: {
            description:
              'ID of the asset. You can get more information about this asset by using the [supported assets API](https://developers.fireblocks.com/reference/get_supported-assets)',
            type: 'string',
          },
          available: {
            description: 'Available balance, available to use in a transaction.',
            type: 'string',
          },
          total: {
            description:
              'Total balance at the asset wallet, as seen at the blockchain explorers. This includes balance available, and any kind of unavailable balance such as locked, frozen, or others.',
            type: 'string',
          },
          pending: {
            description: 'Pending balance.',
            type: 'string',
          },
          staked: {
            description: 'Staked balance.',
            type: 'string',
          },
          frozen: {
            description: 'Funds frozen due to the anti-money laundering policy at this workspace.',
            type: 'string',
          },
          lockedAmount: {
            description: 'Locked balance.',
            type: 'string',
          },
          blockHeight: {
            description: 'The height (number) of the block of the balance. Can by empty.',
            type: 'string',
          },
          blockHash: {
            description: 'The hash of the block of the balance. Can by empty.',
            type: 'string',
          },
          creationTimestamp: {
            description: 'Unix timestamp of the time the asset wallet was created.',
            type: 'string',
          },
        },
      },
      VaultAccount: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          assets: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/VaultAsset',
            },
          },
          hiddenOnUI: {
            type: 'boolean',
          },
          customerRefId: {
            type: 'string',
          },
          autoFuel: {
            type: 'boolean',
          },
        },
      },
      UnmanagedWallet: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          customerRefId: {
            type: 'string',
          },
          assets: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/WalletAsset',
            },
          },
        },
        required: ['id', 'name', 'status'],
      },
      ExchangeAccount: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            $ref: '#/components/schemas/ExchangeType',
          },
          name: {
            type: 'string',
            description: 'Display name of the exchange account',
          },
          status: {
            type: 'string',
          },
          assets: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ExchangeAsset',
            },
          },
          tradingAccounts: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ExchangeTradingAccount',
            },
          },
          isSubaccount: {
            description: 'True if the account is a subaccount in an exchange',
            type: 'boolean',
          },
          mainAccountId: {
            description: 'if the account is a sub-account, the ID of the main account',
            type: 'string',
          },
        },
      },
      FiatAccount: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            $ref: '#/components/schemas/FiatAccountType',
          },
          name: {
            type: 'string',
            description: 'Display name of the fiat account',
          },
          address: {
            type: 'string',
          },
          assets: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/FiatAsset',
            },
          },
        },
      },
      OneTimeAddress: {
        type: 'object',
        properties: {
          address: {
            type: 'string',
          },
          tag: {
            type: 'string',
          },
        },
        required: ['address'],
      },
      TransferPeerPath: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'VAULT_ACCOUNT',
              'EXCHANGE_ACCOUNT',
              'INTERNAL_WALLET',
              'EXTERNAL_WALLET',
              'NETWORK_CONNECTION',
              'FIAT_ACCOUNT',
              'COMPOUND',
              'GAS_STATION',
              'ONE_TIME_ADDRESS',
              'UNKNOWN',
              'END_USER_WALLET',
            ],
          },
          id: {
            type: 'string',
          },
          walletId: {
            type: 'string',
          },
        },
        required: ['type'],
      },
      DestinationTransferPeerPath: {
        allOf: [
          {
            $ref: '#/components/schemas/TransferPeerPath',
          },
          {
            type: 'object',
          },
          {
            description: 'The destination of the transaction.',
            properties: {
              oneTimeAddress: {
                $ref: '#/components/schemas/OneTimeAddress',
              },
            },
          },
        ],
      },
      CreateTransactionResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the transaction.',
          },
          status: {
            type: 'string',
            description:
              'The primary status of the transaction. For details, see [Primary transaction statuses.] (https://developers.fireblocks.com/reference/primary-transaction-statuses)',
          },
          systemMessages: {
            $ref: '#/components/schemas/SystemMessageInfo',
          },
        },
      },
      SystemMessageInfo: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['WARN', 'BLOCK'],
          },
          message: {
            type: 'string',
            description:
              'A response from Fireblocks that communicates a message about the health of the process being performed. If this object is returned with data, you should expect potential delays or incomplete transaction statuses.',
            example: 'Slow transaction processing. Outgoing transactions might be stuck.',
          },
        },
      },
      CancelTransactionResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
        },
      },
      UnfreezeTransactionResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
        },
      },
      FreezeTransactionResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
        },
      },
      AmlScreeningResult: {
        type: 'object',
        description: 'The result of the AML screening.',
        properties: {
          provider: {
            type: 'string',
          },
          payload: {
            type: 'object',
          },
        },
      },
      FeeInfo: {
        type: 'object',
        description: "Details of the transaction's fee.",
        properties: {
          networkFee: {
            description: 'The fee paid to the network',
            type: 'string',
          },
          serviceFee: {
            description:
              'The total fee deducted by the exchange from the actual requested amount (serviceFee = amount - netAmount)',
            type: 'string',
          },
          gasPrice: {
            type: 'string',
          },
        },
      },
      BlockInfo: {
        type: 'object',
        description:
          'The block hash and height of the block that this transaction was mined in.\n     **Note**: If an outgoing transaction uses the destinations object with more than one value in the array, blockHash is set to null.',
        properties: {
          blockHeight: {
            type: 'string',
          },
          blockHash: {
            type: 'string',
          },
        },
      },
      AuthorizationInfo: {
        type: 'object',
        description:
          'The information about your [Transaction Authorization Policy (TAP).](https://developers.fireblocks.com/docs/capabilities#transaction-authorization-policy-tap)',
        properties: {
          allowOperatorAsAuthorizer: {
            type: 'boolean',
          },
          logic: {
            type: 'string',
            enum: ['AND', 'OR'],
          },
          groups: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AuthorizationGroups',
            },
          },
        },
      },
      AuthorizationGroups: {
        type: 'object',
        properties: {
          th: {
            type: 'number',
          },
          users: {
            type: 'object',
            additionalProperties: {
              type: 'string',
              enum: ['PENDING_AUTHORIZATION', 'APPROVED', 'REJECTED', 'NA'],
            },
          },
        },
      },
      AmountInfo: {
        type: 'object',
        description: 'The details of the requested amount to transfer.',
        properties: {
          amount: {
            description:
              'If the transfer is a withdrawal from an exchange, the actual amount that was requested to be transferred. Otherwise, the requested amount',
            type: 'string',
          },
          requestedAmount: {
            type: 'string',
          },
          netAmount: {
            description: 'The net amount of the transaction, after fee deduction',
            type: 'string',
          },
          amountUSD: {
            description: 'The USD value of the requested amount',
            type: 'string',
          },
        },
      },
      RewardInfo: {
        type: 'object',
        description:
          'This field is relevant only for Algorand transactions. Both `srcRewards` and `destRewards` will appear only for Vault to Vault transactions, otherwise you will receive only the Fireblocks’ side of the transaction.',
        properties: {
          srcRewards: {
            type: 'string',
          },
          destRewards: {
            type: 'string',
          },
        },
      },
      SourceTransferPeerPathResponse: {
        allOf: [
          {
            $ref: '#/components/schemas/TransferPeerPath',
          },
          {
            type: 'object',
            description: 'The transaction’s source.',
            properties: {
              name: {
                type: 'string',
              },
              subType: {
                type: 'string',
                description:
                  'The specific exchange, fiat account or unmanaged wallet (either INTERNAL / EXTERNAL)',
              },
            },
          },
        ],
      },
      DestinationTransferPeerPathResponse: {
        allOf: [
          {
            $ref: '#/components/schemas/TransferPeerPath',
          },
          {
            type: 'object',
            description:
              'The transaction’s destination.\n**Note:** In case the transaction is sent to multiple destinations, the `destinations` parameter is be used instead of this.',
            properties: {
              name: {
                type: 'string',
              },
              subType: {
                type: 'string',
                description:
                  'The specific exchange, fiat account or unmanaged wallet (either INTERNAL / EXTERNAL)',
              },
            },
          },
        ],
      },
      TransactionResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID of the transaction.',
          },
          externalTxId: {
            type: 'string',
            description:
              'Unique transaction ID provided by the user. Fireblocks highly recommends setting an `externalTxId` for every transaction created, to avoid submitting the same transaction twice.',
          },
          status: {
            type: 'string',
            description:
              'The primary status of the transaction. For details, see [Primary transaction statuses](https://developers.fireblocks.com/reference/primary-transaction-statuses).',
          },
          subStatus: {
            type: 'string',
            description:
              'See [Transaction substatuses](https://developers.fireblocks.com/reference/transaction-substatuses) for the list of transaction sub statuses.',
          },
          txHash: {
            type: 'string',
            description:
              'The hash of the transaction on the blockchain.\n * This parameter exists if at least one of the following conditions is met:\n\n     1. The transaction’s source type is `UNKNOWN`, `WHITELISTED_ADDRESS`, `NETWORK_CONNECTION`, `ONE_TIME_ADDRESS`, `FIAT_ACCOUNT` or `GAS_STATION`.\n\n     2. The transaction’s source type is `VAULT` and the status is either: `CONFIRMING`, `COMPLETED`, or was in any of these statuses prior to changing to `FAILED` or `REJECTED`. In some instances, transactions in status `BROADCASTING` will include the txHash as well.\n\n     3. The transaction’s source type is `EXCHANGE_ACCOUNT` and the transaction’s destination type is `VAULT`, and the status is either: `CONFIRMING`, `COMPLETED`, or was in any of these status prior to changing to `FAILED`.\n  \n\n* In addition, the following conditions must be met:\n\n    1. The asset is a crypto asset (not fiat).\n\n    2. The transaction operation is not RAW or `TYPED_MESSAGE`.',
          },
          operation: {
            $ref: '#/components/schemas/GetTransactionOperation',
          },
          note: {
            type: 'string',
            description:
              'Custom note, not sent to the blockchain, that describes the transaction at your Fireblocks workspace.',
          },
          assetId: {
            type: 'string',
            description:
              'The ID of the asset to transfer, for `TRANSFER`, `MINT`, `BURN`, `ENABLE_ASSET`,`STAKE` ,`UNSTAKE` or `WITHDRAW` operations. [See the list of supported assets and their IDs on Fireblocks.](https://developers.fireblocks.com/reference/get_supported-assets)',
            'x-fb-entity': 'asset',
          },
          source: {
            $ref: '#/components/schemas/SourceTransferPeerPathResponse',
          },
          sourceAddress: {
            type: 'string',
            description:
              'For account based assets only, the source address of the transaction.\n**Note:** If the status is `CONFIRMING`, `COMPLETED`, or has been `CONFIRMING`; then moved forward to `FAILED` or `REJECTED`, then this parameter will contain the source address. In any other case, this parameter will be empty.',
          },
          tag: {
            type: 'string',
            description:
              'Source address tag for XRP, used as memo for EOS/XLM, or Bank Transfer Description for the fiat provider BLINC (by BCB Group).',
          },
          destination: {
            $ref: '#/components/schemas/DestinationTransferPeerPathResponse',
          },
          destinations: {
            type: 'array',
            description:
              'The transaction’s destinations.\n**Note:** In case the transaction is sent to a single destination, the `destination` parameter is used instead of this.',
            items: {
              $ref: '#/components/schemas/TransactionResponseDestination',
            },
          },
          destinationAddress: {
            type: 'string',
            description:
              'Address where the asset were transferred.\nNotes:\n  - For [Multi destination transactions](https://support.fireblocks.io/hc/en-us/articles/360018447980-Multi-destination-transactions), this parameter will be empty. In this case, you should refer to the destinations field.\n  - If the status is `CONFIRMING`, `COMPLETED`, or has been `CONFIRMING`; then moved forward to `FAILED` or `REJECTED`, then this parameter will contain the destination address. In any other case, this parameter will be empty.',
          },
          destinationAddressDescription: {
            type: 'string',
            description: 'Description of the address.',
          },
          destinationTag: {
            type: 'string',
            description:
              'Destination address tag for XRP, used as memo for EOS/XLM, or Bank Transfer Description for the fiat provider BLINC (by BCB Group).',
          },
          contractCallDecodedData: {
            description:
              "Decoded data for `CONTRACT_CALL` operations. The Fireblocks [development libraries](https://developers.fireblocks.com/docs/ethereum-development#convenience-libraries) are recommended for setting this parameter's value.",
            type: 'object',
            properties: {
              contractName: {
                type: 'string',
              },
              functionCalls: {
                type: 'array',
                items: {
                  type: 'object',
                },
              },
            },
          },
          amountInfo: {
            $ref: '#/components/schemas/AmountInfo',
          },
          treatAsGrossAmount: {
            type: 'boolean',
            description:
              'For transactions initiated via this Fireblocks workspace, when set to `true`, the fee is deducted from the requested amount.',
          },
          feeInfo: {
            $ref: '#/components/schemas/FeeInfo',
          },
          feeCurrency: {
            type: 'string',
            description:
              'The asset which was withdrawn to pay the transaction fee, for example ETH for EVM-based blockchains, BTC for Tether Omni.',
          },
          networkRecords: {
            type: 'array',
            description:
              'In case a single transaction resulted with multiple transfers, for example a result of a contract call, then this parameter specifies each transfer that took place on the blockchain. In case of a single transfer transaction, this parameter is empty.',
            items: {
              $ref: '#/components/schemas/NetworkRecord',
            },
          },
          createdAt: {
            type: 'number',
            description: 'The transaction’s creation date and time, in unix timestamp.',
          },
          lastUpdated: {
            type: 'number',
            description: 'The transaction’s last update date and time, in unix timestamp.',
          },
          createdBy: {
            type: 'string',
            description: 'User ID of the initiator of the transaction.',
          },
          signedBy: {
            type: 'array',
            description: 'User ID’s of the signers of the transaction.',
            items: {
              type: 'string',
            },
          },
          rejectedBy: {
            type: 'string',
            description:
              'User ID of the user that rejected the transaction (in case it was rejected).',
          },
          authorizationInfo: {
            $ref: '#/components/schemas/AuthorizationInfo',
          },
          exchangeTxId: {
            type: 'string',
            description:
              'If the transaction originated from an exchange, this is the ID of this transaction at the exchange.',
          },
          customerRefId: {
            type: 'string',
            description:
              'The ID for AML providers to associate the owner of funds with transactions.',
          },
          amlScreeningResult: {
            $ref: '#/components/schemas/AmlScreeningResult',
          },
          extraParameters: {
            $ref: '#/components/schemas/ExtraParameters',
          },
          signedMessages: {
            $ref: '#/components/schemas/SignedMessage',
          },
          numOfConfirmations: {
            type: 'number',
            description:
              'The number of confirmations of the transaction. The number will increase until the transaction will be considered completed according to the confirmation policy.',
          },
          blockInfo: {
            $ref: '#/components/schemas/BlockInfo',
          },
          index: {
            type: 'number',
            description:
              'For UTXO based assets this is the vOut, for Ethereum based, this is the index of the event of the contract call.\n **Note:** This field is not returned if a transaction uses the `destinations` object with more than one value.',
          },
          rewardInfo: {
            $ref: '#/components/schemas/RewardInfo',
          },
          systemMessages: {
            $ref: '#/components/schemas/SystemMessageInfo',
          },
          addressType: {
            type: 'string',
            enum: ['WHITELISTED', 'ONE_TIME'],
          },
          requestedAmount: {
            description:
              'The amount requested by the user. Deprecated - please use the `amountInfo` field for accuracy.',
            type: 'number',
            deprecated: true,
          },
          amount: {
            description:
              'If the transfer is a withdrawal from an exchange, the actual amount that was requested to be transferred. Otherwise, the requested amount. Deprecated - please use the `amountInfo` field for accuracy.',
            type: 'number',
            deprecated: true,
          },
          netAmount: {
            description:
              'The net amount of the transaction, after fee deduction. Deprecated - please use the `amountInfo` field for accuracy.',
            type: 'number',
            deprecated: true,
          },
          amountUSD: {
            description:
              'The USD value of the requested amount. Deprecated - please use the `amountInfo` field for accuracy.',
            type: 'number',
            nullable: true,
            deprecated: true,
          },
          serviceFee: {
            description:
              'The total fee deducted by the exchange from the actual requested amount (`serviceFee` = `amount` - `netAmount`). Deprecated - please use the `feeInfo` field for accuracy.',
            type: 'number',
            deprecated: true,
          },
          fee: {
            description: 'Deprecated - please use the `feeInfo` field for accuracy.',
            type: 'number',
            deprecated: true,
          },
          networkFee: {
            description:
              'The fee paid to the network. Deprecated - please use the `feeInfo` field for accuracy.',
            type: 'number',
            deprecated: true,
          },
        },
      },
      TransactionResponseDestination: {
        type: 'object',
        properties: {
          amount: {
            type: 'string',
          },
          amountUSD: {
            type: 'string',
          },
          amlScreeningResult: {
            $ref: '#/components/schemas/AmlScreeningResult',
          },
          destination: {
            $ref: '#/components/schemas/DestinationTransferPeerPathResponse',
          },
          authorizationInfo: {
            $ref: '#/components/schemas/AuthorizationInfo',
          },
        },
      },
      NetworkRecord: {
        type: 'object',
        properties: {
          source: {
            $ref: '#/components/schemas/SourceTransferPeerPathResponse',
          },
          destination: {
            $ref: '#/components/schemas/DestinationTransferPeerPathResponse',
          },
          txHash: {
            type: 'string',
          },
          networkFee: {
            type: 'string',
          },
          assetId: {
            type: 'string',
            'x-fb-entity': 'asset',
          },
          netAmount: {
            description: 'The net amount of the transaction, after fee deduction',
            type: 'string',
          },
          isDropped: {
            type: 'boolean',
          },
          type: {
            type: 'string',
          },
          destinationAddress: {
            type: 'string',
          },
          sourceAddress: {
            type: 'string',
          },
          amountUSD: {
            type: 'string',
          },
          index: {
            type: 'number',
          },
          rewardInfo: {
            $ref: '#/components/schemas/RewardInfo',
          },
        },
      },
      AssetTypeResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          type: {
            type: 'string',
            enum: [
              'ALGO_ASSET',
              'BASE_ASSET',
              'BEP20',
              'COMPOUND',
              'ERC20',
              'FIAT',
              'SOL_ASSET',
              'TRON_TRC20',
              'XLM_ASSET',
              'XDB_ASSET',
            ],
          },
          contractAddress: {
            type: 'string',
          },
          nativeAsset: {
            type: 'string',
          },
          decimals: {
            type: 'number',
          },
        },
        required: ['id', 'name', 'type'],
      },
      NetworkConnection: {
        type: 'object',
        properties: {
          localNetworkId: {
            type: 'string',
            description: 'The network ID of the profile trying to create the connection.',
          },
          remoteNetworkId: {
            type: 'string',
            description: 'The network ID the profile is attempting to connect to.',
          },
          routingPolicy: {
            $ref: '#/components/schemas/NetworkConnectionRoutingPolicy',
          },
        },
        required: ['localNetworkId', 'remoteNetworkId'],
      },
      NetworkConnectionResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          localChannel: {
            allOf: [
              {
                $ref: '#/components/schemas/NetworkChannel',
              },
            ],
            deprecated: true,
            description: 'Deprecated - Replaced by `localNetworkId`',
          },
          remoteChannel: {
            allOf: [
              {
                $ref: '#/components/schemas/NetworkChannel',
              },
            ],
            deprecated: true,
            description: 'Deprecated - Replaced by `remoteNetworkId`',
          },
          status: {
            $ref: '#/components/schemas/ConfigChangeRequestStatus',
          },
          localNetworkId: {
            $ref: '#/components/schemas/NetworkId',
          },
          remoteNetworkId: {
            $ref: '#/components/schemas/NetworkId',
          },
          routingPolicy: {
            $ref: '#/components/schemas/NetworkConnectionRoutingPolicy',
          },
        },
        required: ['id', 'localNetworkId', 'remoteNetworkId', 'routingPolicy', 'status'],
      },
      EstimatedTransactionFeeResponse: {
        type: 'object',
        properties: {
          low: {
            $ref: '#/components/schemas/TransactionFee',
          },
          medium: {
            $ref: '#/components/schemas/TransactionFee',
          },
          high: {
            $ref: '#/components/schemas/TransactionFee',
          },
        },
        required: ['low', 'medium', 'high'],
      },
      EstimatedNetworkFeeResponse: {
        type: 'object',
        properties: {
          low: {
            $ref: '#/components/schemas/NetworkFee',
          },
          medium: {
            $ref: '#/components/schemas/NetworkFee',
          },
          high: {
            $ref: '#/components/schemas/NetworkFee',
          },
        },
        required: ['low', 'medium', 'high'],
      },
      GasStationPropertiesResponse: {
        type: 'object',
        properties: {
          balance: {
            type: 'object',
          },
          configuration: {
            $ref: '#/components/schemas/GasStationConfiguration',
          },
        },
        required: ['low', 'medium', 'high'],
      },
      TransactionFee: {
        type: 'object',
        properties: {
          feePerByte: {
            type: 'string',
          },
          gasPrice: {
            type: 'string',
          },
          gasLimit: {
            type: 'string',
          },
          networkFee: {
            type: 'string',
          },
          baseFee: {
            description: '(optional) Base Fee according to EIP-1559 (ETH assets)',
            type: 'string',
          },
          priorityFee: {
            description: '(optional) Priority Fee according to EIP-1559 (ETH assets)',
            type: 'string',
          },
        },
      },
      NetworkFee: {
        type: 'object',
        properties: {
          feePerByte: {
            type: 'string',
          },
          gasPrice: {
            type: 'string',
          },
          networkFee: {
            type: 'string',
          },
          baseFee: {
            description: '(optional) Base Fee according to EIP-1559 (ETH assets)',
            type: 'string',
          },
          priorityFee: {
            description: '(optional) Priority Fee according to EIP-1559 (ETH assets)',
            type: 'string',
          },
        },
      },
      GasStationConfiguration: {
        type: 'object',
        properties: {
          gasThreshold: {
            type: 'string',
          },
          gasCap: {
            type: 'string',
          },
          maxGasPrice: {
            type: 'string',
          },
        },
      },
      NetworkChannel: {
        deprecated: true,
        description: 'Deprecated in the only used reference - NetworkConnectionResponse',
        type: 'object',
        properties: {
          networkId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
      },
      NetworkId: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
        },
        required: ['id', 'name'],
      },
      NetworkIdResponse: {
        allOf: [
          {
            $ref: '#/components/schemas/NetworkId',
          },
          {
            type: 'object',
            properties: {
              routingPolicy: {
                $ref: '#/components/schemas/NetworkIdRoutingPolicy',
              },
              isDiscoverable: {
                type: 'boolean',
                description: 'The specific network is discoverable.',
              },
            },
          },
        ],
      },
      TransactionRequest: {
        type: 'object',
        properties: {
          operation: {
            $ref: '#/components/schemas/TransactionOperation',
          },
          note: {
            type: 'string',
            description:
              'Custom note, not sent to the blockchain, to describe the transaction at your Fireblocks workspace.',
            example: 'Ticket 123',
          },
          externalTxId: {
            type: 'string',
            description:
              'An optional but highly recommended parameter. Fireblocks will reject future transactions with same ID. \n \nYou should set this to a unique ID representing the transaction, to avoid submitting the same transaction twice. This helps with cases where submitting the transaction responds with an error code due to Internet interruptions, but the transaction was actually sent and processed. To validate whether a transaction has been processed, [Find a specific transaction by external transaction ID](https://developers.fireblocks.com/reference/get_transactions-external-tx-id-externaltxid).\n \nThere is no specific format required for this parameter.',
            example: '00000000-0000-0000-0000-000000000000',
          },
          assetId: {
            type: 'string',
            description:
              'The ID of the asset to transfer, for `TRANSFER`, `MINT` or `BURN` operations. [See the list of supported assets and their IDs on Fireblocks.](https://developers.fireblocks.com/reference/get_supported-assets)',
            'x-fb-entity': 'asset',
            example: 'ETH',
          },
          source: {
            $ref: '#/components/schemas/TransferPeerPath',
          },
          destination: {
            $ref: '#/components/schemas/DestinationTransferPeerPath',
          },
          destinations: {
            type: 'array',
            description:
              'For UTXO based blockchains, you can send a single transaction to multiple destinations.',
            items: {
              $ref: '#/components/schemas/TransactionRequestDestination',
            },
          },
          amount: {
            description:
              'For `TRANSFER` operations, the requested amount to transfer, in the asset’s unit. Fireblocks recommends using a numeric string for accurate precision. Although a number input exists, it is deprecated.',
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
                example: '0.02',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
                example: 0.02,
              },
            ],
          },
          treatAsGrossAmount: {
            type: 'boolean',
            description: 'When set to `true`, the fee will be deducted from the requested amount.',
            example: false,
          },
          forceSweep: {
            type: 'boolean',
            description:
              'For Polkadot, Kusama and Westend transactions only. When set to true, Fireblocks will empty the asset wallet.\n\n   **Note:** If set to true when the source account is exactly 1 DOT, the transaction will fail. Any amount more or less than 1 DOT succeeds. This is a Polkadot blockchain limitation.',
            example: false,
          },
          feeLevel: {
            type: 'string',
            description:
              'For UTXO or EVM-based blockchains only. Defines the blockchain fee level which will be payed for the transaction. Alternatively, specific fee estimation parameters exist below.',
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            example: 'MEDIUM',
          },
          fee: {
            description:
              'For UTXO-based blockchains, the fee per bytes in the asset’s smallest unit (Satoshi, Latoshi, etc.).  For Ripple, the fee for the transaction. Fireblocks recommends using a numeric string for accurate precision. Although a number input exists, it is deprecated.',
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
              },
            ],
          },
          priorityFee: {
            description:
              'For Ethereum-based blockchains only, the fee for EIP-1559 transaction pricing mechanism. Value is in Gwei.  Fireblocks recommends using a numeric string for accurate precision. Although a number input exists, it is deprecated.',
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
                example: '2',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
                example: 2,
              },
            ],
          },
          failOnLowFee: {
            type: 'boolean',
            description:
              'When set to `true`, in case the current `MEDIUM` fee level is higher than the one specified in the transaction, the transaction will fail to avoid getting stuck with no confirmations.',
          },
          maxFee: {
            description:
              'The maximum fee (gas price or fee per byte) that should be payed for the transaction.  In case the current value of the requested `feeLevel` is higher than this requested maximum fee.  Represented by a numeric string for accurate precision.',
            type: 'string',
            example: '120',
          },
          gasLimit: {
            description:
              'For EVM-based blockchains only. Units of gas required to process the transaction. Note: Only two of the three arguments can be specified in a single transaction: `gasLimit`, `gasPrice` and `networkFee`. Fireblocks recommends using a numeric string for accurate precision. Although a number input exists, it is deprecated.',
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
                example: '21000',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
                example: 21000,
              },
            ],
          },
          gasPrice: {
            description:
              'For non-EIP-1559, EVM-based transactions. Price per gas unit (in Ethereum this is specified in Gwei).  Note: Only two of the three arguments can be specified in a single transaction: `gasLimit`, `gasPrice` and `networkFee`. Fireblocks recommends using a numeric string for accurate precision.  Although a number input exists, it is deprecated.',
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
              },
            ],
          },
          networkFee: {
            description:
              "For EVM-based blockchains only. The total transaction fee in the blockchain’s largest unit. Note: Only two of the three arguments can be specified in a single transaction: `gasLimit`, `gasPrice` and `networkFee`. Fireblocks recommends using a numeric string for accurate precision. Although a number input exists, it is deprecated. - The transaction blockchain fee.\n- For Ethereum, you can't pass gasPrice, gasLimit and networkFee all together.\n- A numeric value representation is required.",
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
              },
            ],
          },
          replaceTxByHash: {
            type: 'string',
            description:
              'For EVM-based blockchains only. In case a transaction is stuck, specify the hash of the stuck transaction to replace it by this transaction with a higher fee, or to replace it with this transaction with a zero fee and drop it from the blockchain.',
            example: '00000000-0000-0000-0000-000000000000',
          },
          extraParameters: {
            $ref: '#/components/schemas/ExtraParameters',
          },
          customerRefId: {
            type: 'string',
            description:
              'The ID for AML providers to associate the owner of funds with transactions.',
            example: 'abcdef',
          },
          autoStaking: {
            type: 'boolean',
            description: 'This feature is no longer supported.',
            deprecated: true,
          },
          networkStaking: {
            deprecated: true,
            description: 'This feature is no longer supported.',
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
              },
            ],
          },
          cpuStaking: {
            deprecated: true,
            description: 'This feature is no longer supported.',
            oneOf: [
              {
                type: 'string',
                description: 'Numeric string (recommended)',
              },
              {
                type: 'number',
                description: 'Number (deprecated)',
              },
            ],
          },
        },
      },
      TransactionRequestDestination: {
        type: 'object',
        properties: {
          amount: {
            type: 'string',
          },
          destination: {
            $ref: '#/components/schemas/DestinationTransferPeerPath',
          },
        },
      },
      ExchangeType: {
        type: 'string',
        enum: [
          'BINANCE',
          'BINANCEUS',
          'BITFINEX',
          'BITHUMB',
          'BITMEX',
          'BITSO',
          'BITSTAMP',
          'BITTREX',
          'CIRCLE',
          'COINBASEPRO',
          'COINMETRO',
          'COINSPRO',
          'CRYPTOCOM',
          'DERIBIT',
          'FTX',
          'FIXUS',
          'GEMINI',
          'HITBTC',
          'HUOBI',
          'KORBIT',
          'KRAKEN',
          'LIQUID',
          'POLONIEX',
          'OKCOIN',
          'OKEX',
          'SEEDCX',
        ],
      },
      FiatAccountType: {
        type: 'string',
        enum: ['BLINC'],
      },
      ConfigChangeRequestStatus: {
        type: 'string',
        enum: ['WAITING_FOR_APPROVAL', 'APPROVED', 'CANCELLED', 'REJECTED', 'FAILED'],
      },
      TransactionOperation: {
        type: 'string',
        default: 'TRANSFER',
        enum: ['TRANSFER', 'BURN', 'CONTRACT_CALL', 'MINT', 'RAW', 'TYPED_MESSAGE'],
        description:
          '* `TRANSFER` - The default value for an operation. Transfers funds from one account to another. UTXO blockchains allow multi-input and multi-output transfers. All other blockchains allow transfers with one source address and one destination address.\n* `MINT` - Mints new tokens. Supported for Stellar, Ripple and EVM-based blockchains.\n* `BURN` - Burns tokens. Supported for Stellar, Ripple and EVM-based blockchains.\n* `CONTRACT_CALL` - Calls a smart contract method for web3 operations on any EVM blockchain. The Fireblocks [development libraries](https://developers.fireblocks.com/docs/ethereum-development#convenience-libraries) are recommended for building contract call transactions.\n* `TYPED_MESSAGE` - An off-chain message in either Ethereum Personal Message or EIP712 format. Use it to sign specific readable messages that are not actual transactions. [Learn more about typed messages](https://developers.fireblocks.com/docs/typed-message-signing).\n* `RAW` - An off-chain message with no predefined format. Use it to sign any message with your private key, including protocols such as blockchains and custom transaction types that are not natively supported by Fireblocks. [Learn more about raw signing transactions.](https://developers.fireblocks.com/docs/raw-message-signing)\n',
      },
      GetTransactionOperation: {
        type: 'string',
        enum: [
          'TRANSFER',
          'BURN',
          'CONTRACT_CALL',
          'MINT',
          'RAW',
          'TYPED_MESSAGE',
          'ENABLE_ASSET',
          'STAKE',
          'UNSTAKE',
          'WITHDRAW',
          'REDEEM_FROM_COMPOUND',
          'SUPPLY_TO_COMPOUND',
        ],
        description:
          '* `TRANSFER` - Transfers funds from one account to another. UTXO blockchains allow multi-input and multi-output transfers. All other blockchains allow transfers with one source address and one destination address.\n* `MINT` - Mints new tokens. Supported for Stellar, Ripple and EVM-based blockchains.\n* `BURN` - Burns tokens. Supported for Stellar, Ripple and EVM-based blockchains.\n* `CONTRACT_CALL` - Calls a smart contract method for web3 operations on any EVM blockchain. The Fireblocks [development libraries](https://developers.fireblocks.com/docs/ethereum-development#convenience-libraries) are recommended for building contract call transactions.\n* `TYPED_MESSAGE` - An off-chain message in either Ethereum Personal Message or EIP712 format. Use it to sign specific readable messages that are not actual transactions. [Learn more about typed messages](https://developers.fireblocks.com/docs/typed-message-signing).\n* `RAW` - An off-chain message with no predefined format. Use it to sign any message with your private key, including protocols such as blockchains and custom transaction types that are not natively supported by Fireblocks. [Learn more about raw signing transactions.](https://developers.fireblocks.com/docs/raw-message-signing)\n* `ENABLE_ASSET` - Algorand, DigitalBits, Solana, and Stellar require an on-chain transaction to create an asset wallet and enable the deposit address. This transaction is automatically created when adding assets on these blockchains at a vault account.\n* `STAKE` - Assign assets to a staking pool managed by a staking validator. Supported for Stellar and EVM-based blockchains. This transaction is automatically created when performing staking operations.\n* `UNSTAKE` - Remove assets from a staking pool managed by a staking validator. Supported for Stellar and EVM-based blockchains. This transaction is automatically created when performing staking operations.\n* `WITHDRAW` - Transfer assets from a dedicated staking vault account to another address. Supported for Stellar and EVM-based blockchains. This transaction is automatically created when performing staking operations.\n\n    **Note:** Fireblocks will rename this type from `WITHDRAW` to a different type name soon. There will be a 7-day notice regarding the new type name.\n\n* `SUPPLY_TO_COMPOUND` - Deprecated since April 1st, 2023. Older transactions may have this as their operation, in case users in the workspace have used the direct integration between Fireblocks and the Compound DeFI protocol.\n* `REDEEM_FROM_COMPOUND` - Deprecated since April 1st, 2023. Older transactions may have this as their operation, in case users in the workspace have used the direct integration between Fireblocks and the Compound DeFI protocol.\n',
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          code: {
            type: 'number',
          },
        },
      },
      Term: {
        type: 'object',
        properties: {
          networkConnectionId: {
            type: 'string',
          },
          outgoing: {
            type: 'boolean',
          },
          asset: {
            type: 'string',
          },
          amount: {
            type: 'string',
          },
          note: {
            type: 'string',
          },
          operation: {
            type: 'string',
          },
        },
      },
      SetConfirmationsThresholdRequest: {
        type: 'object',
        properties: {
          numOfConfirmations: {
            type: 'number',
          },
        },
      },
      SetConfirmationsThresholdResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          transactions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      DropTransactionRequest: {
        type: 'object',
        properties: {
          txId: {
            type: 'string',
          },
          feeLevel: {
            type: 'string',
          },
          gasPrice: {
            type: 'string',
          },
        },
      },
      DropTransactionResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          transactions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      UnsignedMessage: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
          },
          bip44addressIndex: {
            type: 'integer',
          },
          bip44change: {
            type: 'number',
          },
          derivationPath: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
        },
        required: ['content'],
      },
      SignedMessage: {
        type: 'object',
        description: 'A list of signed messages returned for raw signing.',
        properties: {
          content: {
            type: 'string',
          },
          algorithm: {
            type: 'string',
            enum: ['MPC_ECDSA_SECP256K1', 'MPC_EDDSA_ED25519'],
          },
          derivationPath: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
          signature: {
            type: 'object',
            properties: {
              fullSig: {
                type: 'string',
              },
              r: {
                type: 'string',
              },
              s: {
                type: 'string',
              },
              v: {
                type: 'number',
              },
            },
          },
          publicKey: {
            type: 'string',
          },
        },
      },
      PublicKeyInformation: {
        type: 'object',
        properties: {
          algorithm: {
            type: 'string',
          },
          derivationPath: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
          publicKey: {
            type: 'string',
          },
        },
      },
      TradingAccountType: {
        type: 'string',
        enum: [
          'COIN_FUTURES',
          'COIN_MARGINED_SWAP',
          'EXCHANGE',
          'FUNDING',
          'FUNDABLE',
          'FUTURES',
          'FUTURES_CROSS',
          'MARGIN',
          'MARGIN_CROSS',
          'OPTIONS',
          'SPOT',
          'USDT_MARGINED_SWAP_CROSS',
          'USDT_FUTURES',
          'UNIFIED',
        ],
      },
      ValidateAddressResponse: {
        type: 'object',
        properties: {
          isValid: {
            type: 'boolean',
          },
          isActive: {
            type: 'boolean',
          },
          requiresTag: {
            type: 'boolean',
          },
        },
      },
      ResendWebhooksResponse: {
        type: 'object',
        properties: {
          messagesCount: {
            type: 'number',
          },
        },
      },
      UnspentInputsResponse: {
        type: 'object',
        properties: {
          input: {
            $ref: '#/components/schemas/UnspentInput',
          },
          address: {
            type: 'string',
          },
          amount: {
            type: 'string',
          },
          confirmations: {
            type: 'number',
          },
          status: {
            type: 'string',
          },
        },
      },
      UnspentInput: {
        type: 'object',
        properties: {
          txHash: {
            type: 'string',
          },
          index: {
            type: 'number',
          },
        },
      },
      GetUsersResponse: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/UserResponse',
            },
          },
        },
      },
      ExtraParameters: {
        type: 'object',
        properties: {},
        description:
          'Additional protocol / operation specific key-value parameters:\n\nFor UTXO-based blockchain input selection, add the key `inputsSelection` with the value set the [input selection structure.](https://developers.fireblocks.com/reference/transaction-objects#inputsselection) The inputs can be retrieved from the [Retrieve Unspent Inputs endpoint.](https://developers.fireblocks.com/reference/get_vault-accounts-vaultaccountid-assetid-unspent-inputs)\n\nFor `RAW` operations, add the key `rawMessageData` with the value set to the [raw message data structure.](https://developers.fireblocks.com/reference/raw-signing-objects#rawmessagedata)\n\nFor `CONTRACT_CALL` operations, add the key `contractCallData` with the value set to the Ethereum smart contract Application Binary Interface (ABI) payload. The Fireblocks [development libraries](https://developers.fireblocks.com/docs/ethereum-development#convenience-libraries) are recommended for building contract call transactions.\n',
      },
      NetworkIdRoutingPolicy: {
        type: 'object',
        properties: {
          crypto: {
            oneOf: [
              {
                $ref: '#/components/schemas/CustomCryptoRoutingDest',
              },
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
            ],
          },
          sen: {
            oneOf: [
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
            ],
          },
          signet: {
            oneOf: [
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
            ],
          },
          sen_test: {
            oneOf: [
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
            ],
          },
          signet_test: {
            oneOf: [
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
            ],
          },
        },
      },
      NetworkConnectionRoutingPolicy: {
        type: 'object',
        properties: {
          crypto: {
            oneOf: [
              {
                $ref: '#/components/schemas/CustomCryptoRoutingDest',
              },
              {
                $ref: '#/components/schemas/DefaultNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
            ],
          },
          sen: {
            oneOf: [
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
              {
                $ref: '#/components/schemas/DefaultNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
            ],
          },
          signet: {
            oneOf: [
              {
                $ref: '#/components/schemas/DefaultNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
            ],
          },
          sen_test: {
            oneOf: [
              {
                $ref: '#/components/schemas/DefaultNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
            ],
          },
          signet_test: {
            oneOf: [
              {
                $ref: '#/components/schemas/NoneNetworkRoutingDest',
              },
              {
                $ref: '#/components/schemas/CustomFiatRoutingDest',
              },
              {
                $ref: '#/components/schemas/DefaultNetworkRoutingDest',
              },
            ],
          },
        },
      },
      CustomFiatRoutingDest: {
        type: 'object',
        properties: {
          scheme: {
            description: 'The network routing logic.',
            type: 'string',
            enum: ['CUSTOM'],
          },
          dstType: {
            type: 'string',
            description: 'The fiat account the funds are being sent to.',
            enum: ['FIAT_ACCOUNT'],
          },
          dstId: {
            type: 'string',
            description: 'The ID of the fiat account the funds are being sent to.',
          },
        },
        required: ['scheme', 'dstType', 'dstId'],
      },
      CustomCryptoRoutingDest: {
        type: 'object',
        properties: {
          scheme: {
            type: 'string',
            description: 'The network routing logic.',
            enum: ['CUSTOM'],
          },
          dstType: {
            type: 'string',
            description: 'The type of destination account the funds are being sent to.',
            enum: ['VAULT', 'EXCHANGE'],
          },
          dstId: {
            type: 'string',
            description: 'The ID of the destination account the funds are being sent to.',
          },
        },
        required: ['scheme', 'dstType', 'dstId'],
      },
      DefaultNetworkRoutingDest: {
        type: 'object',
        properties: {
          scheme: {
            type: 'string',
            description: 'The network routing logic.',
            enum: ['DEFAULT'],
          },
        },
        required: ['scheme'],
      },
      NoneNetworkRoutingDest: {
        type: 'object',
        properties: {
          scheme: {
            type: 'string',
            description: 'No network routing logic.',
            enum: ['NONE'],
          },
        },
        required: ['scheme'],
      },
      UserResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          enabled: {
            type: 'boolean',
          },
        },
      },
      SessionMetadata: {
        type: 'object',
        properties: {
          appUrl: {
            type: 'string',
          },
          appName: {
            type: 'string',
          },
          appDescription: {
            type: 'string',
          },
          appIcon: {
            type: 'string',
          },
        },
        required: ['appUrl'],
      },
      SessionDTO: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id of the connection',
            example: '4e9e7051-f3b2-48e9-8ee6-b12492552657',
          },
          userId: {
            type: 'string',
            description: 'Id of the user that created the connection',
          },
          sessionMetadata: {
            description: 'Metadata of the connection (provided by the dapp)',
            allOf: [
              {
                $ref: '#/components/schemas/SessionMetadata',
              },
            ],
          },
          vaultAccountId: {
            type: 'number',
            description: 'The vault to connect',
            example: 1,
          },
          feeLevel: {
            type: 'string',
            description: 'The default fee level',
            example: 'MEDIUM',
            enum: ['MEDIUM', 'HIGH'],
          },
          chainIds: {
            description: 'The chains approved for the connection',
            example: ['ETH', 'ETH_TEST', 'SOL'],
            type: 'array',
            items: {
              type: 'string',
            },
          },
          connectionType: {
            type: 'string',
            description: "The connection's type",
            example: 'WalletConnect',
            enum: ['WalletConnect'],
          },
          connectionMethod: {
            type: 'string',
            description: 'The method through which the connection was established',
            example: 'API',
            enum: ['DESKTOP', 'MOBILE', 'API'],
          },
          creationDate: {
            format: 'date-time',
            type: 'string',
            description: "Timestamp of the session's creation",
          },
        },
        required: [
          'id',
          'userId',
          'sessionMetadata',
          'vaultAccountId',
          'feeLevel',
          'chainIds',
          'connectionType',
          'connectionMethod',
          'creationDate',
        ],
      },
      GetConnectionsResponse: {
        type: 'object',
        properties: {
          data: {
            description: "Array with the requested Web3 connection's data",
            type: 'array',
            items: {
              $ref: '#/components/schemas/SessionDTO',
            },
          },
          paging: {
            $ref: '#/components/schemas/Paging',
          },
        },
        required: ['data'],
      },
      CreateConnectionRequest: {
        type: 'object',
        properties: {
          vaultAccountId: {
            type: 'number',
            description: 'The ID of the vault to connect to the Web3 connection.',
            example: 1,
          },
          feeLevel: {
            type: 'string',
            description: 'The default fee level. Valid values are `MEDIUM` and `HIGH`.',
            example: 'MEDIUM',
            enum: ['MEDIUM', 'HIGH'],
          },
          uri: {
            type: 'string',
            description: 'The WalletConnect uri provided by the dapp.',
            example:
              'wc:77752975-906f-48f5-b59f-047826ee947e@1?bridge=https%3A%2F%2F0.bridge.walletconnect.org&key=64be99adc6086b7a729b0ec8c7e1f174927ab92e84f5c6f9527050225344a637',
          },
          chainIds: {
            description: 'The ID of the blockchain network used in the Web3 connection.',
            example: ['ETH', 'ETH_TEST'],
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        required: ['vaultAccountId', 'feeLevel', 'uri', 'chainIds'],
      },
      CreateConnectionResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the Web3 connection initiated.',
            example: '4e9e7051-f3b2-48e9-8ee6-b12492552657',
          },
          sessionMetadata: {
            description: 'Metadata of the Web3 connection (provided by the DApp).',
            allOf: [
              {
                $ref: '#/components/schemas/SessionMetadata',
              },
            ],
          },
        },
        required: ['id', 'sessionMetadata'],
      },
      RespondToConnectionRequest: {
        type: 'object',
        properties: {
          approve: {
            type: 'boolean',
            description: 'Approval of the initiated Web3 connection.',
            example: true,
          },
        },
        required: ['approve'],
      },
      AddCollateralRequestBody: {
        type: 'object',
        properties: {
          transactionRequest: {
            $ref: '#/components/schemas/TransactionRequest',
          },
          isSrcCollateral: {
            type: 'boolean',
            description: 'optional',
          },
        },
      },
      RemoveCollateralRequestBody: {
        type: 'object',
        properties: {
          transactionRequest: {
            $ref: '#/components/schemas/TransactionRequest',
          },
          isDstCollateral: {
            type: 'boolean',
            description: 'optional',
          },
        },
      },
      SettlementRequestBody: {
        type: 'object',
        properties: {
          mainExchangeAccountId: {
            type: 'string',
          },
        },
      },
      SettlementResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          initiator: {
            type: 'string',
          },
          exchangeReply: {
            type: 'string',
          },
          fireblocksInitiatedTransactions: {
            type: 'object',
          },
          exchangeRequestedTransactions: {
            $ref: '#/components/schemas/SettlementResponse',
          },
        },
      },
      GetSettlementResponse: {
        $ref: '#/components/schemas/SettlementResponse',
      },
      ToExchangeTransaction: {
        type: 'object',
        properties: {
          assetId: {
            type: 'string',
          },
          amount: {
            type: 'string',
          },
          dstAddress: {
            type: 'string',
          },
          dstTag: {
            type: 'string',
            description: 'optional',
          },
        },
      },
      ToCollateralTransaction: {
        type: 'object',
        properties: {
          asset: {
            type: 'string',
          },
          amount: {
            type: 'string',
          },
          srcAddress: {
            type: 'string',
          },
          srcTag: {
            type: 'string',
            description: 'optional',
          },
          fee: {
            type: 'string',
            description: 'optional',
          },
        },
      },
      XBSettlementConfigCreationRequestBody: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name for the cross-border settlement configuration',
          },
          corridorId: {
            $ref: '#/components/schemas/XBSettlementCorridorId',
          },
          steps: {
            $ref: '#/components/schemas/XBSettlementConfigStepsRecord',
          },
          conversionSlippageBasisPoints: {
            $ref: '#/components/schemas/XBSettlementConversionSlippageBasisPoints',
          },
        },
        required: ['name', 'corridorId', 'steps'],
      },
      XBSettlementConfigCreationResponse: {
        $ref: '#/components/schemas/XBSettlementConfigModel',
      },
      XBSettlementConfigEditRequestBody: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name for the cross-border settlement configuration',
          },
          steps: {
            $ref: '#/components/schemas/XBSettlementConfigStepsRecord',
          },
          conversionSlippageBasisPoints: {
            $ref: '#/components/schemas/XBSettlementConversionSlippageBasisPoints',
          },
        },
        required: ['name', 'steps'],
      },
      XBSettlementConfigEditResponse: {
        $ref: '#/components/schemas/XBSettlementConfigModel',
      },
      XBSettlementConfigDeletionResponse: {
        $ref: '#/components/schemas/XBSettlementConfigModel',
      },
      XBSettlementGetConfigResponse: {
        $ref: '#/components/schemas/XBSettlementConfigModel',
      },
      XBSettlementGetAllConfigsResponse: {
        type: 'object',
        properties: {
          configurations: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/XBSettlementConfigModel',
            },
          },
        },
        required: ['configurations'],
      },
      XBSettlementFlowExecutionRequestBody: {
        type: 'object',
        properties: {
          conversionSlippageBasisPoints: {
            $ref: '#/components/schemas/XBSettlementConversionSlippageBasisPoints',
          },
        },
      },
      XBSettlementFlowExecutionResponse: {
        $ref: '#/components/schemas/XBSettlementFlowExecutionModel',
      },
      XBSettlementFlowExecutionStep: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'A unique id for the step execution',
          },
          accountId: {
            type: 'string',
          },
          status: {
            $ref: '#/components/schemas/XBSettlementFlowExecutionStepStatus',
          },
          inputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          outputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          fee: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          startedAt: {
            type: 'number',
            description: 'The step execution start time in epoch format.',
          },
          completedAt: {
            type: 'number',
            description: 'The step execution end time in epoch format.',
          },
          isSignRequired: {
            type: 'boolean',
            description: 'Whether or not signing is required for executing the step.',
          },
        },
        required: ['id', 'accountId', 'status', 'inputAmount', 'isSignRequired'],
      },
      XBSettlementFlowExecutionStepStatus: {
        type: 'string',
        enum: ['NOT_STARTED', 'PROCESSING', 'COMPLETED', 'FAILED'],
      },
      XBSettlementFlowExecutionStatus: {
        type: 'string',
        enum: ['NOT_LAUNCHED', 'PROCESSING', 'COMPLETED', 'FAILED'],
      },
      XBSettlementConfigId: {
        type: 'string',
        format: 'uuid',
        description: 'Cross Bodrder configuraion unique id',
      },
      XBSettlementConfigModel: {
        type: 'object',
        properties: {
          configId: {
            $ref: '#/components/schemas/XBSettlementConfigId',
          },
          corridorId: {
            $ref: '#/components/schemas/XBSettlementCorridorId',
          },
          name: {
            type: 'string',
            description: 'The name for the cross-border ettlement configuration',
          },
          steps: {
            $ref: '#/components/schemas/XBSettlementConfigStepsRecord',
          },
          conversionSlippageBasisPoints: {
            $ref: '#/components/schemas/XBSettlementConversionSlippageBasisPoints',
          },
          createdAt: {
            type: 'number',
            description: 'The creation time in epoch format.',
          },
        },
        required: [
          'configId',
          'name',
          'corridorId',
          'steps',
          'conversionSlippageBasisPoints',
          'createdAt',
        ],
      },
      XBSettlementCorridorId: {
        type: 'string',
        enum: ['MX_US', 'CO_US', 'US_MX', 'US_EU', 'US_UK'],
        description:
          '- MX_US : Mexico (MXN) to USA (USD)\n- CO_US : Colombia (COP) to USA (USD)\n- US_MX : USA (USD) to Mexico (MXN)\n- US_EU : USA (USD) to Europe Union (EUR)\n- US_UK : USA (USD) to United Kingdon (GBP)\n',
      },
      XBSettlementConfigStep: {
        type: 'object',
        properties: {
          stepType: {
            $ref: '#/components/schemas/XBSettlementStepType',
          },
          accountId: {
            type: 'string',
          },
        },
        required: ['stepType', 'accountId'],
      },
      XBSettlementStepType: {
        type: 'string',
        enum: ['ON_RAMP', 'VAULT_ACCOUNT', 'OFF_RAMP', 'FIAT_DESTINATION'],
        description:
          '- ON_RAMP : A service that allows for the exchange of fiat currencies for cryptocurrencies. An OnRamp input value will always be fiat and output value crypto asset.\n- VAULT_ACCOUNT : Fireblocks Vault account\n- OFF_RAMP : A service that allows for the exchange of cryptocurrencies for fiat. An OffRamp input value will always be a crypto asset and output value be fiat.\n- FIAT_DESTINATION : Fiat account\n',
      },
      XBSettlementFlowSetupStep: {
        type: 'object',
        properties: {
          accountId: {
            type: 'string',
          },
          inputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          outputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          estimatedFeeAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          estimatedTime: {
            type: 'number',
            description: 'The estimated time for executing the step.',
          },
          isSignRequired: {
            type: 'boolean',
            description: 'Whether or not signing is required for executing the step.',
          },
        },
        required: [
          'accountId',
          'inputAmount',
          'outputAmount',
          'estimatedFeeAmount',
          'estimatedTime',
          'isSignRequired',
        ],
      },
      XBSettlementGetFlowResponse: {
        type: 'object',
        properties: {
          preview: {
            $ref: '#/components/schemas/XBSettlementFlowPreviewModel',
          },
          execution: {
            $ref: '#/components/schemas/XBSettlementFlowExecutionModel',
          },
        },
      },
      XBSettlementFlowPreviewModel: {
        type: 'object',
        properties: {
          flowId: {
            type: 'string',
            description: 'The unique id for the cross-border flow.',
          },
          configId: {
            $ref: '#/components/schemas/XBSettlementConfigId',
          },
          conversionRate: {
            type: 'string',
            description: 'The conversion rate received from the on-ramp or off-ramp.',
          },
          inputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          estimatedOutputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          totalEstimatedFee: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          totalEstimatedTime: {
            type: 'number',
            description: 'The total *estimated* time for executing the cross-border flow.',
          },
          steps: {
            $ref: '#/components/schemas/XBSettlementFlowStepsRecord',
          },
        },
        required: [
          'flowId',
          'configId',
          'steps',
          'inputAmount',
          'estimatedOutputAmount',
          'totalEstimatedFee',
          'totalEstimatedTime',
          'conversionRate',
        ],
      },
      XBSettlementCreateFlowRequestBody: {
        type: 'object',
        properties: {
          configId: {
            $ref: '#/components/schemas/XBSettlementConfigId',
          },
          amount: {
            type: 'string',
            description:
              'The amount to transfer in this cross-border flow. The type of asset is defined by the cross-border settlement configuration.',
          },
        },
        required: ['configId', 'amount'],
      },
      XBSettlementCreateFlowResponse: {
        $ref: '#/components/schemas/XBSettlementFlowPreviewModel',
      },
      XBSettlementFlowExecutionModel: {
        type: 'object',
        properties: {
          flowId: {
            type: 'string',
            description: 'The unique id for the cross-border flow.',
          },
          configId: {
            $ref: '#/components/schemas/XBSettlementConfigId',
          },
          inputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          outputAmount: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          totalFee: {
            $ref: '#/components/schemas/XBSettlementAsset',
          },
          initiatedAt: {
            type: 'number',
            description: 'The time the cross-border flow executed in epoch format.',
          },
          initiatedBy: {
            description: 'The id of the user which launched the flow',
            type: 'string',
          },
          state: {
            $ref: '#/components/schemas/XBSettlementFlowExecutionStatus',
          },
          steps: {
            $ref: '#/components/schemas/XBSettlementFlowStepsExecutionRecord',
          },
          selectedConversionSlippage: {
            type: 'object',
            description:
              'Indicates the selected slippage used during the flow since override logic may have taken place.',
            properties: {
              basisPoints: {
                type: 'number',
              },
              reason: {
                $ref: '#/components/schemas/XBSettlementFlowSelectedConversionSlippageReason',
              },
            },
            required: ['basisPoints', 'reason'],
          },
        },
        required: [
          'flowId',
          'configId',
          'steps',
          'inputAmount',
          'outputAmount',
          'totalFee',
          'initiatedAt',
          'initiatedBy',
          'state',
          'selectedConversionSlippage',
        ],
      },
      XBSettlementFlowSelectedConversionSlippageReason: {
        type: 'string',
        enum: ['DEFAULT', 'CONFIG', 'FLOW'],
      },
      XBSettlementFlowStepsExecutionRecord: {
        type: 'object',
        properties: {
          stepType: {
            $ref: '#/components/schemas/XBSettlementStepType',
          },
        },
        additionalProperties: {
          $ref: '#/components/schemas/XBSettlementFlowExecutionStep',
        },
      },
      XBSettlementConfigStepsRecord: {
        type: 'object',
        properties: {
          stepType: {
            $ref: '#/components/schemas/XBSettlementStepType',
          },
        },
        additionalProperties: {
          type: 'object',
          properties: {
            accountId: {
              type: 'string',
            },
            inputAssetId: {
              $ref: '#/components/schemas/XBSettlementAssetID',
            },
            outputAssetId: {
              $ref: '#/components/schemas/XBSettlementAssetID',
            },
          },
          required: ['accountId'],
        },
      },
      XBSettlementConversionSlippageBasisPoints: {
        type: 'integer',
        minimum: 0,
        maximum: 10000,
        default: 10000,
        description: 'Slippage configuarion in basis points, the default value is 10%\n',
      },
      XBSettlementFlowStepsRecord: {
        type: 'object',
        properties: {
          stepType: {
            $ref: '#/components/schemas/XBSettlementStepType',
          },
        },
        additionalProperties: {
          $ref: '#/components/schemas/XBSettlementFlowSetupStep',
        },
      },
      XBSettlementAsset: {
        type: 'object',
        properties: {
          amount: {
            type: 'string',
          },
          assetId: {
            $ref: '#/components/schemas/XBSettlementAssetID',
          },
        },
        required: ['amount'],
      },
      XBSettlementAssetID: {
        oneOf: [
          {
            $ref: '#/components/schemas/XBSettlementFiatAsset',
          },
          {
            $ref: '#/components/schemas/XBSettlementCryptoAsset',
          },
        ],
      },
      XBSettlementFiatAsset: {
        type: 'string',
        enum: ['USD', 'MXN', 'COP', 'EUR', 'GBP'],
      },
      XBSettlementCryptoAsset: {
        type: 'string',
        enum: ['XLM_USDC_5F3T', 'XLM'],
        description: '- XLM_USDC_5F3T : USDC over Stellar network\n',
      },
      CreatePayoutRequest: {
        type: 'object',
        properties: {
          paymentAccount: {
            $ref: '#/components/schemas/PaymentAccount',
          },
          instructionSet: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PayoutInstruction',
            },
          },
        },
        required: ['paymentAccount', 'instructionSet'],
      },
      PaymentAccount: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            $ref: '#/components/schemas/PaymentAccountType',
          },
        },
        required: ['id', 'type'],
      },
      PayoutInstruction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          payeeAccount: {
            $ref: '#/components/schemas/PayeeAccount',
          },
          amount: {
            $ref: '#/components/schemas/InstructionAmount',
          },
        },
        required: ['amount', 'payeeAccount'],
      },
      PaymentAccountType: {
        type: 'string',
        enum: ['VAULT_ACCOUNT', 'EXCHANGE_ACCOUNT', 'FIAT_ACCOUNT'],
      },
      PayeeAccount: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            $ref: '#/components/schemas/PayeeAccountType',
          },
        },
        required: ['id', 'type'],
      },
      InstructionAmount: {
        type: 'object',
        properties: {
          amount: {
            type: 'string',
          },
          assetId: {
            type: 'string',
          },
        },
        required: ['amount', 'assetId'],
      },
      PayeeAccountType: {
        type: 'string',
        enum: [
          'VAULT_ACCOUNT',
          'EXCHANGE_ACCOUNT',
          'INTERNAL_WALLET',
          'EXTERNAL_WALLET',
          'NETWORK_CONNECTION',
          'FIAT_ACCOUNT',
        ],
        description:
          '- VAULT_ACCOUNT  \ta native Fireblocks vault account\n- EXCHANGE_ACCOUNT \ta third-party exchange account\n- INTERNAL_WALLET \ta whitelisted address marked as internal to the workspace/organization\n- EXTERNAL_WALLET\ta whitelisted address marked as external\n- NETWORK_CONNECTION\ta member of the Fireblocks network\n- FIAT_ACCOUNT\ta third-party account of a fiat bank (Signature, BCB, etc)\n',
      },
      PayoutResponse: {
        type: 'object',
        properties: {
          payoutId: {
            type: 'string',
          },
          paymentAccount: {
            $ref: '#/components/schemas/PaymentAccountResponse',
          },
          createdAt: {
            type: 'number',
          },
          state: {
            $ref: '#/components/schemas/PayoutState',
          },
          status: {
            $ref: '#/components/schemas/PayoutStatus',
          },
          reasonOfFailure: {
            type: 'string',
            description:
              '<ul> \n<li> INSUFFICIENT_BALANCE</li>\n<li> SOURCE_TRANSLATION</li>\n<li> SOURCE_NOT_UNIQUE</li>\n<li> SOURCE_NOT_FOUND</li>\n<li> SOURCE_TYPE_NOT_SUPPORTED</li>\n<li> EMPTY_SOURCE</li>\n<li> DESTINATION_TRANSLATION</li>\n<li> DESTINATION_NOT_UNIQUE</li>\n<li> DESTINATION_NOT_FOUND</li>\n<li> EMPTY_DESTINATION</li>\n<li> PARSING </li>\n<li> UNKNOWN</li>\n<li> FIREBLOCKS_CLIENT</li>\n<li> TRANSACTION_SUBMISSION</li>\n</ul>\n',
          },
          initMethod: {
            $ref: '#/components/schemas/PayoutInitMethod',
          },
          instructionSet: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PayoutInstructionResponse',
            },
          },
          reportUrl: {
            type: 'string',
          },
        },
        required: ['payoutId', 'createdAt', 'state', 'status', 'paymentAccount', 'instructionSet'],
      },
      PaymentAccountResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            $ref: '#/components/schemas/PaymentAccountType',
          },
        },
      },
      PayoutState: {
        type: 'string',
        enum: [
          'CREATED',
          'FILE_FOUND',
          'REQUESTED',
          'TRANSLATED',
          'PROCESSING',
          'SUBMITTED',
          'FINALIZED',
          'INSUFFICIENT_BALANCE',
          'FAILED',
        ],
        description:
          '- CREATED - payout instruction set created with all its details\n- FILE_FOUND - new file found in the FTP\n- REQUESTED - payout requested with all its details\n- TRANSLATED - payout instruction account IDs identified and translated\n- PROCESSING - payout instruction set executed and is processing\n- SUBMITTED - transactions submitted for payout instructions\n- FINALIZED - payout finished processing, all transactions processed successfully\n- INSUFFICIENT_BALANCE - insufficient balance in the payment account (can be a temporary state)\n- FAILED - one or more of the payout instructions failed\n',
      },
      PayoutStatus: {
        type: 'string',
        enum: ['REGISTERED', 'VERIFYING', 'IN_PROGRESS', 'DONE', 'INSUFFICIENT_BALANCE', 'FAILED'],
        description:
          '- REQUESTED\tpayout requested with all its details\n- VERIFIED\tpayout instruction set details were verified\n- PROCESSING\tpayout instruction set executed and is processing\n- FINALIZED\tpayout done (all payout instructions completed successfully)\n- INSUFFICIENT_BALANCE\tinsufficient balance in the payment account (can be a temporary state)\n- FAILED\tone or more of the payout instructions failed\n',
      },
      PayoutInitMethod: {
        type: 'string',
        enum: ['FILE', 'API'],
      },
      PayoutInstructionResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          payeeAccount: {
            $ref: '#/components/schemas/PayeeAccountResponse',
          },
          amount: {
            $ref: '#/components/schemas/InstructionAmount',
          },
          state: {
            $ref: '#/components/schemas/PayoutInstructionState',
          },
          transactions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Transaction',
            },
          },
        },
        required: ['amount', 'payeeAccount', 'state', 'transactions'],
      },
      PayeeAccountResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            $ref: '#/components/schemas/PayeeAccountType',
          },
        },
      },
      PayoutInstructionState: {
        type: 'string',
        enum: [
          'NOT_STARTED',
          'TRANSACTION_SENT',
          'COMPLETED',
          'FAILED',
          'TRANSLATION_ERROR',
          'SKIPPED',
        ],
        description:
          '- NOT_STARTED\t- waiting to start\n- TRANSACTION_SENT - an underlying transaction was sent\n- COMPLETED\t- completed successfully\n- FAILED - failed\n- TRANSLATION_ERROR -lookup of the destination failed (due to changes in the underlying whitelisted external wallet or similar)\n- SKIPPED- no transaction(s) created for this instruction\n',
      },
      Transaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          state: {
            type: 'string',
            enum: [
              'SUBMITTED',
              'QUEUED',
              'PENDING_AUTHORIZATION',
              'PENDING_SIGNATURE',
              'BROADCASTING',
              'PENDING_3RD_PARTY_MANUAL_APPROVAL',
              'PENDING_3RD_PARTY',
              'PENDING',
              'CONFIRMING',
              'CONFIRMED',
              'COMPLETED',
              'PARTIALLY_COMPLETED',
              'PENDING_AML_SCREENING',
              'CANCELLING',
              'CANCELLED',
              'REJECTED',
              'BLOCKED',
              'FAILED',
              'TIMEOUT',
            ],
          },
          timestamp: {
            type: 'number',
            format: 'date-time',
          },
          instructionId: {
            type: 'string',
          },
        },
        required: ['id', 'state'],
      },
      DispatchPayoutResponse: {
        type: 'object',
        properties: {
          payoutId: {
            type: 'string',
          },
        },
        required: ['payoutId'],
      },
      TravelRuleAddress: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
            example: '1234 Example St',
            description: 'Street address',
          },
          city: {
            type: 'string',
            example: 'New York',
            description: 'City',
          },
          state: {
            type: 'string',
            example: 'NY',
            description: 'State or province',
          },
          postalCode: {
            type: 'string',
            example: '10001',
            description: 'Postal or ZIP code',
          },
        },
        required: ['street', 'city', 'state', 'postalCode'],
      },
      TravelRuleValidateTransactionRequest: {
        type: 'object',
        properties: {
          transactionAsset: {
            type: 'string',
            example: 'BTC',
            description: 'Transaction asset symbol BTC,ETH)',
          },
          destination: {
            type: 'string',
            example: 'bc1qxy2kgdygjrsqtzq2n0yrf1234p83kkfjhx0wlh',
            description: 'Transaction destination address',
          },
          transactionAmount: {
            type: 'string',
            example: '10',
            description: 'Transaction amount in the transaction asset',
          },
          originatorVASPdid: {
            type: 'string',
            example: 'did:ethr:0x44957e75d6ce4a5bf37aae117da86422c848f7c2',
            description: 'This is the identifier assigned to your VASP',
          },
          originatorEqualsBeneficiary: {
            type: 'boolean',
            example: false,
            description:
              '"True" if the originator and beneficiary is the same person and you therefore do not need to collect any information. "False" if it is a third-party transfer.',
          },
          travelRuleBehavior: {
            type: 'boolean',
            example: true,
            description:
              "This will also check if the transaction is a TRAVEL_RULE in the beneficiary VASP's jurisdiction",
          },
          beneficiaryVASPdid: {
            type: 'string',
            example: 'did:ethr:0x46a7ed5813ce735387df2bfb245bd7722e0de992',
            description: 'This is the identifier assigned to the VASP the funds are being sent to',
          },
          beneficiaryVASPname: {
            type: 'string',
            example: 'HelloCrypto',
            description: 'Beneficiary VASP name',
          },
          beneficiaryName: {
            type: 'string',
            example: 'John Doe',
            description: 'Beneficiary  name',
          },
          beneficiaryAccountNumber: {
            type: 'string',
            example: '1234-1234-1234-12234',
            description: 'Beneficiary  name',
          },
          beneficiaryAddress: {
            example: '{"addressLine: [Wayne Manor, Gotham City, New York, USA]"}',
            description: 'Beneficiary  name',
            allOf: [
              {
                $ref: '#/components/schemas/TravelRuleAddress',
              },
            ],
          },
        },
        required: [
          'transactionAsset',
          'destination',
          'transactionAmount',
          'originatorVASPdid',
          'originatorEqualsBeneficiary',
          'travelRuleBehavior',
          'beneficiaryVASPdid',
          'beneficiaryVASPname',
          'beneficiaryName',
          'beneficiaryAccountNumber',
          'beneficiaryAddress',
        ],
      },
      TravelRuleValidateTransactionResponse: {
        type: 'object',
        properties: {
          isValid: {
            type: 'boolean',
            description:
              '"isValid" will tell you if you have collected all the information needed for the travel rule data transfer. Once this field = "true", you can move on to the next step which is to transfer the front-end information to your back-end and perform Travel Rule Transaction create',
            example: true,
          },
          type: {
            type: 'string',
            description:
              '"type" will tell you if the virtual asset value converted to FIAT value of the withdrawal request is above (=TRAVELRULE) or below (=BELOW_THRESHOLD) the threshold in your jurisdiction. If it is to an unhosted wallet which does not require travel rule information to be sent and only collected, it will say NON_CUSTODIAL.',
            example: 'TRAVELRULE',
          },
          beneficiaryAddressType: {
            type: 'string',
            description:
              '"beneficiaryAddressType" will tell you if your blockchain analytics provider or internal address book has been able to identify the wallet address.',
            example: 'UNKNOWN',
          },
          addressSource: {
            type: 'string',
            description:
              '"addressSource" will tell you if the address was found in your internal address book or identified by the blockchain analytics provider.',
            example: 'UNKNOWN',
          },
          beneficiaryVASPdid: {
            type: 'string',
            description: 'The VASP DID of the beneficiary VASP',
            example: 'did:ethr:0x46a7ed5813ce735387df2bfb245bd7722e0de992',
          },
          beneficiaryVASPname: {
            type: 'string',
            description:
              '"beneficiaryVASPname" will tell you the name of the VASP that has been identified as the owner of the wallet address. This name is used in a subsequent call to get its DID.',
            example: 'Fireblocks',
          },
          warnings: {
            description:
              '"errors/warnings" will tell you what information about the beneficiary you need to collect from the sender.',
            example: ['optional-beneficiaryAccountNumber'],
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        required: [
          'isValid',
          'type',
          'beneficiaryAddressType',
          'addressSource',
          'beneficiaryVASPdid',
          'beneficiaryVASPname',
          'warnings',
        ],
      },
      TravelRuleTransactionBlockchainInfo: {
        type: 'object',
        properties: {
          txHash: {
            type: 'string',
          },
          origin: {
            type: 'string',
          },
          destination: {
            type: 'string',
          },
        },
        required: ['txHash', 'origin', 'destination'],
      },
      TravelRulePiiIVMS: {
        type: 'object',
        properties: {
          fullName: {
            type: 'string',
          },
          dateOfBirth: {
            type: 'string',
          },
          placeOfBirth: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          identificationNumber: {
            type: 'string',
          },
          nationality: {
            type: 'string',
          },
          countryOfResidence: {
            type: 'string',
          },
          taxIdentificationNumber: {
            type: 'string',
          },
          customerNumber: {
            type: 'string',
          },
        },
        required: [
          'fullName',
          'dateOfBirth',
          'placeOfBirth',
          'address',
          'identificationNumber',
          'nationality',
          'countryOfResidence',
          'taxIdentificationNumber',
          'customerNumber',
        ],
      },
      TravelRuleOwnershipProof: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            example: 'passport',
            description: 'Type of ownership proof',
          },
          id: {
            type: 'string',
            example: '123456789',
            description: 'Identification number',
          },
          name: {
            type: 'string',
            example: 'Alice',
            description: 'Name of owner',
          },
          country: {
            type: 'string',
            example: 'US',
            description: 'Country of issuance',
          },
          issueDate: {
            type: 'string',
            example: '2022-01-01',
            description: 'Date of issuance',
          },
          issuer: {
            type: 'string',
            example: 'US Government',
            description: 'Name of issuing entity',
          },
        },
        required: ['type', 'id', 'name', 'country', 'issueDate', 'issuer'],
      },
      TravelRuleValidateFullTransactionRequest: {
        type: 'object',
        properties: {
          transactionAsset: {
            type: 'string',
            description: 'The asset involved in the transaction',
          },
          transactionAmount: {
            type: 'string',
            description: 'The amount of the transaction',
          },
          originatorDid: {
            type: 'string',
            description: 'The DID of the transaction originator',
          },
          beneficiaryDid: {
            type: 'string',
            description: 'The DID of the transaction beneficiary',
          },
          originatorVASPdid: {
            type: 'string',
            description: 'The VASP ID of the transaction originator',
          },
          beneficiaryVASPdid: {
            type: 'string',
            description: 'The VASP ID of the transaction beneficiary',
          },
          beneficiaryVASPname: {
            type: 'string',
            description: 'The name of the VASP acting as the beneficiary',
          },
          transactionBlockchainInfo: {
            description: 'Information about the blockchain transaction',
            allOf: [
              {
                $ref: '#/components/schemas/TravelRuleTransactionBlockchainInfo',
              },
            ],
          },
          originator: {
            description: 'Information about the originator of the transaction',
            allOf: [
              {
                $ref: '#/components/schemas/TravelRulePiiIVMS',
              },
            ],
          },
          beneficiary: {
            description: 'Information about the beneficiary of the transaction',
            allOf: [
              {
                $ref: '#/components/schemas/TravelRulePiiIVMS',
              },
            ],
          },
          encrypted: {
            type: 'string',
            description: 'Encrypted data related to the transaction',
          },
          protocol: {
            type: 'string',
            description: 'The protocol used to perform the travel rule',
          },
          notificationEmail: {
            type: 'string',
            description:
              'The email address where a notification should be sent upon completion of the travel rule',
          },
          skipBeneficiaryDataValidation: {
            type: 'boolean',
            description: 'Whether to skip validation of beneficiary data',
          },
          travelRuleBehavior: {
            type: 'boolean',
            description:
              "Whether to check if the transaction is a TRAVEL_RULE in the beneficiary VASP's jurisdiction",
          },
          originatorProof: {
            description: 'Ownership proof related to the originator of the transaction',
            allOf: [
              {
                $ref: '#/components/schemas/TravelRuleOwnershipProof',
              },
            ],
          },
          beneficiaryProof: {
            description: 'Ownership proof related to the beneficiary of the transaction',
            allOf: [
              {
                $ref: '#/components/schemas/TravelRuleOwnershipProof',
              },
            ],
          },
          pii: {
            description: 'Personal identifiable information related to the transaction',
            allOf: [
              {
                $ref: '#/components/schemas/TravelRulePiiIVMS',
              },
            ],
          },
        },
        required: [
          'transactionAsset',
          'transactionAmount',
          'originatorDid',
          'beneficiaryDid',
          'originatorVASPdid',
          'beneficiaryVASPdid',
          'beneficiaryVASPname',
          'transactionBlockchainInfo',
          'originator',
          'beneficiary',
          'encrypted',
          'protocol',
          'notificationEmail',
          'skipBeneficiaryDataValidation',
          'travelRuleBehavior',
          'originatorProof',
          'beneficiaryProof',
          'pii',
        ],
      },
      TravelRuleIssuer: {
        type: 'object',
        properties: {
          issuerDid: {
            type: 'string',
          },
        },
        required: ['issuerDid'],
      },
      TravelRuleIssuers: {
        type: 'object',
        properties: {
          yearFounded: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          isRegulated: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          regulatoryAuthorities: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          name: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          logo: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          website: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          legalName: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          legalStructure: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          incorporationCountry: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          businessNumber: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          addressLine1: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          city: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          country: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
          description: {
            $ref: '#/components/schemas/TravelRuleIssuer',
          },
        },
        required: [
          'yearFounded',
          'isRegulated',
          'regulatoryAuthorities',
          'name',
          'logo',
          'website',
          'legalName',
          'legalStructure',
          'incorporationCountry',
          'businessNumber',
          'addressLine1',
          'city',
          'country',
          'description',
        ],
      },
      TravelRuleVASP: {
        type: 'object',
        properties: {
          did: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          verificationStatus: {
            type: 'string',
          },
          addressLine1: {
            type: 'string',
          },
          addressLine2: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          country: {
            type: 'string',
          },
          emailDomains: {
            type: 'string',
          },
          website: {
            type: 'string',
          },
          logo: {
            type: 'string',
          },
          legalStructure: {
            type: 'string',
          },
          legalName: {
            type: 'string',
          },
          yearFounded: {
            type: 'string',
          },
          incorporationCountry: {
            type: 'string',
          },
          isRegulated: {
            type: 'string',
          },
          otherNames: {
            type: 'string',
          },
          identificationType: {
            type: 'string',
          },
          identificationCountry: {
            type: 'string',
          },
          businessNumber: {
            type: 'string',
          },
          regulatoryAuthorities: {
            type: 'string',
          },
          jurisdictions: {
            type: 'string',
          },
          street: {
            type: 'string',
          },
          number: {
            type: 'string',
          },
          unit: {
            type: 'string',
          },
          postCode: {
            type: 'string',
          },
          state: {
            type: 'string',
          },
          certificates: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          travelRule_OPENVASP: {
            type: 'string',
          },
          travelRule_SYGNA: {
            type: 'string',
          },
          travelRule_TRISA: {
            type: 'string',
          },
          travelRule_TRLIGHT: {
            type: 'string',
          },
          travelRule_EMAIL: {
            type: 'string',
          },
          travelRule_TRP: {
            type: 'string',
          },
          travelRule_SHYFT: {
            type: 'string',
          },
          travelRule_USTRAVELRULEWG: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
          },
          createdBy: {
            type: 'string',
          },
          updatedAt: {
            type: 'string',
          },
          updatedBy: {
            type: 'string',
          },
          lastSentDate: {
            type: 'string',
          },
          lastReceivedDate: {
            type: 'string',
          },
          documents: {
            type: 'string',
          },
          hasAdmin: {
            type: 'boolean',
          },
          isNotifiable: {
            type: 'boolean',
          },
          issuers: {
            $ref: '#/components/schemas/TravelRuleIssuers',
          },
        },
        required: [
          'did',
          'name',
          'verificationStatus',
          'addressLine1',
          'addressLine2',
          'city',
          'country',
          'emailDomains',
          'website',
          'logo',
          'legalStructure',
          'legalName',
          'yearFounded',
          'incorporationCountry',
          'isRegulated',
          'otherNames',
          'identificationType',
          'identificationCountry',
          'businessNumber',
          'regulatoryAuthorities',
          'jurisdictions',
          'street',
          'number',
          'unit',
          'postCode',
          'state',
          'certificates',
          'description',
          'travelRule_OPENVASP',
          'travelRule_SYGNA',
          'travelRule_TRISA',
          'travelRule_TRLIGHT',
          'travelRule_EMAIL',
          'travelRule_TRP',
          'travelRule_SHYFT',
          'travelRule_USTRAVELRULEWG',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy',
          'lastSentDate',
          'lastReceivedDate',
          'documents',
          'hasAdmin',
          'isNotifiable',
          'issuers',
        ],
      },
      TravelRuleGetAllVASPsResponse: {
        type: 'object',
        properties: {
          vasps: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/TravelRuleVASP',
            },
          },
        },
        required: ['vasps'],
      },
      TravelRuleUpdateVASPDetails: {
        type: 'object',
        properties: {
          did: {
            type: 'string',
            example: 'did:ethr:0x44957e75d6ce4a5bf37aae117da86422c848f7c2',
            description: 'The decentralized identifier of the VASP',
          },
          pii_didkey: {
            type: 'string',
            example: 'did:key:z6Mks5CZRaiooKYhq5TwtXQC1gWhwiZnmiKfFrMnYY62MhYf',
            description: 'The PII DID key of the VASP',
          },
        },
        required: ['did', 'pii_didkey'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: [
                  'INTERNAL',
                  'AUTHENTICATION',
                  'AUTHORIZATION',
                  'VALIDATION',
                  'NOT_FOUND',
                  'UNPROCESSABLE_ENTITY',
                  'FORBIDDEN',
                ],
              },
              message: {
                type: 'string',
              },
            },
            required: ['type', 'message'],
          },
        },
        required: ['error'],
      },
    },
  },
} as const;
