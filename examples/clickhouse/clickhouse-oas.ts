/* eslint-disable */ export default {
  "openapi": "3.0.1",
  "info": {
    "title": "OpenAPI spec for ClickHouse Cloud",
    "version": "1.0",
    "contact": {
      "name": "ClickHouse Support",
      "url": "https://clickhouse.com/docs/en/cloud/manage/openapi?referrer=openapi-299828",
      "email": "support@clickhouse.com"
    }
  },
  "servers": [
    {
      "url": "https://api.clickhouse.cloud"
    }
  ],
  "paths": {
    "/v1/organizations": {
      "get": {
        "summary": "Get list of available organizations",
        "description": "Returns a list with a single organization associated with the API key in the request.",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Organization"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Organization"
        ]
      }
    },
    "/v1/organizations/{organizationId}": {
      "get": {
        "summary": "Get organization details",
        "description": "Returns details of a single organization. In order to get the details, the auth key must belong to the organization.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Organization"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Organization"
        ]
      },
      "patch": {
        "summary": "Update organization details",
        "description": "Updates organization fields. Requires ADMIN auth key role.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization to update.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OrganizationPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Organization"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Organization"
        ]
      }
    },
    "/v1/organizations/{organizationId}/prometheus": {
      "get": {
        "summary": "Get organization metrics",
        "description": "Returns prometheus metrics for all services in an organization.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "query",
            "name": "filtered_metrics",
            "description": "Return a filtered list of Prometheus metrics.",
            "schema": {
              "type": "string",
              "format": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Prometheus"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services": {
      "get": {
        "summary": "List of organization services",
        "description": "Returns a list of all services in the organization.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "query",
            "name": "filter",
            "description": "Filter criteria to apply when retrieving the resource. Currently, only filtering by resource tags is supported.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "example": "tag:Environment=Production&filter=tag:Department=Engineering&filter=tag:isActive"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Service"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      },
      "post": {
        "summary": "Create new service",
        "description": "Creates a new service in the organization, and returns the current service state and a password to access the service. The service is started asynchronously.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that will own the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServicePostRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ServicePostResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}": {
      "get": {
        "summary": "Get service details",
        "description": "Returns a service that belongs to the organization",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the requested service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Service"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      },
      "patch": {
        "summary": "Update service basic details",
        "description": "Updates basic service details like service name or IP access list.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to update.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServicePatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Service"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      },
      "delete": {
        "summary": "Delete service",
        "description": "Deletes the service. The service must be in stopped state and is deleted asynchronously after this method call.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to delete.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/privateEndpointConfig": {
      "get": {
        "summary": "Get private endpoint configuration",
        "description": "Information required to set up a private endpoint",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the requested service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/PrivateEndpointConfig"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/serviceQueryEndpoint": {
      "get": {
        "summary": "Get the service query endpoint for a given instance",
        "description": "This is an experimental feature. Please contact support to enable it.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the requested service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ServiceQueryAPIEndpoint"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      },
      "delete": {
        "summary": "Delete the service query endpoint for a given instance",
        "description": "This is an experimental feature. Please contact support to enable it.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the requested service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      },
      "post": {
        "summary": "Upsert the service query endpoint for a given instance",
        "description": "This is an experimental feature. Please contact support to enable it.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the requested service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InstanceServiceQueryApiEndpointsPostRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ServiceQueryAPIEndpoint"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/state": {
      "patch": {
        "summary": "Update service state",
        "description": "Starts or stop service",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to update state.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceStatePatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Service"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/scaling": {
      "patch": {
        "summary": "Update service auto scaling settings",
        "description": "Updates minimum and maximum total memory limits and idle mode scaling behavior for the service. The memory settings are available only for \"production\" services and must be a multiple of 12 starting from 24GB. Please contact support to enable adjustment of numReplicas.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to update scaling parameters.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceScalingPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Service"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": true,
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/replicaScaling": {
      "patch": {
        "summary": "Update service auto scaling settings",
        "description": "Updates minimum and maximum memory limits per replica and idle mode scaling behavior for the service. The memory settings are available only for \"production\" services and must be a multiple of 4 starting from 8GB. Please contact support to enable adjustment of numReplicas.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to update scaling parameters.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceReplicaScalingPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ServiceScalingPatchResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/password": {
      "patch": {
        "summary": "Update service password",
        "description": "Sets a new password for the service",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to update password.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServicePasswordPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ServicePasswordPatchResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/privateEndpoint": {
      "post": {
        "summary": "Create a private endpoint",
        "description": "Create a new private endpoint. The private endpoint will be associated with this service and organization",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the requested service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServicPrivateEndpointePostRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/InstancePrivateEndpoint"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Service"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/prometheus": {
      "get": {
        "summary": "Get service metrics",
        "description": "Returns prometheus metrics for a service.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the requested service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "query",
            "name": "filtered_metrics",
            "description": "Return a filtered list of Prometheus metrics.",
            "schema": {
              "type": "string",
              "format": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Prometheus"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/backups": {
      "get": {
        "summary": "List of service backups",
        "description": "Returns a list of all backups for the service. The most recent backups comes first in the list.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the backup.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service the backup was created from.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Backup"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Backup"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/backups/{backupId}": {
      "get": {
        "summary": "Get backup details",
        "description": "Returns a single backup info.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the backup.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service the backup was created from.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "backupId",
            "description": "ID of the requested backup.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Backup"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Backup"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/backupConfiguration": {
      "get": {
        "summary": "Get service backup configuration",
        "description": "Returns the service backup configuration.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/BackupConfiguration"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Backup"
        ]
      },
      "patch": {
        "summary": "Update service backup configuration",
        "description": "Updates service backup configuration. Requires ADMIN auth key role. Setting the properties with null value, will reset the properties to theirs default values.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BackupConfigurationPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/BackupConfiguration"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Backup"
        ]
      }
    },
    "/v1/organizations/{organizationId}/keys": {
      "get": {
        "summary": "Get list of all keys",
        "description": "Returns a list of all keys in the organization.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/ApiKey"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "OpenAPI"
        ]
      },
      "post": {
        "summary": "Create key",
        "description": "Creates new API key.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that will own the key.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiKeyPostRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ApiKeyPostResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "OpenAPI"
        ]
      }
    },
    "/v1/organizations/{organizationId}/keys/{keyId}": {
      "get": {
        "summary": "Get key details",
        "description": "Returns a single key details.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "keyId",
            "description": "ID of the requested key.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ApiKey"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "OpenAPI"
        ]
      },
      "patch": {
        "summary": "Update key",
        "description": "Updates API key properties.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the key.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "keyId",
            "description": "ID of the key to update.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApiKeyPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ApiKey"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "OpenAPI"
        ]
      },
      "delete": {
        "summary": "Delete key",
        "description": "Deletes API key. Only a key not used to authenticate the active request can be deleted.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the key.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "keyId",
            "description": "ID of the key to delete.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "OpenAPI"
        ]
      }
    },
    "/v1/organizations/{organizationId}/members": {
      "get": {
        "summary": "List organization members",
        "description": "Returns a list of all members in the organization.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Member"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      }
    },
    "/v1/organizations/{organizationId}/members/{userId}": {
      "get": {
        "summary": "Get member details",
        "description": "Returns a single organization member details.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization the member is part of.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "userId",
            "description": "ID of the requested user.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Member"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      },
      "patch": {
        "summary": "Update organization member",
        "description": "Updates organization member role.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization the member is part of.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "userId",
            "description": "ID of the user to patch",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MemberPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Member"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      },
      "delete": {
        "summary": "Remove an organization member",
        "description": "Removes a user from the organization",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "userId",
            "description": "ID of the requested user.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      }
    },
    "/v1/organizations/{organizationId}/invitations": {
      "get": {
        "summary": "List all invitations",
        "description": "Returns list of all organization invitations.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Invitation"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      },
      "post": {
        "summary": "Create an invitation",
        "description": "Creates organization invitation.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization to invite a user to.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InvitationPostRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Invitation"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      }
    },
    "/v1/organizations/{organizationId}/invitations/{invitationId}": {
      "get": {
        "summary": "Get invitation details",
        "description": "Returns details for a single organization invitation.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "invitationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Invitation"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      },
      "delete": {
        "summary": "Delete organization invitation",
        "description": "Deletes a single organization invitation.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that has the invitation.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "invitationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "User management"
        ]
      }
    },
    "/v1/organizations/{organizationId}/activities": {
      "get": {
        "summary": "List of organization activities",
        "description": "Returns a list of all organization activities.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "query",
            "name": "from_date",
            "description": "A starting date for a search",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "in": "query",
            "name": "to_date",
            "description": "An ending date for a search",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Activity"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Organization"
        ]
      }
    },
    "/v1/organizations/{organizationId}/activities/{activityId}": {
      "get": {
        "summary": "Organization activity",
        "description": "Returns a single organization activity by ID.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "activityId",
            "description": "ID of the requested activity.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/Activity"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Organization"
        ]
      }
    },
    "/v1/organizations/{organizationId}/usageCost": {
      "get": {
        "summary": "Get organization usage costs",
        "description": "Returns a grand total and a list of daily, per-entity organization usage cost records for the organization in the queried time period (maximum 31 days). All days in both the request and the response are evaluated based on the UTC timezone.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "query",
            "name": "from_date",
            "description": "Start date for the report, e.g. 2024-12-19.",
            "schema": {
              "type": "string",
              "format": "date-time"
            },
            "required": true
          },
          {
            "in": "query",
            "name": "to_date",
            "description": "End date (inclusive) for the report, e.g. 2024-12-20. This date cannot be more than 30 days after from_date (for a maximum queried period of 31 days).",
            "schema": {
              "type": "string",
              "format": "date-time"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/UsageCost"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Billing"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipes": {
      "get": {
        "summary": "List ClickPipes",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Returns a list of ClickPipes.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/ClickPipe"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "post": {
        "summary": "Create ClickPipe",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Create a new ClickPipe.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to create the ClickPipe for.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickPipePostRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipe"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipes/{clickPipeId}": {
      "get": {
        "summary": "Get ClickPipe",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Returns the specified ClickPipe.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickPipeId",
            "description": "ID of the requested ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipe"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "patch": {
        "summary": "Update ClickPipe",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Update the specified ClickPipe.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service to create the ClickPipe for.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickPipeId",
            "description": "ID of the requested ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickPipePatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipe"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "delete": {
        "summary": "Delete ClickPipe",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Delete the specified ClickPipe.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickPipeId",
            "description": "ID of the ClickPipe to delete.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipes/{clickPipeId}/settings": {
      "get": {
        "summary": "Get ClickPipe settings",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Returns the advanced settings for the specified ClickPipe.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickPipeId",
            "description": "ID of the ClickPipe to get settings for.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipeSettingsGetResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "put": {
        "summary": "Update ClickPipe settings",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Update the advanced settings for the specified ClickPipe. Send key-value pairs where values can be strings, numbers, or booleans.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickPipeId",
            "description": "ID of the ClickPipe to update settings for.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickPipeSettingsPutRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipeSettingsGetResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipes/{clickPipeId}/scaling": {
      "patch": {
        "summary": "Scaling ClickPipe",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Change scaling settings for the specified ClickPipe.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickPipeId",
            "description": "ID of the ClickPipe to update scaling settings.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickPipeScalingPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipe"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipes/{clickPipeId}/state": {
      "patch": {
        "summary": "Update ClickPipe state",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Start, stop or resync ClickPipe. Stopping a ClickPipe will stop the ingestion process from any state. Starting is allowed for ClickPipes in the \"Stopped\" state or with a \"Failed\" state. Resyncing is only for Postgres pipes and can be done from any state.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickPipeId",
            "description": "ID of the ClickPipe to update state.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickPipeStatePatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipe"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipesCdcScaling": {
      "get": {
        "summary": "Get CDC ClickPipes scaling",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Get scaling settings for DB ClickPipes.\n\nThe infrastructure is shared between all DB ClickPipes in the service, both for initial load and CDC. For billing purposes, 2 CPU cores and 8 GB of RAM [correspond](https://clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit.\n\n**This endpoint becomes available once at least one DB ClickPipe was provisioned.**",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipesCdcScaling"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "patch": {
        "summary": "Update CDC ClickPipes scaling",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Update scaling settings for DB ClickPipes.\n\nThe infrastructure is shared between all DB ClickPipes in the service, both for initial load and CDC. Scaling settings may take a few minutes to fully propagate.\n\nFor billing purposes, 2 CPU cores and 8 GB of RAM [correspond](https://clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit. If your organization tier changes, DB ClickPipes will be [rescaled](https://clickhouse.com/docs/cloud/manage/billing/overview#compute) appropriately.\n\n**This endpoint becomes available once at least one DB ClickPipe was provisioned.**",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the ClickPipe.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickPipesCdcScalingPatchRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ClickPipesCdcScaling"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/privateEndpointConfig": {
      "get": {
        "summary": "Get private endpoint configuration for region within cloud provider for an organization",
        "description": "Deprecated. Please follow [documentation](https://clickhouse.com/docs/manage/security/aws-privatelink#add-endpoint-id-to-services-allow-list) for the updated process.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "query",
            "name": "cloud_provider",
            "description": "Cloud provider identifier. One of aws, gcp, or azure.",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "in": "query",
            "name": "region_id",
            "description": "Region identifier within specific cloud providers.",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/OrganizationCloudRegionPrivateEndpointConfig"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": true,
        "tags": [
          "Organization"
        ]
      }
    },
    "/v1/organizations/{organizationId}/byocInfrastructure": {
      "post": {
        "summary": "Create BYOC Infrastructure",
        "description": "Create a new BYOC Infrastructure in the organization. Returns the configuration of the newly created infrastructure",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ByocInfrastructurePostRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ByocConfig"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Organization"
        ]
      }
    },
    "/v1/organizations/{organizationId}/byocInfrastructure/{byocInfrastructureId}": {
      "delete": {
        "summary": "Remove a BYOC infrastructure",
        "description": "Removes a BYOC Infrastructure from the organization",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the requested organization.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "byocInfrastructureId",
            "description": "ID of the requested BYOC Infrastructure",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "Organization"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipesReversePrivateEndpoints": {
      "get": {
        "summary": "List reverse private endpoints",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Returns a list of reverse private endpoints for the specified service.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the Reverse Private Endpoint.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/ReversePrivateEndpoint"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "post": {
        "summary": "Create reverse private endpoint",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Create a new reverse private endpoint.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the Reverse Private Endpoint.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateReversePrivateEndpoint"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ReversePrivateEndpoint"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickpipesReversePrivateEndpoints/{reversePrivateEndpointId}": {
      "get": {
        "summary": "Get reverse private endpoint",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Returns the reverse private endpoint with the specified ID.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the Reverse Private Endpoint.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "reversePrivateEndpointId",
            "description": "ID of the reverse private endpoint to get.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    },
                    "result": {
                      "$ref": "#/components/schemas/ReversePrivateEndpoint"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "delete": {
        "summary": "Delete reverse private endpoint",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Delete the reverse private endpoint with the specified ID.",
        "parameters": [
          {
            "in": "path",
            "name": "organizationId",
            "description": "ID of the organization that owns the service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "serviceId",
            "description": "ID of the service that owns the Reverse Private Endpoint.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "reversePrivateEndpointId",
            "description": "ID of the reverse private endpoint to delete.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 200
                    },
                    "requestId": {
                      "type": "string",
                      "description": "Unique id assigned to every request. UUIDv4",
                      "format": "uuid"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The server cannot or will not process the request due to something that is perceived to be a client error.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "number",
                      "description": "HTTP status code.",
                      "example": 400
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
                    }
                  }
                }
              }
            }
          }
        },
        "tags": [
          "ClickPipes"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    }
  },
  "components": {
    "schemas": {
      "PLAIN": {
        "properties": {
          "username": {
            "description": "Username.",
            "type": "string"
          },
          "password": {
            "description": "Password.",
            "type": "string"
          }
        }
      },
      "MskIamUser": {
        "properties": {
          "accessKeyId": {
            "description": "IAM access key ID.",
            "type": "string"
          },
          "secretKey": {
            "description": "IAM secret key.",
            "type": "string"
          }
        }
      },
      "ClickPipeKafkaOffset": {
        "properties": {
          "strategy": {
            "description": "Offset strategy.",
            "type": "string",
            "enum": [
              "from_beginning",
              "from_latest",
              "from_timestamp"
            ]
          },
          "timestamp": {
            "description": "A minute precision UTC timestamp to start from. Required for \"from_timestamp\" strategy.",
            "nullable": true,
            "type": "string",
            "example": "2021-01-01T00:00"
          }
        }
      },
      "ClickPipeKafkaSchemaRegistry": {
        "properties": {
          "url": {
            "description": "Schema URL. HTTPS required.",
            "type": "string",
            "example": "https://psrc-aa00.us-east-2.aws.confluent.cloud/schemas/ids/100004"
          },
          "authentication": {
            "description": "Authentication type of the schema registry.",
            "type": "string",
            "enum": [
              "PLAIN"
            ]
          },
          "caCertificate": {
            "description": "PEM encoded CA certificates to validate the schema registry's certificate.",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "ClickPipeKafkaSchemaRegistryCredentials": {
        "properties": {
          "username": {
            "description": "Username for the schema registry.",
            "type": "string"
          },
          "password": {
            "description": "Password for the schema registry.",
            "type": "string"
          }
        }
      },
      "ClickPipeMutateKafkaSchemaRegistry": {
        "properties": {
          "url": {
            "description": "Schema URL. HTTPS required.",
            "type": "string",
            "example": "https://psrc-aa00.us-east-2.aws.confluent.cloud/schemas/ids/100004"
          },
          "authentication": {
            "description": "Authentication type of the schema registry.",
            "type": "string",
            "enum": [
              "PLAIN"
            ]
          },
          "caCertificate": {
            "description": "PEM encoded CA certificates to validate the schema registry's certificate.",
            "nullable": true,
            "type": "string"
          },
          "credentials": {
            "$ref": "#/components/schemas/ClickPipeKafkaSchemaRegistryCredentials"
          }
        }
      },
      "AzureEventHub": {
        "properties": {
          "connectionString": {
            "description": "Connection string for Azure EventHub source.",
            "type": "string"
          }
        }
      },
      "ClickPipeKafkaSource": {
        "properties": {
          "type": {
            "description": "Type of the Kafka source.",
            "type": "string",
            "enum": [
              "kafka",
              "redpanda",
              "msk",
              "confluent",
              "warpstream",
              "azureeventhub",
              "dokafka"
            ]
          },
          "format": {
            "description": "Format of the Kafka source.",
            "type": "string",
            "enum": [
              "JSONEachRow",
              "Avro",
              "AvroConfluent"
            ]
          },
          "brokers": {
            "description": "Brokers of the Kafka source.",
            "type": "string"
          },
          "topics": {
            "description": "Topics of the Kafka source.",
            "type": "string"
          },
          "consumerGroup": {
            "description": "Consumer group of the Kafka source. If not provided \"clickpipes-<<ID>>\" will be used.",
            "nullable": true,
            "type": "string",
            "example": "my-clickpipe-consumer-group"
          },
          "authentication": {
            "description": "Authentication method of the Kafka source. Supported authentication methods: kafka: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, msk: SCRAM-SHA-512, IAM_ROLE, IAM_USER, MUTUAL_TLS, confluent: PLAIN, MUTUAL_TLS, warpstream: PLAIN, azureeventhub: PLAIN, redpanda: SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, dokafka: SCRAM-SHA-256, MUTUAL_TLS",
            "type": "string",
            "enum": [
              "PLAIN",
              "SCRAM-SHA-256",
              "SCRAM-SHA-512",
              "IAM_ROLE",
              "IAM_USER",
              "MUTUAL_TLS"
            ]
          },
          "iamRole": {
            "description": "IAM role for the Kafka source. Use with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/kafka#iam",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "offset": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeKafkaOffset"
              }
            ],
            "nullable": true
          },
          "schemaRegistry": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeKafkaSchemaRegistry"
              }
            ],
            "nullable": true
          },
          "caCertificate": {
            "description": "PEM encoded CA certificates to validate the broker's certificate.",
            "nullable": true,
            "type": "string"
          },
          "reversePrivateEndpointIds": {
            "type": "array",
            "description": "Reverse private endpoint UUIDs used for a secure private connection to the Kafka source.",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "ClickPipePostKafkaSource": {
        "properties": {
          "type": {
            "description": "Type of the Kafka source.",
            "type": "string",
            "enum": [
              "kafka",
              "redpanda",
              "msk",
              "confluent",
              "warpstream",
              "azureeventhub",
              "dokafka"
            ]
          },
          "format": {
            "description": "Format of the Kafka source.",
            "type": "string",
            "enum": [
              "JSONEachRow",
              "Avro",
              "AvroConfluent"
            ]
          },
          "brokers": {
            "description": "Brokers of the Kafka source.",
            "type": "string"
          },
          "topics": {
            "description": "Topics of the Kafka source.",
            "type": "string"
          },
          "consumerGroup": {
            "description": "Consumer group of the Kafka source. If not provided \"clickpipes-<<ID>>\" will be used.",
            "nullable": true,
            "type": "string",
            "example": "my-clickpipe-consumer-group"
          },
          "authentication": {
            "description": "Authentication method of the Kafka source. Supported authentication methods: kafka: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, msk: SCRAM-SHA-512, IAM_ROLE, IAM_USER, MUTUAL_TLS, confluent: PLAIN, MUTUAL_TLS, warpstream: PLAIN, azureeventhub: PLAIN, redpanda: SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, dokafka: SCRAM-SHA-256, MUTUAL_TLS",
            "type": "string",
            "enum": [
              "PLAIN",
              "SCRAM-SHA-256",
              "SCRAM-SHA-512",
              "IAM_ROLE",
              "IAM_USER",
              "MUTUAL_TLS"
            ]
          },
          "iamRole": {
            "description": "IAM role for the Kafka source. Use with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/kafka#iam",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "offset": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeKafkaOffset"
              }
            ],
            "nullable": true
          },
          "schemaRegistry": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeMutateKafkaSchemaRegistry"
              }
            ],
            "nullable": true
          },
          "caCertificate": {
            "description": "PEM encoded CA certificates to validate the broker's certificate.",
            "nullable": true,
            "type": "string"
          },
          "reversePrivateEndpointIds": {
            "type": "array",
            "description": "Reverse private endpoint UUIDs used for a secure private connection to the Kafka source.",
            "items": {
              "type": "string"
            }
          },
          "credentials": {
            "description": "Credentials for Kafka source. Chose one of that is supported by the authentication method.",
            "nullable": true,
            "oneOf": [
              {
                "$ref": "#/components/schemas/PLAIN"
              },
              {
                "$ref": "#/components/schemas/MskIamUser"
              },
              {
                "$ref": "#/components/schemas/AzureEventHub"
              }
            ]
          }
        }
      },
      "ClickPipePatchKafkaSource": {
        "properties": {
          "authentication": {
            "description": "Authentication method of the Kafka source. Supported authentication methods: kafka: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, msk: SCRAM-SHA-512, IAM_ROLE, IAM_USER, MUTUAL_TLS, confluent: PLAIN, MUTUAL_TLS, warpstream: PLAIN, azureeventhub: PLAIN, redpanda: SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, dokafka: SCRAM-SHA-256, MUTUAL_TLS",
            "nullable": true,
            "type": "string",
            "enum": [
              "PLAIN",
              "SCRAM-SHA-256",
              "SCRAM-SHA-512",
              "IAM_ROLE",
              "IAM_USER",
              "MUTUAL_TLS"
            ]
          },
          "iamRole": {
            "description": "IAM role for the Kafka source. Use with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/kafka#iam",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "caCertificate": {
            "description": "PEM encoded CA certificates to validate the broker's certificate.",
            "nullable": true,
            "type": "string"
          },
          "reversePrivateEndpointIds": {
            "type": "array",
            "description": "Reverse private endpoint UUIDs used for a secure private connection to the Kafka source.",
            "items": {
              "type": "string"
            }
          },
          "credentials": {
            "description": "Credentials for Kafka source. Chose one of that is supported by the authentication method.",
            "nullable": true,
            "oneOf": [
              {
                "$ref": "#/components/schemas/PLAIN"
              },
              {
                "$ref": "#/components/schemas/MskIamUser"
              },
              {
                "$ref": "#/components/schemas/AzureEventHub"
              }
            ]
          }
        }
      },
      "ClickPipeKinesisSource": {
        "properties": {
          "format": {
            "description": "Format of the Kinesis stream.",
            "type": "string",
            "enum": [
              "JSONEachRow",
              "Avro",
              "AvroConfluent"
            ]
          },
          "streamName": {
            "description": "Name of the Kinesis stream.",
            "type": "string",
            "example": "my-stream"
          },
          "region": {
            "description": "AWS region of the Kinesis stream.",
            "type": "string",
            "example": "us-east-1"
          },
          "useEnhancedFanOut": {
            "description": "Use enhanced fan-out for the Kinesis stream.",
            "nullable": true,
            "type": "boolean"
          },
          "iteratorType": {
            "description": "Type of iterator to use when reading from the Kinesis stream. If AT_TIMESTAMP is used, the timestamp field must be provided.",
            "type": "string",
            "enum": [
              "TRIM_HORIZON",
              "LATEST",
              "AT_TIMESTAMP"
            ]
          },
          "timestamp": {
            "description": "UNIX timestamp to start reading from the Kinesis stream. Required if iteratorType is AT_TIMESTAMP.",
            "nullable": true,
            "type": "integer",
            "example": 1615766400
          },
          "authentication": {
            "description": "Authentication method to use with the Kinesis stream.",
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER"
            ]
          },
          "iamRole": {
            "description": "IAM role to use for authentication. Required if IAM_ROLE is used.",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          }
        }
      },
      "ClickPipePostKinesisSource": {
        "properties": {
          "format": {
            "description": "Format of the Kinesis stream.",
            "type": "string",
            "enum": [
              "JSONEachRow",
              "Avro",
              "AvroConfluent"
            ]
          },
          "streamName": {
            "description": "Name of the Kinesis stream.",
            "type": "string",
            "example": "my-stream"
          },
          "region": {
            "description": "AWS region of the Kinesis stream.",
            "type": "string",
            "example": "us-east-1"
          },
          "useEnhancedFanOut": {
            "description": "Use enhanced fan-out for the Kinesis stream.",
            "nullable": true,
            "type": "boolean"
          },
          "iteratorType": {
            "description": "Type of iterator to use when reading from the Kinesis stream. If AT_TIMESTAMP is used, the timestamp field must be provided.",
            "type": "string",
            "enum": [
              "TRIM_HORIZON",
              "LATEST",
              "AT_TIMESTAMP"
            ]
          },
          "timestamp": {
            "description": "UNIX timestamp to start reading from the Kinesis stream. Required if iteratorType is AT_TIMESTAMP.",
            "nullable": true,
            "type": "integer",
            "example": 1615766400
          },
          "authentication": {
            "description": "Authentication method to use with the Kinesis stream.",
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER"
            ]
          },
          "iamRole": {
            "description": "IAM role to use for authentication. Required if IAM_ROLE is used.",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "accessKey": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/MskIamUser"
              }
            ],
            "nullable": true
          }
        }
      },
      "ClickPipePatchKinesisSource": {
        "properties": {
          "authentication": {
            "description": "Authentication method to use with the Kinesis stream.",
            "nullable": true,
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER"
            ]
          },
          "iamRole": {
            "description": "IAM role to use for authentication. Required if IAM_ROLE is used.",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "accessKey": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/MskIamUser"
              }
            ],
            "nullable": true
          }
        }
      },
      "ClickPipeObjectStorageSource": {
        "properties": {
          "type": {
            "description": "Type of the ObjectStorage source.",
            "type": "string",
            "enum": [
              "s3",
              "gcs",
              "dospaces",
              "azureblobstorage"
            ]
          },
          "format": {
            "description": "Format of the files.",
            "type": "string",
            "enum": [
              "JSONEachRow",
              "JSONAsObject",
              "CSV",
              "CSVWithNames",
              "Parquet",
              "Avro"
            ]
          },
          "url": {
            "description": "Provide a path to the file(s) you want to ingest. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
            "type": "string",
            "example": "https://datasets-documentation.s3.eu-west-3.amazonaws.com/http/**.ndjson.gz"
          },
          "delimiter": {
            "description": "Delimiter used in the files.",
            "nullable": true,
            "type": "string",
            "example": ","
          },
          "compression": {
            "description": "Compression algorithm used for the files.",
            "nullable": true,
            "type": "string",
            "enum": [
              "gzip",
              "gz",
              "brotli",
              "br",
              "xz",
              "LZMA",
              "zstd",
              "auto"
            ],
            "example": "auto"
          },
          "isContinuous": {
            "description": "If set to true, the pipe will continuously read new files from the source. If set to false, the pipe will read the files only once. New files have to be uploaded lexically order.",
            "nullable": true,
            "type": "boolean"
          },
          "queueUrl": {
            "description": "SQS queue URL for event-based continuous ingestion. When provided, files are ingested based on S3 event notifications rather than lexicographical order. Only applicable when isContinuous is true and authentication is not public.",
            "nullable": true,
            "type": "string",
            "example": "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue"
          },
          "authentication": {
            "description": "Authentication method. CONNECTION_STRING is for Azure Blob Storage. IAM_ROLE and IAM_USER are for AWS S3/GCS/DigitalOcean. If not provided, no authentication is used.",
            "nullable": true,
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER",
              "CONNECTION_STRING"
            ]
          },
          "iamRole": {
            "description": "IAM role to be used with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#authentication",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "connectionString": {
            "description": "Connection string for Azure Blob Storage authentication. Required when authentication is CONNECTION_STRING.",
            "nullable": true,
            "type": "string",
            "example": "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net"
          },
          "path": {
            "description": "Path to the file(s) within the Azure container. Used for Azure Blob Storage sources. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
            "nullable": true,
            "type": "string",
            "example": "data/logs/*.json"
          },
          "azureContainerName": {
            "description": "Container name for Azure Blob Storage. Required when type is azureblobstorage.",
            "nullable": true,
            "type": "string",
            "example": "mycontainer"
          }
        }
      },
      "ClickPipePostObjectStorageSource": {
        "properties": {
          "type": {
            "description": "Type of the ObjectStorage source.",
            "type": "string",
            "enum": [
              "s3",
              "gcs",
              "dospaces",
              "azureblobstorage"
            ]
          },
          "format": {
            "description": "Format of the files.",
            "type": "string",
            "enum": [
              "JSONEachRow",
              "JSONAsObject",
              "CSV",
              "CSVWithNames",
              "Parquet",
              "Avro"
            ]
          },
          "url": {
            "description": "Provide a path to the file(s) you want to ingest. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
            "type": "string",
            "example": "https://datasets-documentation.s3.eu-west-3.amazonaws.com/http/**.ndjson.gz"
          },
          "delimiter": {
            "description": "Delimiter used in the files.",
            "nullable": true,
            "type": "string",
            "example": ","
          },
          "compression": {
            "description": "Compression algorithm used for the files.",
            "nullable": true,
            "type": "string",
            "enum": [
              "gzip",
              "gz",
              "brotli",
              "br",
              "xz",
              "LZMA",
              "zstd",
              "auto"
            ],
            "example": "auto"
          },
          "isContinuous": {
            "description": "If set to true, the pipe will continuously read new files from the source. If set to false, the pipe will read the files only once. New files have to be uploaded lexically order.",
            "nullable": true,
            "type": "boolean"
          },
          "queueUrl": {
            "description": "SQS queue URL for event-based continuous ingestion. When provided, files are ingested based on S3 event notifications rather than lexicographical order. Only applicable when isContinuous is true and authentication is not public.",
            "nullable": true,
            "type": "string",
            "example": "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue"
          },
          "authentication": {
            "description": "Authentication method. CONNECTION_STRING is for Azure Blob Storage. IAM_ROLE and IAM_USER are for AWS S3/GCS/DigitalOcean. If not provided, no authentication is used.",
            "nullable": true,
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER",
              "CONNECTION_STRING"
            ]
          },
          "iamRole": {
            "description": "IAM role to be used with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#authentication",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "connectionString": {
            "description": "Connection string for Azure Blob Storage authentication. Required when authentication is CONNECTION_STRING.",
            "nullable": true,
            "type": "string",
            "example": "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net"
          },
          "path": {
            "description": "Path to the file(s) within the Azure container. Used for Azure Blob Storage sources. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
            "nullable": true,
            "type": "string",
            "example": "data/logs/*.json"
          },
          "azureContainerName": {
            "description": "Container name for Azure Blob Storage. Required when type is azureblobstorage.",
            "nullable": true,
            "type": "string",
            "example": "mycontainer"
          },
          "accessKey": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/MskIamUser"
              }
            ],
            "nullable": true
          }
        }
      },
      "ClickPipePatchObjectStorageSource": {
        "properties": {
          "authentication": {
            "description": "Authentication method. CONNECTION_STRING is for Azure Blob Storage. IAM_ROLE and IAM_USER are for AWS S3/GCS/DigitalOcean. If not provided, no authentication is used.",
            "nullable": true,
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER",
              "CONNECTION_STRING"
            ]
          },
          "iamRole": {
            "description": "IAM role to be used with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#authentication",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyRole"
          },
          "connectionString": {
            "description": "Connection string for Azure Blob Storage authentication. Required when authentication is CONNECTION_STRING.",
            "nullable": true,
            "type": "string",
            "example": "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net"
          },
          "path": {
            "description": "Path to the file(s) within the Azure container. Used for Azure Blob Storage sources. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
            "nullable": true,
            "type": "string",
            "example": "data/logs/*.json"
          },
          "azureContainerName": {
            "description": "Container name for Azure Blob Storage. Required when type is azureblobstorage.",
            "nullable": true,
            "type": "string",
            "example": "mycontainer"
          },
          "accessKey": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/MskIamUser"
              }
            ],
            "nullable": true
          }
        }
      },
      "ClickPipePostgresPipeSettings": {
        "properties": {
          "syncIntervalSeconds": {
            "description": "Interval in seconds to sync data from Postgres.",
            "type": "number"
          },
          "pullBatchSize": {
            "description": "Number of rows to pull in each batch.",
            "type": "number"
          },
          "publicationName": {
            "description": "Publication name to use for replication.",
            "type": "string"
          },
          "replicationMode": {
            "description": "Replication mode to use for the pipe.",
            "type": "string",
            "enum": [
              "cdc",
              "snapshot",
              "cdc_only"
            ]
          },
          "replicationSlotName": {
            "description": "Replication slot name to use for replication.",
            "type": "string"
          },
          "allowNullableColumns": {
            "description": "Allow nullable columns in the destination table.",
            "type": "boolean"
          },
          "initialLoadParallelism": {
            "description": "Number of parallel tables to sync during initial load.",
            "type": "number"
          },
          "snapshotNumRowsPerPartition": {
            "description": "Number of rows to snapshot per partition.",
            "type": "number"
          },
          "snapshotNumberOfParallelTables": {
            "description": "Number of parallel tables to snapshot.",
            "type": "number"
          },
          "enableFailoverSlots": {
            "description": "Enable failover for created replication slot. Requires a replication slot to NOT be set.",
            "type": "boolean"
          }
        }
      },
      "ClickPipePatchPostgresPipeSettings": {
        "properties": {
          "syncIntervalSeconds": {
            "description": "Interval in seconds to sync data from Postgres.",
            "nullable": true,
            "type": "number"
          },
          "pullBatchSize": {
            "description": "Number of rows to pull in each batch.",
            "nullable": true,
            "type": "number"
          }
        }
      },
      "ClickPipePostgresPipeTableMapping": {
        "properties": {
          "sourceSchemaName": {
            "description": "Source schema name.",
            "type": "string"
          },
          "sourceTable": {
            "description": "Source table name.",
            "type": "string"
          },
          "targetTable": {
            "description": "Target table name.",
            "type": "string"
          },
          "excludedColumns": {
            "type": "array",
            "description": "Columns to exclude from the target table.",
            "items": {
              "type": "string"
            }
          },
          "useCustomSortingKey": {
            "description": "Whether to use a custom sorting key for the target table.",
            "type": "boolean"
          },
          "sortingKeys": {
            "type": "array",
            "description": "Ordered list of columns to use as sorting key for the target table.",
            "items": {
              "type": "string"
            }
          },
          "tableEngine": {
            "description": "Table engine to use for the target table.",
            "type": "string",
            "enum": [
              "MergeTree",
              "ReplacingMergeTree",
              "Null"
            ]
          }
        }
      },
      "ClickPipePatchPostgresPipeRemoveTableMapping": {
        "properties": {
          "sourceSchemaName": {
            "description": "Source schema name.",
            "nullable": true,
            "type": "string"
          },
          "sourceTable": {
            "description": "Source table name.",
            "nullable": true,
            "type": "string"
          },
          "targetTable": {
            "description": "Target table name.",
            "nullable": true,
            "type": "string"
          },
          "tableEngine": {
            "description": "Table engine to use for the target table.",
            "nullable": true,
            "type": "string",
            "enum": [
              "MergeTree",
              "ReplacingMergeTree",
              "Null"
            ]
          }
        }
      },
      "ClickPipePostgresSource": {
        "properties": {
          "host": {
            "description": "Host of the Postgres instance to connect to.",
            "type": "string"
          },
          "port": {
            "description": "Port of the Postgres instance to connect to.",
            "type": "number"
          },
          "database": {
            "description": "Database of the Postgres instance to connect to.",
            "type": "string"
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipePostgresPipeSettings"
          },
          "tableMappings": {
            "type": "array",
            "description": "Table mappings for Postgres pipe.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePostgresPipeTableMapping"
            }
          }
        }
      },
      "ClickPipeMutatePostgresSource": {
        "properties": {
          "host": {
            "description": "Host of the Postgres instance to connect to.",
            "type": "string"
          },
          "port": {
            "description": "Port of the Postgres instance to connect to.",
            "type": "number"
          },
          "database": {
            "description": "Database of the Postgres instance to connect to.",
            "type": "string"
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipePostgresPipeSettings"
          },
          "tableMappings": {
            "type": "array",
            "description": "Table mappings for Postgres pipe.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePostgresPipeTableMapping"
            }
          },
          "credentials": {
            "$ref": "#/components/schemas/PLAIN"
          }
        }
      },
      "ClickPipePatchPostgresSource": {
        "properties": {
          "host": {
            "description": "Host of the Postgres instance to connect to.",
            "nullable": true,
            "type": "string"
          },
          "port": {
            "description": "Port of the Postgres instance to connect to.",
            "nullable": true,
            "type": "number"
          },
          "database": {
            "description": "Database of the Postgres instance to connect to.",
            "nullable": true,
            "type": "string"
          },
          "credentials": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/PLAIN"
              }
            ],
            "nullable": true
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipePatchPostgresPipeSettings"
          },
          "tableMappingsToAdd": {
            "type": "array",
            "description": "Table mappings to add to Postgres pipe.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePostgresPipeTableMapping"
            }
          },
          "tableMappingsToRemove": {
            "type": "array",
            "description": "Table mappings to remove from Postgres pipe.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePatchPostgresPipeRemoveTableMapping"
            }
          }
        }
      },
      "ClickPipeScaling": {
        "properties": {
          "replicas": {
            "description": "Desired number of replicas. Only for scalable pipes.",
            "type": "integer"
          },
          "concurrency": {
            "description": "Desired number of concurrency. Only for S3 pipes. If set to 0, concurrency is auto-scaled based on the cluster memory.",
            "type": "integer",
            "deprecated": true
          },
          "replicaCpuMillicores": {
            "description": "CPU in millicores for each replica. Only for streaming pipes.",
            "type": "integer",
            "minimum": 125,
            "maximum": 2000
          },
          "replicaMemoryGb": {
            "description": "Memory in GB for each replica. Only for streaming pipes.",
            "type": "number",
            "minimum": 0.5,
            "maximum": 8
          }
        }
      },
      "ClickPipeSource": {
        "properties": {
          "kafka": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeKafkaSource"
              }
            ],
            "nullable": true
          },
          "objectStorage": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeObjectStorageSource"
              }
            ],
            "nullable": true
          },
          "kinesis": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeKinesisSource"
              }
            ],
            "nullable": true
          },
          "postgres": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePostgresSource"
              }
            ],
            "nullable": true
          }
        }
      },
      "ClickPipeDestinationColumn": {
        "properties": {
          "name": {
            "description": "Name of the column.",
            "type": "string"
          },
          "type": {
            "description": "Type of the column.",
            "type": "string"
          }
        }
      },
      "ClickPipeDestinationTableEngine": {
        "properties": {
          "type": {
            "description": "Engine type of the destination table.",
            "type": "string",
            "enum": [
              "MergeTree",
              "ReplacingMergeTree",
              "SummingMergeTree",
              "Null"
            ]
          },
          "versionColumnId": {
            "description": "Column name to use as version for ReplacingMergeTree engine.",
            "nullable": true,
            "type": "string"
          },
          "columnIds": {
            "type": "array",
            "description": "Column names to sum for SummingMergeTree engine.",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "ClickPipeDestinationTableDefinition": {
        "properties": {
          "engine": {
            "$ref": "#/components/schemas/ClickPipeDestinationTableEngine"
          },
          "sortingKey": {
            "type": "array",
            "description": "Sorting key of the destination table. List of columns.",
            "items": {
              "type": "string"
            }
          },
          "partitionBy": {
            "description": "Partition key SQL expression.",
            "type": "string"
          },
          "primaryKey": {
            "description": "Primary key of SQL expression.",
            "type": "string"
          }
        }
      },
      "ClickPipeDestination": {
        "properties": {
          "database": {
            "description": "Destination database.",
            "type": "string"
          },
          "table": {
            "description": "Destination table. Required field for all pipe types except Postgres.",
            "type": "string"
          },
          "managedTable": {
            "description": "Is the table managed by ClickPipes? Required field for all pipe types except Postgres.",
            "type": "boolean"
          },
          "tableDefinition": {
            "$ref": "#/components/schemas/ClickPipeDestinationTableDefinition"
          },
          "columns": {
            "type": "array",
            "description": "Columns of the destination table. Required field for all pipe types except Postgres.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeDestinationColumn"
            }
          }
        }
      },
      "ClickPipeFieldMapping": {
        "properties": {
          "sourceField": {
            "description": "Source field name.",
            "type": "string"
          },
          "destinationField": {
            "description": "Destination field name.",
            "type": "string"
          }
        }
      },
      "ClickPipeSettings": {
        "properties": {
          "streaming_max_insert_wait_ms": {
            "description": "Streaming max insert wait time. Configures the max wait period before inserting data into the ClickHouse.",
            "nullable": true,
            "type": "integer",
            "minimum": 500,
            "maximum": 60000,
            "example": 5000
          },
          "object_storage_concurrency": {
            "description": "Object storage concurrency. Number of concurrent file processing threads",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 35,
            "example": 1
          },
          "object_storage_polling_interval_ms": {
            "description": "Object storage polling interval. Configures the refresh interval for querying continuous ingest for new object storage data",
            "nullable": true,
            "type": "integer",
            "minimum": 100,
            "maximum": 3600000,
            "example": 30000
          },
          "object_storage_max_insert_bytes": {
            "description": "Max insert bytes. Number of bytes to process in a single insert batch",
            "nullable": true,
            "type": "integer",
            "minimum": 10485760,
            "maximum": 53687091200,
            "example": 10737418240
          },
          "object_storage_max_file_count": {
            "description": "Max file count. Maximum number of files to process in a single insert batch",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 10000,
            "example": 100
          },
          "clickhouse_max_threads": {
            "description": "Max threads. Maximum number of concurrent threads for file processing",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 64,
            "example": 8
          },
          "clickhouse_max_insert_threads": {
            "description": "Max insert threads. Maximum number of concurrent insert threads",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 16,
            "example": 1
          },
          "clickhouse_min_insert_block_size_bytes": {
            "description": "Min insert block size bytes. Minimum size of data block for insert (in bytes)",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 10737418240,
            "example": 1073741824
          },
          "clickhouse_max_download_threads": {
            "description": "Max download threads. Maximum number of concurrent download threads",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 32,
            "example": 4
          },
          "clickhouse_parallel_distributed_insert_select": {
            "description": "Parallel distributed insert select. Parallel distributed insert select setting",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 2,
            "example": 2
          },
          "object_storage_use_cluster_function": {
            "description": "use cluster function. Whether to use ClickHouse cluster function for distributed processing",
            "nullable": true,
            "type": "boolean",
            "example": true
          },
          "clickhouse_parallel_view_processing": {
            "description": "parallel view processing. Whether to enable pushing to attached views concurrently instead of sequentially",
            "nullable": true,
            "type": "boolean",
            "example": false
          }
        }
      },
      "ClickPipe": {
        "properties": {
          "id": {
            "description": "Unique ClickPipe ID.",
            "type": "string",
            "format": "uuid"
          },
          "serviceId": {
            "description": "ID of the service this ClickPipe belongs to.",
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "description": "Name of the ClickPipe.",
            "type": "string"
          },
          "state": {
            "description": "Current state of the ClickPipe.",
            "type": "string"
          },
          "scaling": {
            "$ref": "#/components/schemas/ClickPipeScaling"
          },
          "source": {
            "$ref": "#/components/schemas/ClickPipeSource"
          },
          "destination": {
            "$ref": "#/components/schemas/ClickPipeDestination"
          },
          "fieldMappings": {
            "type": "array",
            "description": "Field mappings of the ClickPipe. Note that all destination columns must be included in the mappings.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeFieldMapping"
            }
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipeSettings"
          },
          "createdAt": {
            "description": "Creation date of the ClickPipe.",
            "type": "string"
          },
          "updatedAt": {
            "description": "Last update date of the ClickPipe.",
            "type": "string"
          }
        }
      },
      "ClickPipePostSource": {
        "properties": {
          "kafka": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePostKafkaSource"
              }
            ],
            "nullable": true
          },
          "objectStorage": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePostObjectStorageSource"
              }
            ],
            "nullable": true
          },
          "kinesis": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePostKinesisSource"
              }
            ],
            "nullable": true
          },
          "postgres": {
            "$ref": "#/components/schemas/ClickPipeMutatePostgresSource"
          },
          "validateSamples": {
            "description": "Validate data samples received from data source. It will validate the connection and data availability and correctness. If not enabled, only connection will be validated. This has no effect on Postgres pipes, they always only validate the connection and table definitions. This is experimental and can be removed in the future.",
            "type": "boolean"
          }
        }
      },
      "ClickPipePatchSource": {
        "properties": {
          "kafka": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePatchKafkaSource"
              }
            ],
            "nullable": true
          },
          "objectStorage": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePatchObjectStorageSource"
              }
            ],
            "nullable": true
          },
          "kinesis": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePatchKinesisSource"
              }
            ],
            "nullable": true
          },
          "postgres": {
            "$ref": "#/components/schemas/ClickPipePatchPostgresSource"
          },
          "validateSamples": {
            "description": "Validate data samples received from data source. It will validate the connection and data availability and correctness. If not enabled, only connection will be validated. This has no effect on Postgres pipes, they always only validate the connection and table definitions. This is experimental and can be removed in the future.",
            "type": "boolean"
          }
        }
      },
      "ClickPipeMutateDestination": {
        "properties": {
          "database": {
            "description": "Destination database.",
            "type": "string"
          },
          "table": {
            "description": "Destination table. Required field for all pipe types except Postgres.",
            "type": "string"
          },
          "managedTable": {
            "description": "Is the table managed by ClickPipes? Required field for all pipe types except Postgres.",
            "type": "boolean"
          },
          "tableDefinition": {
            "$ref": "#/components/schemas/ClickPipeDestinationTableDefinition"
          },
          "columns": {
            "type": "array",
            "description": "Columns of the destination table. Required field for all pipe types except Postgres.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeDestinationColumn"
            }
          },
          "roles": {
            "type": "array",
            "description": "ClickPipe will create a ClickHouse user with these roles. Add your custom roles here if required.",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "ClickPipePatchDestination": {
        "properties": {
          "columns": {
            "type": "array",
            "description": "Columns of the destination table. This will not update the table schema, only the ClickPipe configuration.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeDestinationColumn"
            }
          }
        }
      },
      "ClickPipesCdcScaling": {
        "properties": {
          "replicaCpuMillicores": {
            "description": "CPU in millicores for DB ClickPipes.",
            "type": "integer",
            "minimum": 1000,
            "maximum": 24000,
            "multipleOf": 1000,
            "example": 2000
          },
          "replicaMemoryGb": {
            "description": "Memory in GiB for DB ClickPipes. Must be 4× the CPU core count.",
            "type": "number",
            "minimum": 4,
            "maximum": 96,
            "multipleOf": 4,
            "example": 8
          }
        }
      },
      "ClickPipeSettingsGetResponse": {
        "properties": {
          "streaming_max_insert_wait_ms": {
            "description": "Streaming max insert wait time. Configures the max wait period before inserting data into the ClickHouse.",
            "nullable": true,
            "type": "integer",
            "minimum": 500,
            "maximum": 60000,
            "example": 5000
          },
          "object_storage_concurrency": {
            "description": "Object storage concurrency. Number of concurrent file processing threads",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 35,
            "example": 1
          },
          "object_storage_polling_interval_ms": {
            "description": "Object storage polling interval. Configures the refresh interval for querying continuous ingest for new object storage data",
            "nullable": true,
            "type": "integer",
            "minimum": 100,
            "maximum": 3600000,
            "example": 30000
          },
          "object_storage_max_insert_bytes": {
            "description": "Max insert bytes. Number of bytes to process in a single insert batch",
            "nullable": true,
            "type": "integer",
            "minimum": 10485760,
            "maximum": 53687091200,
            "example": 10737418240
          },
          "object_storage_max_file_count": {
            "description": "Max file count. Maximum number of files to process in a single insert batch",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 10000,
            "example": 100
          },
          "clickhouse_max_threads": {
            "description": "Max threads. Maximum number of concurrent threads for file processing",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 64,
            "example": 8
          },
          "clickhouse_max_insert_threads": {
            "description": "Max insert threads. Maximum number of concurrent insert threads",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 16,
            "example": 1
          },
          "clickhouse_min_insert_block_size_bytes": {
            "description": "Min insert block size bytes. Minimum size of data block for insert (in bytes)",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 10737418240,
            "example": 1073741824
          },
          "clickhouse_max_download_threads": {
            "description": "Max download threads. Maximum number of concurrent download threads",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 32,
            "example": 4
          },
          "clickhouse_parallel_distributed_insert_select": {
            "description": "Parallel distributed insert select. Parallel distributed insert select setting",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 2,
            "example": 2
          },
          "object_storage_use_cluster_function": {
            "description": "use cluster function. Whether to use ClickHouse cluster function for distributed processing",
            "nullable": true,
            "type": "boolean",
            "example": true
          },
          "clickhouse_parallel_view_processing": {
            "description": "parallel view processing. Whether to enable pushing to attached views concurrently instead of sequentially",
            "nullable": true,
            "type": "boolean",
            "example": false
          }
        }
      },
      "ClickPipeSettingsPutRequest": {
        "properties": {
          "streaming_max_insert_wait_ms": {
            "description": "Streaming max insert wait time. Configures the max wait period before inserting data into the ClickHouse.",
            "nullable": true,
            "type": "integer",
            "minimum": 500,
            "maximum": 60000,
            "example": 5000
          },
          "object_storage_concurrency": {
            "description": "Object storage concurrency. Number of concurrent file processing threads",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 35,
            "example": 1
          },
          "object_storage_polling_interval_ms": {
            "description": "Object storage polling interval. Configures the refresh interval for querying continuous ingest for new object storage data",
            "nullable": true,
            "type": "integer",
            "minimum": 100,
            "maximum": 3600000,
            "example": 30000
          },
          "object_storage_max_insert_bytes": {
            "description": "Max insert bytes. Number of bytes to process in a single insert batch",
            "nullable": true,
            "type": "integer",
            "minimum": 10485760,
            "maximum": 53687091200,
            "example": 10737418240
          },
          "object_storage_max_file_count": {
            "description": "Max file count. Maximum number of files to process in a single insert batch",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 10000,
            "example": 100
          },
          "clickhouse_max_threads": {
            "description": "Max threads. Maximum number of concurrent threads for file processing",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 64,
            "example": 8
          },
          "clickhouse_max_insert_threads": {
            "description": "Max insert threads. Maximum number of concurrent insert threads",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 16,
            "example": 1
          },
          "clickhouse_min_insert_block_size_bytes": {
            "description": "Min insert block size bytes. Minimum size of data block for insert (in bytes)",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 10737418240,
            "example": 1073741824
          },
          "clickhouse_max_download_threads": {
            "description": "Max download threads. Maximum number of concurrent download threads",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 32,
            "example": 4
          },
          "clickhouse_parallel_distributed_insert_select": {
            "description": "Parallel distributed insert select. Parallel distributed insert select setting",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 2,
            "example": 2
          },
          "object_storage_use_cluster_function": {
            "description": "use cluster function. Whether to use ClickHouse cluster function for distributed processing",
            "nullable": true,
            "type": "boolean",
            "example": true
          },
          "clickhouse_parallel_view_processing": {
            "description": "parallel view processing. Whether to enable pushing to attached views concurrently instead of sequentially",
            "nullable": true,
            "type": "boolean",
            "example": false
          }
        }
      },
      "ServiceEndpoint": {
        "properties": {
          "protocol": {
            "description": "Endpoint protocol: 'https', 'nativesecure', 'mysql'.",
            "type": "string",
            "enum": [
              "https",
              "nativesecure",
              "mysql"
            ],
            "example": "mysql"
          },
          "host": {
            "description": "Service host name",
            "type": "string"
          },
          "port": {
            "description": "Numeric port",
            "type": "number"
          },
          "username": {
            "description": "Optional username for the endpoint",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "IpAccessListEntry": {
        "properties": {
          "source": {
            "description": "IP or CIDR",
            "type": "string"
          },
          "description": {
            "description": "Optional description of IPv4 address or IPv4 CIDR to allow access from",
            "type": "string"
          }
        }
      },
      "Service": {
        "properties": {
          "id": {
            "description": "Unique service ID.",
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "description": "Name of the service. Alphanumerical string with whitespaces up to 50 characters.",
            "type": "string"
          },
          "provider": {
            "description": "Cloud provider",
            "type": "string",
            "enum": [
              "aws",
              "gcp",
              "azure"
            ]
          },
          "region": {
            "description": "Service region.",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          },
          "state": {
            "description": "Current state of the service.",
            "type": "string",
            "enum": [
              "starting",
              "stopping",
              "terminating",
              "awaking",
              "partially_running",
              "provisioning",
              "running",
              "stopped",
              "terminated",
              "degraded",
              "failed",
              "idle"
            ]
          },
          "clickhouseVersion": {
            "description": "ClickHouse version of the service.",
            "type": "string"
          },
          "endpoints": {
            "type": "array",
            "description": "List of all service endpoints.",
            "items": {
              "$ref": "#/components/schemas/ServiceEndpoint"
            }
          },
          "tier": {
            "description": "DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
            "type": "string",
            "enum": [
              "development",
              "production",
              "dedicated_high_mem",
              "dedicated_high_cpu",
              "dedicated_standard",
              "dedicated_standard_n2d_standard_4",
              "dedicated_standard_n2d_standard_8",
              "dedicated_standard_n2d_standard_32",
              "dedicated_standard_n2d_standard_128",
              "dedicated_standard_n2d_standard_32_16SSD",
              "dedicated_standard_n2d_standard_64_24SSD"
            ],
            "deprecated": true
          },
          "minTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 360,
            "deprecated": true
          },
          "minReplicaMemoryGb": {
            "description": "Minimum total memory of each replica during auto-scaling in Gb. Must be a multiple of 4 and greater than or equal to 8.",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum total memory of each replica during auto-scaling in Gb.  Must be a multiple of 4 and lower than or equal to 120* for non paid services or 356* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region. ",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 120
          },
          "numReplicas": {
            "description": "Number of replicas for the service. The number of replicas must be between 2 and 20 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers.",
            "type": "number",
            "minimum": 1,
            "maximum": 20,
            "example": 3
          },
          "idleScaling": {
            "description": "When set to true the service is allowed to scale down to zero when idle. True by default.",
            "type": "boolean"
          },
          "idleTimeoutMinutes": {
            "description": "Set minimum idling timeout (in minutes). Must be >= 5 minutes.",
            "type": "number"
          },
          "ipAccessList": {
            "type": "array",
            "description": "List of IP addresses allowed to access the service",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          },
          "createdAt": {
            "description": "Service creation timestamp. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "encryptionKey": {
            "description": "Optional customer provided disk encryption key",
            "type": "string"
          },
          "encryptionAssumedRoleIdentifier": {
            "description": "Optional role to use for disk encryption",
            "type": "string"
          },
          "iamRole": {
            "description": "IAM role used for accessing objects in s3",
            "type": "string"
          },
          "privateEndpointIds": {
            "type": "array",
            "description": "List of private endpoints",
            "items": {
              "type": "string"
            }
          },
          "availablePrivateEndpointIds": {
            "type": "array",
            "description": "List of available private endpoints ids that can be attached to the service",
            "items": {
              "type": "string"
            }
          },
          "dataWarehouseId": {
            "description": "Data warehouse containing this service",
            "type": "string"
          },
          "isPrimary": {
            "description": "True if this service is the primary service in the data warehouse",
            "type": "boolean"
          },
          "isReadonly": {
            "description": "True if this service is read-only. It can only be read-only if a dataWarehouseId is provided.",
            "type": "boolean"
          },
          "releaseChannel": {
            "description": "Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
            "type": "string",
            "enum": [
              "slow",
              "default",
              "fast"
            ]
          },
          "byocId": {
            "description": "This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232.",
            "type": "string"
          },
          "hasTransparentDataEncryption": {
            "description": "True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation.",
            "type": "boolean"
          },
          "profile": {
            "description": "Custom instance profile. Only available for ENTERPRISE organization tiers.",
            "type": "string",
            "enum": [
              "v1-default",
              "v1-highmem-xs",
              "v1-highmem-s",
              "v1-highmem-m",
              "v1-highmem-l",
              "v1-highmem-xl",
              "v1-highcpu-s",
              "v1-highcpu-m",
              "v1-highcpu-l",
              "v1-highcpu-xl"
            ]
          },
          "transparentDataEncryptionKeyId": {
            "description": "The ID of the Transparent Data Encryption key used for the service. This is only available if hasTransparentDataEncryption is true.",
            "type": "string"
          },
          "encryptionRoleId": {
            "description": "The ID of the IAM role used for encryption. This is only available if hasTransparentDataEncryption is true.",
            "type": "string"
          },
          "complianceType": {
            "description": "Type of regulatory compliance for service.",
            "type": "string",
            "enum": [
              "hipaa",
              "pci"
            ]
          }
        }
      },
      "PrivateEndpointConfig": {
        "properties": {
          "endpointServiceId": {
            "description": "Unique identifier of the interface endpoint you created in your VPC with the AWS(Service Name), GCP(Target Service) or AZURE (Private Link Service) resource",
            "type": "string"
          },
          "privateDnsHostname": {
            "description": "Private DNS Hostname of the VPC you created",
            "type": "string"
          }
        }
      },
      "ServiceQueryAPIEndpoint": {
        "properties": {
          "id": {
            "description": "The id of the service query endpoint",
            "type": "string"
          },
          "openApiKeys": {
            "type": "array",
            "description": "List of OpenAPI keys that can access the service query endpoint",
            "items": {
              "type": "string"
            }
          },
          "roles": {
            "type": "array",
            "description": "List of roles that can access the service query endpoint",
            "items": {
              "type": "string",
              "enum": [
                "sql_console_read_only",
                "sql_console_admin"
              ]
            }
          },
          "allowedOrigins": {
            "description": "The allowed origins as comma separated list of domains",
            "type": "string"
          }
        }
      },
      "ServiceEndpointChange": {
        "properties": {
          "protocol": {
            "description": "Endpoint protocol",
            "type": "string",
            "enum": [
              "mysql"
            ],
            "example": "mysql"
          },
          "enabled": {
            "description": "Enable or disable the endpoint",
            "type": "boolean"
          }
        }
      },
      "IpAccessListPatch": {
        "properties": {
          "add": {
            "type": "array",
            "description": "Elements to add. Executed after \"remove\" part is processed.",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          },
          "remove": {
            "type": "array",
            "description": "Elements to remove. Executed before \"add\" part is processed.",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          }
        }
      },
      "InstancePrivateEndpointsPatch": {
        "properties": {
          "add": {
            "type": "array",
            "description": "Elements to add. Executed after \"remove\" part is processed.",
            "items": {
              "type": "string"
            }
          },
          "remove": {
            "type": "array",
            "description": "Elements to remove. Executed before \"add\" part is processed.",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "InstancePrivateEndpoint": {
        "properties": {
          "id": {
            "description": "Private endpoint identifier",
            "type": "string"
          },
          "description": {
            "description": "Description of private endpoint",
            "type": "string"
          },
          "cloudProvider": {
            "description": "Cloud provider in which the private endpoint is lcoated",
            "type": "string",
            "enum": [
              "gcp",
              "aws",
              "azure"
            ]
          },
          "region": {
            "description": "Region in which the private endpoint is located",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          }
        }
      },
      "UsageCostMetrics": {
        "properties": {
          "storageCHC": {
            "description": "Cost of storage in ClickHouse Credits (CHCs). Applies to dataWarehouse entities.",
            "type": "number"
          },
          "backupCHC": {
            "description": "Cost of backup in ClickHouse Credits (CHCs). Applies to dataWarehouse entities.",
            "type": "number"
          },
          "computeCHC": {
            "description": "Cost of compute in ClickHouse Credits (CHCs). Applies to service and clickpipe entities.",
            "type": "number"
          },
          "dataTransferCHC": {
            "description": "Cost of data transfer in ClickHouse Credits (CHCs). Applies to clickpipe entities.",
            "type": "number"
          },
          "initialLoadCHC": {
            "description": "Cost of initial load and resyncs in ClickHouse Credits (CHCs). Applies to clickpipe entities.",
            "type": "number"
          },
          "publicDataTransferCHC": {
            "description": "Cost of data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
            "type": "number"
          },
          "interRegionTier1DataTransferCHC": {
            "description": "Cost of tier1 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
            "type": "number"
          },
          "interRegionTier2DataTransferCHC": {
            "description": "Cost of tier2 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
            "type": "number"
          },
          "interRegionTier3DataTransferCHC": {
            "description": "Cost of tier3 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
            "type": "number"
          },
          "interRegionTier4DataTransferCHC": {
            "description": "Cost of tier4 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
            "type": "number"
          }
        }
      },
      "UsageCostRecord": {
        "properties": {
          "dataWarehouseId": {
            "description": "ID of the dataWarehouse this entity belongs to (or is).",
            "type": "string",
            "format": "uuid"
          },
          "serviceId": {
            "description": "ID of the service this entity belongs to (or is). Set to null for dataWarehouse entities.",
            "nullable": true,
            "type": "string",
            "format": "uuid"
          },
          "date": {
            "description": "Date of the usage. ISO-8601 date, based on the UTC timezone.",
            "type": "string",
            "format": "date"
          },
          "entityType": {
            "description": "Type of the entity.",
            "type": "string",
            "enum": [
              "datawarehouse",
              "service",
              "clickpipe"
            ]
          },
          "entityId": {
            "description": "Unique ID of the entity.",
            "type": "string",
            "format": "uuid"
          },
          "entityName": {
            "description": "Name of the entity.",
            "type": "string"
          },
          "metrics": {
            "$ref": "#/components/schemas/UsageCostMetrics"
          },
          "totalCHC": {
            "description": "Total cost of usage in ClickHouse Credits (CHCs) for this entity.",
            "type": "number"
          },
          "locked": {
            "description": "When true, the record is immutable. Unlocked records are subject to change until locked.",
            "type": "boolean"
          }
        }
      },
      "UsageCost": {
        "properties": {
          "grandTotalCHC": {
            "description": "Grand total cost of usage in ClickHouse Credits (CHCs).",
            "type": "number"
          },
          "costs": {
            "$ref": "#/components/schemas/UsageCostRecord"
          }
        }
      },
      "OrganizationPrivateEndpoint": {
        "properties": {
          "id": {
            "description": "Private endpoint identifier",
            "type": "string"
          },
          "description": {
            "description": "Description of private endpoint",
            "type": "string"
          },
          "cloudProvider": {
            "description": "Cloud provider in which the private endpoint is lcoated",
            "type": "string",
            "enum": [
              "gcp",
              "aws",
              "azure"
            ]
          },
          "region": {
            "description": "Region in which the private endpoint is located",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          }
        }
      },
      "ByocConfig": {
        "properties": {
          "id": {
            "description": "Unique identifier of the BYOC configuration",
            "type": "string"
          },
          "state": {
            "description": "State of the infrastructure",
            "type": "string",
            "enum": [
              "infra-ready",
              "infra-provisioning",
              "infra-terminated"
            ]
          },
          "accountName": {
            "description": "Name of the account",
            "type": "string"
          },
          "regionId": {
            "description": "Region for which the BYOC has been configured and where it is possible to create services",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          },
          "cloudProvider": {
            "description": "Cloud provider of the region",
            "type": "string",
            "enum": [
              "gcp",
              "aws",
              "azure"
            ]
          }
        }
      },
      "Organization": {
        "properties": {
          "id": {
            "description": "Unique organization ID.",
            "type": "string",
            "format": "uuid"
          },
          "createdAt": {
            "description": "The timestamp the organization was created. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "name": {
            "description": "Name of the organization.",
            "type": "string"
          },
          "privateEndpoints": {
            "type": "array",
            "description": "List of private endpoints for organization",
            "items": {
              "$ref": "#/components/schemas/OrganizationPrivateEndpoint"
            }
          },
          "byocConfig": {
            "type": "array",
            "description": "BYOC configuration for the organization",
            "items": {
              "$ref": "#/components/schemas/ByocConfig"
            }
          }
        }
      },
      "OrganizationCloudRegionPrivateEndpointConfig": {
        "properties": {
          "endpointServiceId": {
            "description": "Unique identifier of the interface endpoint you created in your VPC with the AWS(Service Name) or GCP(Target Service) resource",
            "type": "string"
          }
        }
      },
      "OrganizationPatchPrivateEndpoint": {
        "properties": {
          "id": {
            "description": "Private endpoint identifier",
            "type": "string"
          },
          "description": {
            "description": "Optional description of private endpoint",
            "type": "string"
          },
          "cloudProvider": {
            "description": "Cloud provider in which the private endpoint is lcoated",
            "type": "string",
            "enum": [
              "gcp",
              "aws",
              "azure"
            ]
          },
          "region": {
            "description": "Region in which the private endpoint is located",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          }
        }
      },
      "OrganizationPrivateEndpointsPatch": {
        "properties": {
          "add": {
            "type": "array",
            "description": "Elements to add. Executed after \"remove\" part is processed. Please use the `Update Service Basic Details` endpoint instead to modify the private endpoints.",
            "items": {
              "$ref": "#/components/schemas/OrganizationPatchPrivateEndpoint"
            },
            "deprecated": true
          },
          "remove": {
            "type": "array",
            "description": "Elements to remove. Executed before \"add\" part is processed.",
            "items": {
              "$ref": "#/components/schemas/OrganizationPatchPrivateEndpoint"
            }
          }
        }
      },
      "Activity": {
        "properties": {
          "id": {
            "description": "Unique activity ID.",
            "type": "string"
          },
          "createdAt": {
            "description": "Timestamp of the activity. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "type": {
            "description": "Type of the activity.",
            "type": "string",
            "enum": [
              "create_organization",
              "organization_update_name",
              "transfer_service_in",
              "transfer_service_out",
              "save_payment_method",
              "marketplace_subscription",
              "migrate_marketplace_billing_details_in",
              "migrate_marketplace_billing_details_out",
              "organization_update_tier",
              "organization_invite_create",
              "organization_invite_delete",
              "organization_member_join",
              "organization_member_add",
              "organization_member_leave",
              "organization_member_delete",
              "organization_member_update_role",
              "organization_member_update_mfa_method",
              "user_login",
              "user_login_failed",
              "user_logout",
              "key_create",
              "key_delete",
              "openapi_key_update",
              "service_create",
              "service_start",
              "service_stop",
              "service_awaken",
              "service_partially_running",
              "service_delete",
              "service_update_name",
              "service_update_ip_access_list",
              "service_update_autoscaling_memory",
              "service_update_autoscaling_idling",
              "service_update_password",
              "service_update_autoscaling_replicas",
              "service_update_max_allowable_replicas",
              "service_update_backup_configuration",
              "service_restore_backup",
              "service_update_release_channel",
              "service_update_gpt_usage_consent",
              "service_update_private_endpoints",
              "service_import_to_organization",
              "service_export_from_organization",
              "service_maintenance_start",
              "service_maintenance_end",
              "service_update_core_dump",
              "backup_delete"
            ]
          },
          "actorType": {
            "description": "Type of the actor: 'user', 'support', 'system', 'api'.",
            "type": "string",
            "enum": [
              "user",
              "support",
              "system",
              "api"
            ]
          },
          "actorId": {
            "description": "Unique actor ID.",
            "type": "string"
          },
          "actorDetails": {
            "description": "Additional information about the actor.",
            "type": "string"
          },
          "actorIpAddress": {
            "description": "IP address of the actor. Defined for 'user' and 'api' actor types.",
            "type": "string"
          },
          "organizationId": {
            "description": "Scope of the activity: organization ID this activity is related to.",
            "type": "string"
          },
          "serviceId": {
            "description": "Scope of the activity: service ID this activity is related to.",
            "type": "string"
          },
          "userAgent": {
            "description": "User agent of the actor",
            "type": "string"
          }
        }
      },
      "AwsBackupBucket": {
        "properties": {
          "id": {
            "description": "Unique backup bucket ID",
            "type": "string",
            "format": "uuid"
          },
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AWS"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "iamRoleArn": {
            "description": "AWS Role ARN",
            "type": "string"
          },
          "iamRoleSessionName": {
            "description": "AWS  Role session name",
            "type": "string"
          }
        }
      },
      "GcpBackupBucket": {
        "properties": {
          "id": {
            "description": "Unique backup bucket ID",
            "type": "string",
            "format": "uuid"
          },
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "GCP"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "accessKeyId": {
            "description": "Access Key ID (HMAC key)",
            "type": "string"
          }
        }
      },
      "AzureBackupBucket": {
        "properties": {
          "id": {
            "description": "Unique backup bucket ID.",
            "type": "string",
            "format": "uuid"
          },
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AZURE"
            ]
          },
          "containerName": {
            "description": "Container Name",
            "type": "string"
          }
        }
      },
      "BackupBucket": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/AwsBackupBucket"
          },
          {
            "$ref": "#/components/schemas/GcpBackupBucket"
          },
          {
            "$ref": "#/components/schemas/AzureBackupBucket"
          }
        ]
      },
      "AwsBackupBucketProperties": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AWS"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "iamRoleArn": {
            "description": "AWS IAM Role",
            "type": "string"
          },
          "iamRoleSessionName": {
            "description": "AWS IAM Role",
            "type": "string"
          }
        }
      },
      "GcpBackupBucketProperties": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "GCP"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "accessKeyId": {
            "description": "Access Key ID (HMAC key)",
            "type": "string"
          }
        }
      },
      "AzureBackupBucketProperties": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AZURE"
            ]
          },
          "containerName": {
            "description": "Container Name",
            "type": "string"
          }
        }
      },
      "BackupBucketProperties": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/AwsBackupBucketProperties"
          },
          {
            "$ref": "#/components/schemas/GcpBackupBucketProperties"
          },
          {
            "$ref": "#/components/schemas/AzureBackupBucketProperties"
          }
        ]
      },
      "AwsBackupBucketPostRequestV1": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AWS"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "iamRoleArn": {
            "description": "AWS Role ARN",
            "type": "string"
          },
          "iamRoleSessionName": {
            "description": "AWS Role session name",
            "type": "string"
          }
        }
      },
      "GcpBackupBucketPostRequestV1": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "GCP"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "accessKeyId": {
            "description": "Access Key ID (HMAC key)",
            "type": "string"
          },
          "secretAccessKey": {
            "description": "Secret Access Key (HMAC secret key)",
            "type": "string"
          }
        }
      },
      "AzureBackupBucketPostRequestV1": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AZURE"
            ]
          },
          "containerName": {
            "description": "Container Name",
            "type": "string"
          },
          "connectionString": {
            "description": "Connection String",
            "type": "string"
          }
        }
      },
      "BackupBucketPostRequest": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/AwsBackupBucketPostRequestV1"
          },
          {
            "$ref": "#/components/schemas/GcpBackupBucketPostRequestV1"
          },
          {
            "$ref": "#/components/schemas/AzureBackupBucketPostRequestV1"
          }
        ]
      },
      "AwsBackupBucketPatchRequestV1": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AWS"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "iamRoleArn": {
            "description": "AWS Role ARN",
            "type": "string"
          },
          "iamRoleSessionName": {
            "description": "AWS IAM Role session name",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "GcpBackupBucketPatchRequestV1": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "GCP"
            ]
          },
          "bucketPath": {
            "description": "Bucket path",
            "type": "string"
          },
          "accessKeyId": {
            "description": "Access Key ID (HMAC key)",
            "type": "string"
          },
          "secretAccessKey": {
            "description": "Secret Access Key (HMAC secret key)",
            "type": "string"
          }
        }
      },
      "AzureBackupBucketPatchRequestV1": {
        "properties": {
          "bucketProvider": {
            "description": "Bucket provider",
            "type": "string",
            "enum": [
              "AZURE"
            ]
          },
          "containerName": {
            "description": "Container Name",
            "type": "string"
          },
          "connectionString": {
            "description": "Connection String",
            "type": "string"
          }
        }
      },
      "BackupBucketPatchRequest": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/AwsBackupBucketPatchRequestV1"
          },
          {
            "$ref": "#/components/schemas/GcpBackupBucketPatchRequestV1"
          },
          {
            "$ref": "#/components/schemas/AzureBackupBucketPatchRequestV1"
          }
        ]
      },
      "BackupConfiguration": {
        "properties": {
          "backupPeriodInHours": {
            "description": "The interval in hours between each backup.",
            "type": "number"
          },
          "backupRetentionPeriodInHours": {
            "description": "The minimum duration in hours for which the backups are available.",
            "type": "number"
          },
          "backupStartTime": {
            "description": "The time in HH:MM format for the backups to be performed (evaluated in UTC timezone). When defined the backup period resets to every 24 hours.",
            "type": "string"
          }
        }
      },
      "Backup": {
        "properties": {
          "id": {
            "description": "Unique backup ID.",
            "type": "string",
            "format": "uuid"
          },
          "status": {
            "description": "Status of the backup: 'done', 'error', 'in_progress'.",
            "type": "string",
            "enum": [
              "done",
              "error",
              "in_progress"
            ]
          },
          "serviceId": {
            "description": "Name ",
            "type": "string"
          },
          "startedAt": {
            "description": "Backup start timestamp. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "finishedAt": {
            "description": "Backup finish timestamp. ISO-8601. Available only for finished backups",
            "type": "string",
            "format": "date-time"
          },
          "sizeInBytes": {
            "description": "Size of the backup in bytes.",
            "type": "number"
          },
          "durationInSeconds": {
            "description": "Time in seconds it took to perform the backup. If the status still in_progress, this is the time in seconds since the backup started until now.",
            "type": "number"
          },
          "type": {
            "description": "Backup type (\"full\" or \"incremental\").",
            "type": "string",
            "enum": [
              "full",
              "incremental"
            ]
          },
          "backupName": {
            "description": "Backup name on the external backup bucket.",
            "type": "string"
          },
          "bucket": {
            "description": "Backup bucket where the backup is stored.",
            "oneOf": [
              {
                "$ref": "#/components/schemas/AwsBackupBucketProperties"
              },
              {
                "$ref": "#/components/schemas/GcpBackupBucketProperties"
              },
              {
                "$ref": "#/components/schemas/AzureBackupBucketProperties"
              }
            ]
          }
        }
      },
      "CreateReversePrivateEndpoint": {
        "properties": {
          "description": {
            "description": "Reverse private endpoint description. Maximum length is 255 characters.",
            "type": "string",
            "example": "My reverse private endpoint"
          },
          "type": {
            "description": "Reverse private endpoint type.",
            "type": "string",
            "enum": [
              "VPC_ENDPOINT_SERVICE",
              "VPC_RESOURCE",
              "MSK_MULTI_VPC"
            ],
            "example": "VPC_ENDPOINT_SERVICE"
          },
          "vpcEndpointServiceName": {
            "description": "VPC endpoint service name.",
            "nullable": true,
            "type": "string",
            "example": "com.amazonaws.vpce.us-east-1.vpce-svc-12345678901234567"
          },
          "vpcResourceConfigurationId": {
            "description": "VPC resource configuration ID. Required for VPC_RESOURCE type.",
            "nullable": true,
            "type": "string",
            "example": "rcfg-12345678901234567"
          },
          "vpcResourceShareArn": {
            "description": "VPC resource share ARN. Required for VPC_RESOURCE type.",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:ram:us-east-1:123456789012:resource-share/share-12345678901234567"
          },
          "mskClusterArn": {
            "description": "MSK cluster ARN. Required for MSK_MULTI_VPC type.",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster"
          },
          "mskAuthentication": {
            "description": "MSK cluster authentication type. Required for MSK_MULTI_VPC type.",
            "nullable": true,
            "type": "string",
            "enum": [
              "SASL_IAM",
              "SASL_SCRAM"
            ],
            "example": "SASL_IAM"
          }
        }
      },
      "ReversePrivateEndpoint": {
        "properties": {
          "description": {
            "description": "Reverse private endpoint description. Maximum length is 255 characters.",
            "type": "string",
            "example": "My reverse private endpoint"
          },
          "type": {
            "description": "Reverse private endpoint type.",
            "type": "string",
            "enum": [
              "VPC_ENDPOINT_SERVICE",
              "VPC_RESOURCE",
              "MSK_MULTI_VPC"
            ],
            "example": "VPC_ENDPOINT_SERVICE"
          },
          "vpcEndpointServiceName": {
            "description": "VPC endpoint service name.",
            "nullable": true,
            "type": "string",
            "example": "com.amazonaws.vpce.us-east-1.vpce-svc-12345678901234567"
          },
          "vpcResourceConfigurationId": {
            "description": "VPC resource configuration ID. Required for VPC_RESOURCE type.",
            "nullable": true,
            "type": "string",
            "example": "rcfg-12345678901234567"
          },
          "vpcResourceShareArn": {
            "description": "VPC resource share ARN. Required for VPC_RESOURCE type.",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:ram:us-east-1:123456789012:resource-share/share-12345678901234567"
          },
          "mskClusterArn": {
            "description": "MSK cluster ARN. Required for MSK_MULTI_VPC type.",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster"
          },
          "mskAuthentication": {
            "description": "MSK cluster authentication type. Required for MSK_MULTI_VPC type.",
            "nullable": true,
            "type": "string",
            "enum": [
              "SASL_IAM",
              "SASL_SCRAM"
            ],
            "example": "SASL_IAM"
          },
          "id": {
            "description": "Reverse private endpoint ID.",
            "type": "string",
            "format": "uuid",
            "example": "12345678-1234-1234-1234-123456789012"
          },
          "serviceId": {
            "description": "ClickHouse service ID reverse private endpoint is associated with.",
            "type": "string",
            "format": "uuid",
            "example": "12345678-1234-1234-1234-123456789012"
          },
          "endpointId": {
            "description": "Reverse private endpoint endpoint ID.",
            "type": "string",
            "example": "vpce-12345678901234567"
          },
          "dnsNames": {
            "type": "array",
            "description": "Reverse private endpoint internal DNS names.",
            "items": {
              "type": "string"
            }
          },
          "privateDnsNames": {
            "type": "array",
            "description": "Reverse private endpoint private DNS names.",
            "items": {
              "type": "string"
            }
          },
          "status": {
            "description": "Reverse private endpoint status.",
            "type": "string",
            "enum": [
              "Unknown",
              "Provisioning",
              "Deleting",
              "Ready",
              "Failed",
              "PendingAcceptance",
              "Rejected",
              "Expired"
            ],
            "example": "Ready"
          }
        }
      },
      "Member": {
        "properties": {
          "userId": {
            "description": "Unique user ID. If a user is a member in multiple organizations this ID will stay the same.",
            "type": "string"
          },
          "name": {
            "description": "Name of the member as set a personal user profile.",
            "type": "string"
          },
          "email": {
            "description": "Email of the member as set in personal user profile.",
            "type": "string",
            "format": "email"
          },
          "role": {
            "description": "Role of the member in the organization.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ]
          },
          "joinedAt": {
            "description": "Timestamp the member joined the organization. ISO-8601.",
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "Invitation": {
        "properties": {
          "role": {
            "description": "Role of the member in the organization.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ]
          },
          "id": {
            "description": "Unique invitation ID.",
            "type": "string",
            "format": "uuid"
          },
          "email": {
            "description": "Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.",
            "type": "string",
            "format": "email"
          },
          "createdAt": {
            "description": "Invitation creation timestamp. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "expireAt": {
            "description": "Timestamp the invitation expires. ISO-8601.",
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "ApiKey": {
        "properties": {
          "id": {
            "description": "Unique API key ID.",
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "description": "Name of the key",
            "type": "string"
          },
          "state": {
            "description": "State of the key: 'enabled', 'disabled'.",
            "type": "string",
            "enum": [
              "enabled",
              "disabled"
            ]
          },
          "roles": {
            "type": "array",
            "description": "List of roles assigned to the key. Contains at least 1 element.",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "developer",
                "query_endpoints"
              ]
            }
          },
          "keySuffix": {
            "description": "Last 4 letters of the key.",
            "type": "string"
          },
          "createdAt": {
            "description": "Timestamp the key was created. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "expireAt": {
            "description": "Timestamp the key expires. If not present, `null` or is empty the key never expires. ISO-8601.",
            "nullable": true,
            "type": "string",
            "format": "date-time"
          },
          "usedAt": {
            "description": "Timestamp the key was used last time. If not present the key was never used. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "ipAccessList": {
            "type": "array",
            "description": "List of IP addresses allowed to access the API using this key",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          }
        }
      },
      "ApiKeyHashData": {
        "properties": {
          "keyIdHash": {
            "description": "Hash of the key ID. ",
            "type": "string"
          },
          "keyIdSuffix": {
            "description": "Last 4 digits of the key ID. Algorithm: echo -n \"yourpassword\" | sha256sum | tr -d '-' | xxd -r -p | base64",
            "type": "string"
          },
          "keySecretHash": {
            "description": "Hash of the key secret. Algorithm: echo -n \"yourpassword\" | sha256sum | tr -d '-' | xxd -r -p | base64",
            "type": "string"
          }
        }
      },
      "OrganizationPatchRequest": {
        "properties": {
          "name": {
            "description": "Name of the organization.",
            "type": "string"
          },
          "privateEndpoints": {
            "$ref": "#/components/schemas/OrganizationPrivateEndpointsPatch"
          }
        }
      },
      "InstanceServiceQueryApiEndpointsPostRequest": {
        "properties": {
          "roles": {
            "type": "array",
            "description": "The roles",
            "items": {
              "type": "string",
              "enum": [
                "sql_console_read_only",
                "sql_console_admin"
              ]
            }
          },
          "openApiKeys": {
            "type": "array",
            "description": "The version of the service query endpoint",
            "items": {
              "type": "string"
            }
          },
          "allowedOrigins": {
            "description": "The allowed origins as comma separated list of domains",
            "type": "string"
          }
        }
      },
      "ServicePostResponse": {
        "properties": {
          "service": {
            "$ref": "#/components/schemas/Service"
          },
          "password": {
            "description": "Password for the newly created service.",
            "type": "string"
          }
        }
      },
      "ServicePostRequest": {
        "properties": {
          "name": {
            "description": "Name of the service. Alphanumerical string with whitespaces up to 50 characters.",
            "type": "string"
          },
          "provider": {
            "description": "Cloud provider",
            "type": "string",
            "enum": [
              "aws",
              "gcp",
              "azure"
            ]
          },
          "region": {
            "description": "Service region.",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          },
          "tier": {
            "description": "DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
            "type": "string",
            "enum": [
              "development",
              "production",
              "dedicated_high_mem",
              "dedicated_high_cpu",
              "dedicated_standard",
              "dedicated_standard_n2d_standard_4",
              "dedicated_standard_n2d_standard_8",
              "dedicated_standard_n2d_standard_32",
              "dedicated_standard_n2d_standard_128",
              "dedicated_standard_n2d_standard_32_16SSD",
              "dedicated_standard_n2d_standard_64_24SSD"
            ],
            "deprecated": true
          },
          "ipAccessList": {
            "type": "array",
            "description": "List of IP addresses allowed to access the service",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          },
          "minTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 360,
            "deprecated": true
          },
          "minReplicaMemoryGb": {
            "description": "Minimum total memory of each replica during auto-scaling in Gb. Must be a multiple of 4 and greater than or equal to 8.",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum total memory of each replica during auto-scaling in Gb.  Must be a multiple of 4 and lower than or equal to 120* for non paid services or 356* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region. ",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 120
          },
          "numReplicas": {
            "description": "Number of replicas for the service. The number of replicas must be between 2 and 20 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers.",
            "type": "number",
            "minimum": 1,
            "maximum": 20,
            "example": 3
          },
          "idleScaling": {
            "description": "When set to true the service is allowed to scale down to zero when idle. True by default.",
            "type": "boolean"
          },
          "idleTimeoutMinutes": {
            "description": "Set minimum idling timeout (in minutes). Must be >= 5 minutes.",
            "type": "number"
          },
          "isReadonly": {
            "description": "True if this service is read-only. It can only be read-only if a dataWarehouseId is provided.",
            "type": "boolean"
          },
          "dataWarehouseId": {
            "description": "Data warehouse containing this service",
            "type": "string"
          },
          "backupId": {
            "description": "Optional backup ID used as an initial state for the new service. When used the region and the tier of the new instance must be the same as the values of the original instance.",
            "type": "string",
            "format": "uuid"
          },
          "encryptionKey": {
            "description": "Optional customer provided disk encryption key",
            "type": "string"
          },
          "encryptionAssumedRoleIdentifier": {
            "description": "Optional role to use for disk encryption",
            "type": "string"
          },
          "privateEndpointIds": {
            "type": "array",
            "description": "To associate the service with private endpoints, first create the service, then use the `Update Service Basic Details` endpoint to modify private endpoints.",
            "items": {
              "type": "string"
            },
            "deprecated": true
          },
          "privatePreviewTermsChecked": {
            "description": "Accept the private preview terms and conditions. It is only needed when creating the first service in the organization in case of a private preview",
            "type": "boolean"
          },
          "releaseChannel": {
            "description": "Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
            "type": "string",
            "enum": [
              "slow",
              "default",
              "fast"
            ]
          },
          "byocId": {
            "description": "This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232.",
            "type": "string"
          },
          "hasTransparentDataEncryption": {
            "description": "True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation.",
            "type": "boolean"
          },
          "endpoints": {
            "type": "array",
            "description": "List of service endpoints to enable or disable",
            "items": {
              "$ref": "#/components/schemas/ServiceEndpointChange"
            }
          },
          "profile": {
            "description": "Custom instance profile. Only available for ENTERPRISE organization tiers.",
            "type": "string",
            "enum": [
              "v1-default",
              "v1-highmem-xs",
              "v1-highmem-s",
              "v1-highmem-m",
              "v1-highmem-l",
              "v1-highmem-xl",
              "v1-highcpu-s",
              "v1-highcpu-m",
              "v1-highcpu-l",
              "v1-highcpu-xl"
            ]
          },
          "complianceType": {
            "description": "Type of regulatory compliance for service.",
            "type": "string",
            "enum": [
              "hipaa",
              "pci"
            ]
          }
        }
      },
      "ServicePatchRequest": {
        "properties": {
          "name": {
            "description": "Name of the service. Alphanumerical string with whitespaces up to 50 characters.",
            "type": "string"
          },
          "ipAccessList": {
            "$ref": "#/components/schemas/IpAccessListPatch"
          },
          "privateEndpointIds": {
            "$ref": "#/components/schemas/InstancePrivateEndpointsPatch"
          },
          "releaseChannel": {
            "description": "Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
            "type": "string",
            "enum": [
              "slow",
              "default",
              "fast"
            ]
          },
          "endpoints": {
            "type": "array",
            "description": "List of service endpoints to change",
            "items": {
              "$ref": "#/components/schemas/ServiceEndpointChange"
            }
          },
          "transparentDataEncryptionKeyId": {
            "description": "The id of the key to rotate",
            "type": "string"
          }
        }
      },
      "ServiceStatePatchRequest": {
        "properties": {
          "command": {
            "description": "Command to change the state: 'start', 'stop'.",
            "type": "string",
            "enum": [
              "start",
              "stop"
            ]
          }
        }
      },
      "ServiceScalingPatchRequest": {
        "properties": {
          "minTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 360,
            "deprecated": true
          },
          "numReplicas": {
            "description": "Number of replicas for the service. The number of replicas must be between 2 and 20 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers.",
            "type": "number",
            "minimum": 1,
            "maximum": 20,
            "example": 3
          },
          "idleScaling": {
            "description": "When set to true the service is allowed to scale down to zero when idle. True by default.",
            "type": "boolean"
          },
          "idleTimeoutMinutes": {
            "description": "Set minimum idling timeout (in minutes). Must be >= 5 minutes.",
            "type": "number"
          }
        }
      },
      "ServiceScalingPatchResponse": {
        "properties": {
          "id": {
            "description": "Unique service ID.",
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "description": "Name of the service. Alphanumerical string with whitespaces up to 50 characters.",
            "type": "string"
          },
          "provider": {
            "description": "Cloud provider",
            "type": "string",
            "enum": [
              "aws",
              "gcp",
              "azure"
            ]
          },
          "region": {
            "description": "Service region.",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          },
          "state": {
            "description": "Current state of the service.",
            "type": "string",
            "enum": [
              "starting",
              "stopping",
              "terminating",
              "awaking",
              "partially_running",
              "provisioning",
              "running",
              "stopped",
              "terminated",
              "degraded",
              "failed",
              "idle"
            ]
          },
          "clickhouseVersion": {
            "description": "ClickHouse version of the service.",
            "type": "string"
          },
          "endpoints": {
            "type": "array",
            "description": "List of all service endpoints.",
            "items": {
              "$ref": "#/components/schemas/ServiceEndpoint"
            }
          },
          "tier": {
            "description": "DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
            "type": "string",
            "enum": [
              "development",
              "production",
              "dedicated_high_mem",
              "dedicated_high_cpu",
              "dedicated_standard",
              "dedicated_standard_n2d_standard_4",
              "dedicated_standard_n2d_standard_8",
              "dedicated_standard_n2d_standard_32",
              "dedicated_standard_n2d_standard_128",
              "dedicated_standard_n2d_standard_32_16SSD",
              "dedicated_standard_n2d_standard_64_24SSD"
            ],
            "deprecated": true
          },
          "minTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 360,
            "deprecated": true
          },
          "minReplicaMemoryGb": {
            "description": "Minimum auto-scaling memory in Gb for a single replica. Available only for 'production' services. Must be a multiple of 4 and greater than or equal to 8.",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum auto-scaling memory in Gb for a single replica . Available only for 'production' services. Must be a multiple of 4 and lower than or equal to 120 for non paid services or 356 for paid services.",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 120
          },
          "numReplicas": {
            "description": "Number of replicas for the service. The number of replicas must be between 2 and 20 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers.",
            "type": "number",
            "minimum": 1,
            "maximum": 20,
            "example": 3
          },
          "idleScaling": {
            "description": "When set to true the service is allowed to scale down to zero when idle. True by default.",
            "type": "boolean"
          },
          "idleTimeoutMinutes": {
            "description": "Set minimum idling timeout (in minutes). Must be >= 5 minutes.",
            "type": "number"
          },
          "ipAccessList": {
            "type": "array",
            "description": "List of IP addresses allowed to access the service",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          },
          "createdAt": {
            "description": "Service creation timestamp. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "encryptionKey": {
            "description": "Optional customer provided disk encryption key",
            "type": "string"
          },
          "encryptionAssumedRoleIdentifier": {
            "description": "Optional role to use for disk encryption",
            "type": "string"
          },
          "iamRole": {
            "description": "IAM role used for accessing objects in s3",
            "type": "string"
          },
          "privateEndpointIds": {
            "type": "array",
            "description": "List of private endpoints",
            "items": {
              "type": "string"
            }
          },
          "availablePrivateEndpointIds": {
            "type": "array",
            "description": "List of available private endpoints ids that can be attached to the service",
            "items": {
              "type": "string"
            }
          },
          "dataWarehouseId": {
            "description": "Data warehouse containing this service",
            "type": "string"
          },
          "isPrimary": {
            "description": "True if this service is the primary service in the data warehouse",
            "type": "boolean"
          },
          "isReadonly": {
            "description": "True if this service is read-only. It can only be read-only if a dataWarehouseId is provided.",
            "type": "boolean"
          },
          "releaseChannel": {
            "description": "Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
            "type": "string",
            "enum": [
              "slow",
              "default",
              "fast"
            ]
          },
          "byocId": {
            "description": "This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232.",
            "type": "string"
          },
          "hasTransparentDataEncryption": {
            "description": "True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation.",
            "type": "boolean"
          },
          "profile": {
            "description": "Custom instance profile. Only available for ENTERPRISE organization tiers.",
            "type": "string",
            "enum": [
              "v1-default",
              "v1-highmem-xs",
              "v1-highmem-s",
              "v1-highmem-m",
              "v1-highmem-l",
              "v1-highmem-xl",
              "v1-highcpu-s",
              "v1-highcpu-m",
              "v1-highcpu-l",
              "v1-highcpu-xl"
            ]
          },
          "transparentDataEncryptionKeyId": {
            "description": "The ID of the Transparent Data Encryption key used for the service. This is only available if hasTransparentDataEncryption is true.",
            "type": "string"
          },
          "encryptionRoleId": {
            "description": "The ID of the IAM role used for encryption. This is only available if hasTransparentDataEncryption is true.",
            "type": "string"
          },
          "complianceType": {
            "description": "Type of regulatory compliance for service.",
            "type": "string",
            "enum": [
              "hipaa",
              "pci"
            ]
          }
        }
      },
      "ServiceReplicaScalingPatchRequest": {
        "properties": {
          "minReplicaMemoryGb": {
            "description": "Minimum auto-scaling memory in Gb for a single replica. Available only for 'production' services. Must be a multiple of 4 and greater than or equal to 8.",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum auto-scaling memory in Gb for a single replica . Available only for 'production' services. Must be a multiple of 4 and lower than or equal to 120 for non paid services or 356 for paid services.",
            "type": "number",
            "minimum": 8,
            "maximum": 356,
            "multipleOf": 4,
            "example": 120
          },
          "numReplicas": {
            "description": "Number of replicas for the service. The number of replicas must be between 2 and 20 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers.",
            "type": "number",
            "minimum": 1,
            "maximum": 20,
            "example": 3
          },
          "idleScaling": {
            "description": "When set to true the service is allowed to scale down to zero when idle. True by default.",
            "type": "boolean"
          },
          "idleTimeoutMinutes": {
            "description": "Set minimum idling timeout (in minutes). Must be >= 5 minutes.",
            "type": "number"
          }
        }
      },
      "ServicePasswordPatchResponse": {
        "properties": {
          "password": {
            "description": "New service password. Provided only if there was no 'newPasswordHash' in the request",
            "type": "string"
          }
        }
      },
      "ServicePasswordPatchRequest": {
        "properties": {
          "newPasswordHash": {
            "description": "Optional password hash. Used to avoid password transmission over network. If not provided a new password is generated and is provided in the response. Otherwise this hash is used. Algorithm: echo -n \"yourpassword\" | sha256sum | tr -d '-' | xxd -r -p | base64",
            "type": "string"
          },
          "newDoubleSha1Hash": {
            "description": "Optional double SHA1 password hash for MySQL protocol. If newPasswordHash is not provided this key will be ignored and the generated password will be used. Algorithm: echo -n \"yourpassword\" | sha1sum | tr -d '-' | xxd -r -p | sha1sum | tr -d '-'",
            "type": "string"
          }
        }
      },
      "ServicPrivateEndpointePostRequest": {
        "properties": {
          "id": {
            "description": "Private endpoint identifier",
            "type": "string"
          },
          "description": {
            "description": "Description of private endpoint",
            "type": "string"
          }
        }
      },
      "BackupConfigurationPatchRequest": {
        "properties": {
          "backupPeriodInHours": {
            "description": "The interval in hours between each backup.",
            "type": "number"
          },
          "backupRetentionPeriodInHours": {
            "description": "The minimum duration in hours for which the backups are available.",
            "type": "number"
          },
          "backupStartTime": {
            "description": "The time in HH:MM format for the backups to be performed (evaluated in UTC timezone). When defined the backup period resets to every 24 hours.",
            "type": "string"
          }
        }
      },
      "ApiKeyPostResponse": {
        "properties": {
          "key": {
            "$ref": "#/components/schemas/ApiKey"
          },
          "keyId": {
            "description": "Generated key ID. Provided only if there was no 'hashData' in the request.",
            "type": "string"
          },
          "keySecret": {
            "description": "Generated key secret. Provided only if there was no 'hashData' in the request.",
            "type": "string"
          }
        }
      },
      "ApiKeyPostRequest": {
        "properties": {
          "name": {
            "description": "Name of the key.",
            "type": "string"
          },
          "expireAt": {
            "description": "Timestamp the key expires. If not present, `null` or is empty the key never expires. ISO-8601.",
            "nullable": true,
            "type": "string",
            "format": "date-time"
          },
          "state": {
            "description": "Initial state of the key: 'enabled', 'disabled'. If not provided the new key will be 'enabled'.",
            "type": "string",
            "enum": [
              "enabled",
              "disabled"
            ]
          },
          "hashData": {
            "$ref": "#/components/schemas/ApiKeyHashData"
          },
          "roles": {
            "type": "array",
            "description": "List of roles assigned to the key. Contains at least 1 element.",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "developer",
                "query_endpoints"
              ]
            }
          },
          "ipAccessList": {
            "type": "array",
            "description": "List of IP addresses allowed to access the API using this key",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          }
        }
      },
      "ApiKeyPatchRequest": {
        "properties": {
          "name": {
            "description": "Name of the key",
            "type": "string"
          },
          "roles": {
            "type": "array",
            "description": "List of roles assigned to the key. Contains at least 1 element.",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "developer",
                "query_endpoints"
              ]
            }
          },
          "expireAt": {
            "description": "Timestamp the key expires. If `null` or is empty the key never expires. ISO-8601.",
            "nullable": true,
            "type": "string",
            "format": "date-time"
          },
          "state": {
            "description": "State of the key: 'enabled', 'disabled'.",
            "type": "string",
            "enum": [
              "enabled",
              "disabled"
            ]
          },
          "ipAccessList": {
            "type": "array",
            "description": "List of IP addresses allowed to access the API using this key",
            "items": {
              "$ref": "#/components/schemas/IpAccessListEntry"
            }
          }
        }
      },
      "MemberPatchRequest": {
        "properties": {
          "role": {
            "description": "Role of the member in the organization.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ]
          }
        }
      },
      "InvitationPostRequest": {
        "properties": {
          "email": {
            "description": "Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.",
            "type": "string",
            "format": "email"
          },
          "role": {
            "description": "Role of the member in the organization.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ]
          }
        }
      },
      "ClickPipePostRequest": {
        "properties": {
          "name": {
            "description": "Name of the ClickPipe.",
            "type": "string"
          },
          "source": {
            "$ref": "#/components/schemas/ClickPipePostSource"
          },
          "destination": {
            "$ref": "#/components/schemas/ClickPipeMutateDestination"
          },
          "fieldMappings": {
            "type": "array",
            "description": "Field mappings of the ClickPipe. Note that all destination columns must be included in the mappings.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeFieldMapping"
            }
          },
          "scaling": {
            "$ref": "#/components/schemas/ClickPipeScaling"
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipeSettings"
          }
        }
      },
      "ClickPipePatchRequest": {
        "properties": {
          "name": {
            "description": "Name of the ClickPipe.",
            "nullable": true,
            "type": "string"
          },
          "source": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePatchSource"
              }
            ],
            "nullable": true
          },
          "destination": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipePatchDestination"
              }
            ],
            "nullable": true
          },
          "fieldMappings": {
            "type": "array",
            "description": "Field mappings of the ClickPipe. This will not update the table schema, only the ClickPipe configuration.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeFieldMapping"
            }
          },
          "settings": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeSettings"
              }
            ],
            "nullable": true
          }
        }
      },
      "ClickPipeScalingPatchRequest": {
        "properties": {
          "replicas": {
            "description": "Number of replicas to scale to. Use to scale Kafka pipes.",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 10
          },
          "concurrency": {
            "description": "Number of concurrency to scale to. Use to scale S3 pipes.",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 34
          },
          "replicaCpuMillicores": {
            "description": "CPU in millicores for each replica. Use to scale streaming pipes.",
            "nullable": true,
            "type": "integer",
            "minimum": 125,
            "maximum": 2000
          },
          "replicaMemoryGb": {
            "description": "Memory in GB for each replica. Use to scale streaming pipes.",
            "nullable": true,
            "type": "number",
            "minimum": 0.5,
            "maximum": 8
          }
        }
      },
      "ClickPipeStatePatchRequest": {
        "properties": {
          "command": {
            "description": "Command to change the state: 'start', 'stop', 'resync'.",
            "type": "string",
            "enum": [
              "start",
              "stop",
              "resync"
            ]
          }
        }
      },
      "ClickPipesCdcScalingPatchRequest": {
        "properties": {
          "replicaCpuMillicores": {
            "description": "CPU in millicores for DB ClickPipes.",
            "type": "integer",
            "minimum": 1000,
            "maximum": 24000,
            "multipleOf": 1000,
            "example": 2000
          },
          "replicaMemoryGb": {
            "description": "Memory in GiB for DB ClickPipes. Must be 4× the CPU core count.",
            "type": "number",
            "minimum": 4,
            "maximum": 96,
            "multipleOf": 4,
            "example": 8
          }
        }
      },
      "ByocInfrastructurePostRequest": {
        "properties": {
          "regionId": {
            "description": "Region in which the BYOC infrastructure will be located",
            "type": "string",
            "enum": [
              "ap-northeast-1",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral"
            ]
          },
          "accountId": {
            "description": "Cloud account ID the BYOC infrastructure is configured for",
            "type": "string"
          },
          "availabilityZoneSuffixes": {
            "type": "array",
            "description": "List of availability zone suffixes",
            "items": {
              "type": "string",
              "enum": [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f"
              ]
            }
          },
          "vpcCidrRange": {
            "description": "CIDR range for VPC",
            "type": "string"
          }
        }
      }
    },
    "securitySchemes": {
      "basicAuth": {
        "type": "http",
        "scheme": "basic",
        "description": "Use key ID and key secret obtained in ClickHouse Cloud console: https://clickhouse.com/docs/cloud/manage/openapi"
      }
    }
  },
  "security": [
    {
      "basicAuth": []
    }
  ],
  "tags": [
    {
      "name": "Organization"
    },
    {
      "name": "User management"
    },
    {
      "name": "Billing"
    },
    {
      "name": "Service"
    },
    {
      "name": "Backup"
    },
    {
      "name": "OpenAPI"
    },
    {
      "name": "Prometheus"
    },
    {
      "name": "ClickPipes"
    }
  ],
  "x-tagGroups": [
    {
      "name": "Organization",
      "tags": [
        "Organization",
        "Billing",
        "User management"
      ]
    },
    {
      "name": "Service",
      "tags": [
        "Service",
        "Backup"
      ]
    },
    {
      "name": "OpenAPI",
      "tags": [
        "OpenAPI"
      ]
    },
    {
      "name": "Prometheus",
      "tags": [
        "Prometheus"
      ]
    },
    {
      "name": "ClickPipes",
      "tags": [
        "ClickPipes"
      ]
    }
  ]
} as const;