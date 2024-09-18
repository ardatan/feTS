export default {
  openapi: '3.0.3',
  info: {
    version: '1',
    title: 'Tree - OpenAPI 3.0',
    description: 'This is a sample of tree',
    termsOfService: 'http://swagger.io/terms/',
  },
  paths: {
    '/tree': {
      get: {
        tags: ['tree'],
        summary: 'Get tree',
        description: '',
        operationId: 'getTree',
        responses: {
          '200': {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Node',
                },
              },
            },
          },
          '404': {
            description: 'Tree not found',
          },
        },
      },
    },
    "/tree-list": {
			get: {
				tags: ["tree-list"],
				summary: "Get tree list",
				description: "",
				operationId: "getTreeList",
				responses: {
					"200": {
						description: "successful operation",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/TreeNode",
								},
							},
						},
					},
					"404": {
						description: "Tree not found",
					},
				},
			},
		},
  },
  components: {
    schemas: {
			TreeNode: {
				type: "object",
				properties: {
					number: {
            type: 'integer',
            format: 'int64',
            example: 10,
					},
					children: {
						type: "array",
						items: {
							$ref: "#/components/schemas/TreeNode",
						},
					},
				},
			},
      Node: {
        type: 'object',
        properties: {
          number: {
            type: 'integer',
            format: 'int64',
            example: 10,
          },
          child: {
            $ref: '#/components/schemas/Node',
          },
        },
      },
    },
  },
} as const;
