/* eslint-disable */ export default {
  "openapi": "3.0.1",
  "info": {
    "title": "OpenAPI spec for ClickHouse Cloud",
    "version": "1.0",
    "contact": {
      "name": "ClickHouse Support",
      "url": "https://clickhouse.com/docs/en/cloud/manage/openapi?referrer=openapi-530492",
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
        "operationId": "organizationGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "organizationGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Organization"
        ]
      },
      "patch": {
        "summary": "Update organization details",
        "description": "Updates organization fields. Requires ADMIN auth key role.",
        "operationId": "organizationUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "organizationPrometheusGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instanceGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Service"
        ]
      },
      "post": {
        "summary": "Create new service",
        "description": "Creates a new service in the organization, and returns the current service state and a password to access the service. The service is started asynchronously.",
        "operationId": "instanceCreate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instanceGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Service"
        ]
      },
      "patch": {
        "summary": "Update service basic details",
        "description": "Updates basic service details like service name or IP access list.",
        "operationId": "instanceUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Service"
        ]
      },
      "delete": {
        "summary": "Delete service",
        "description": "Deletes the service. The service must be in stopped state and is deleted asynchronously after this method call.",
        "operationId": "instanceDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instancePrivateEndpointConfigGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "description": "Get the configuration for the service query endpoint that allows executing queries via API.",
        "operationId": "instanceQueryEndpointGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Service"
        ]
      },
      "delete": {
        "summary": "Delete the service query endpoint for a given instance",
        "description": "Removes the service query endpoint.",
        "operationId": "instanceQueryEndpointDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Service"
        ]
      },
      "post": {
        "summary": "Upsert the service query endpoint for a given instance",
        "description": "Create the service query endpoint that allows executing queries via API.",
        "operationId": "instanceQueryEndpointUpsert",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instanceStateUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instanceScalingUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instanceReplicaScalingUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instancePasswordUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instancePrivateEndpointCreate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "instancePrometheusGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "backupGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "backupGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "backupConfigurationGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Backup"
        ]
      },
      "patch": {
        "summary": "Update service backup configuration",
        "description": "Updates service backup configuration. Requires ADMIN auth key role. Setting the properties with null value, will reset the properties to theirs default values.",
        "operationId": "backupConfigurationUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Backup"
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/backupBucket": {
      "get": {
        "summary": "Get service backup bucket",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Returns the service backup bucket.",
        "operationId": "backupBucketGet",
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
                      "$ref": "#/components/schemas/BackupBucket"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Backup"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "post": {
        "summary": "Create service backup bucket",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Create service backup bucket. Requires ADMIN auth key role.",
        "operationId": "backupBucketCreate",
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
                "$ref": "#/components/schemas/BackupBucketPostRequest"
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
                      "$ref": "#/components/schemas/BackupBucket"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Backup"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "patch": {
        "summary": "Update service backup bucket",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Update service backup bucket. Requires ADMIN auth key role. The secrets of the specified bucket provider are always required",
        "operationId": "backupBucketUpdate",
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
                "$ref": "#/components/schemas/BackupBucketPatchRequest"
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
                      "$ref": "#/components/schemas/BackupBucket"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Backup"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "delete": {
        "summary": "Delete service backup bucket",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Delete service backup bucket. Requires ADMIN auth key role.",
        "operationId": "backupBucketDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Backup"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/keys": {
      "get": {
        "summary": "Get list of all keys",
        "description": "Returns a list of all keys in the organization.",
        "operationId": "openapiKeyGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "OpenAPI"
        ]
      },
      "post": {
        "summary": "Create key",
        "description": "Creates new API key.",
        "operationId": "openapiKeyCreate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "openapiKeyGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "OpenAPI"
        ]
      },
      "patch": {
        "summary": "Update key",
        "description": "Updates API key properties.",
        "operationId": "openapiKeyUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "OpenAPI"
        ]
      },
      "delete": {
        "summary": "Delete key",
        "description": "Deletes API key. Only a key not used to authenticate the active request can be deleted.",
        "operationId": "openapiKeyDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "memberGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "memberGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "User management"
        ]
      },
      "patch": {
        "summary": "Update organization member",
        "description": "Updates organization member role.",
        "operationId": "memberUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "User management"
        ]
      },
      "delete": {
        "summary": "Remove an organization member",
        "description": "Removes a user from the organization",
        "operationId": "memberDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "invitationGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "User management"
        ]
      },
      "post": {
        "summary": "Create an invitation",
        "description": "Creates organization invitation.",
        "operationId": "invitationCreate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "invitationGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "User management"
        ]
      },
      "delete": {
        "summary": "Delete organization invitation",
        "description": "Deletes a single organization invitation.",
        "operationId": "invitationDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "activityGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "activityGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "usageCostGet",
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
          },
          {
            "in": "query",
            "name": "filter",
            "description": "Filter criteria to apply when retrieving the usage cost report. Currently, only filtering by resource tags is supported.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "example": "filter=tag:Environment=Production&filter=tag:Department=Engineering&filter=tag:isActive"
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeCreate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeSettingsGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeSettingsUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "summary": "Update ClickPipe scaling",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Change scaling settings for the specified ClickPipe. This endpoint supports Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob).\n\n**Note:** For database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery), use the [Update CDC ClickPipes scaling](#tag/ClickPipes/operation/clickPipeCdcScalingUpdate) endpoint instead.",
        "operationId": "clickPipeScalingUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeStateUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Get scaling settings for database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery).\n\nThe infrastructure is shared between all database ClickPipes in the service, both for initial load and CDC. For billing purposes, 2 CPU cores and 8 GB of RAM [correspond](https://clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit.\n\n**Note:** For Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob), see [Get ClickPipe](#tag/ClickPipes/operation/clickPipeGet).\n\n**This endpoint becomes available once at least one database ClickPipe was provisioned.**",
        "operationId": "clickPipeCdcScalingGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> Update scaling settings for database ClickPipes (PostgreSQL, MySQL, MongoDB, BigQuery).\n\nThe infrastructure is shared between all database ClickPipes in the service, both for initial load and CDC. Scaling settings may take a few minutes to fully propagate.\n\nFor billing purposes, 2 CPU cores and 8 GB of RAM [correspond](https://clickhouse.com/docs/cloud/manage/billing/overview#clickpipes-for-postgres-cdc) to one compute unit. If your organization tier changes, database ClickPipes will be [rescaled](https://clickhouse.com/docs/cloud/manage/billing/overview#compute) appropriately.\n\n**Note:** For Kafka, Kinesis, and object storage pipes (S3, GCS, Azure Blob), see [Get ClickPipe](#tag/ClickPipes/operation/clickPipeGet).\n\n**This endpoint becomes available once at least one database ClickPipe was provisioned.**",
        "operationId": "clickPipeCdcScalingUpdate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
    "/v1/organizations/{organizationId}/services/{serviceId}/clickstack/dashboards": {
      "get": {
        "summary": "ClickStack: List Dashboards",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Retrieves a list of all dashboards for the authenticated team",
        "operationId": "clickStackListDashboards",
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
            "description": "ID of the ClickStack service.",
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
                        "$ref": "#/components/schemas/ClickStackDashboardResponse"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "post": {
        "summary": "ClickStack: Create Dashboard",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Creates a new dashboard",
        "operationId": "clickStackCreateDashboard",
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
            "description": "ID of the ClickStack service.",
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
                "$ref": "#/components/schemas/ClickStackCreateDashboardRequest"
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
                      "$ref": "#/components/schemas/ClickStackDashboardResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickstack/dashboards/{clickStackDashboardId}": {
      "get": {
        "summary": "ClickStack: Get Dashboard",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Retrieves a specific dashboard by ID",
        "operationId": "clickStackGetDashboard",
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
            "description": "ID of the ClickStack service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickStackDashboardId",
            "description": "ClickStack Dashboard ID",
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
                      "$ref": "#/components/schemas/ClickStackDashboardResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "put": {
        "summary": "ClickStack: Update Dashboard",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Updates an existing dashboard",
        "operationId": "clickStackUpdateDashboard",
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
            "description": "ID of the ClickStack service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickStackDashboardId",
            "description": "ClickStack Dashboard ID",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickStackUpdateDashboardRequest"
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
                      "$ref": "#/components/schemas/ClickStackDashboardResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "delete": {
        "summary": "ClickStack: Delete Dashboard",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Deletes a dashboard",
        "operationId": "clickStackDeleteDashboard",
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
            "description": "ID of the ClickStack service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickStackDashboardId",
            "description": "ClickStack Dashboard ID",
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
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickstack/alerts": {
      "get": {
        "summary": "ClickStack: List Alerts",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Retrieves a list of all alerts for the authenticated team",
        "operationId": "clickStackListAlerts",
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
            "description": "ID of the ClickStack service.",
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
                        "$ref": "#/components/schemas/ClickStackAlertResponse"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "post": {
        "summary": "ClickStack: Create Alert",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Creates a new alert",
        "operationId": "clickStackCreateAlert",
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
            "description": "ID of the ClickStack service.",
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
                "$ref": "#/components/schemas/ClickStackCreateAlertRequest"
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
                      "$ref": "#/components/schemas/ClickStackAlertResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickstack/sources": {
      "get": {
        "summary": "ClickStack: List Sources",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Retrieves a list of all sources for the authenticated team",
        "operationId": "clickStackListSources",
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
            "description": "ID of the ClickStack service.",
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
                        "$ref": "#/components/schemas/ClickStackSource"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      }
    },
    "/v1/organizations/{organizationId}/services/{serviceId}/clickstack/alerts/{clickStackAlertId}": {
      "get": {
        "summary": "ClickStack: Get Alert",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Retrieves a specific alert by ID",
        "operationId": "clickStackGetAlert",
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
            "description": "ID of the ClickStack service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickStackAlertId",
            "description": "ClickStack Alert ID",
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
                      "$ref": "#/components/schemas/ClickStackAlertResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "put": {
        "summary": "ClickStack: Update Alert",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Updates an existing alert",
        "operationId": "clickStackUpdateAlert",
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
            "description": "ID of the ClickStack service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickStackAlertId",
            "description": "ClickStack Alert ID",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClickStackUpdateAlertRequest"
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
                      "$ref": "#/components/schemas/ClickStackAlertResponse"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
        ],
        "x-badges": [
          {
            "name": "Beta",
            "position": "after"
          }
        ]
      },
      "delete": {
        "summary": "ClickStack: Delete Alert",
        "description": "**This endpoint is in beta.** API contract is stable, and no breaking changes are expected in the future. <br /><br /> ClickStack: Deletes an alert",
        "operationId": "clickStackDeleteAlert",
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
            "description": "ID of the ClickStack service.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "in": "path",
            "name": "clickStackAlertId",
            "description": "ClickStack Alert ID",
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
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "ClickStack"
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
        "operationId": "organizationPrivateEndpointConfigGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "organizationByocInfrastructureCreate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "organizationByocInfrastructureDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
          }
        },
        "tags": [
          "Organization"
        ]
      },
      "patch": {
        "summary": "Update BYOC Infrastructure",
        "description": "Update configuration of the BYOC infrastructure. Returns the modified infrastructure",
        "operationId": "organizationByocInfrastructureUpdate",
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
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ByocInfrastructurePatchRequest"
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeReversePrivateEndpointGetList",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeReversePrivateEndpointCreate",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeReversePrivateEndpointGet",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
        "operationId": "clickPipeReversePrivateEndpointDelete",
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
            "description": "The request cannot be processed due to a client error. Please verify your request parameters and try again.",
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
          "INTERNAL_ERROR": {
            "description": "An internal server error has occurred. If this issue persists, please contact ClickHouse Cloud support for assistance.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "integer",
                      "description": "HTTP status code.",
                      "example": 500
                    },
                    "error": {
                      "type": "string",
                      "description": "Detailed error description."
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
            "description": "Database username.",
            "type": "string",
            "example": "postgres_user"
          },
          "password": {
            "description": "Database password.",
            "type": "string",
            "format": "password",
            "example": "your_secure_password"
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
      "ServiceAccount": {
        "properties": {
          "serviceAccountFile": {
            "description": "Google Cloud service account JSON key file content, base64 encoded.",
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
              "azureblobstorage",
              "cloudflarer2",
              "ovhobjectstorage"
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
              "TabSeparated",
              "TabSeparatedWithNames",
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
            "description": "Queue URL for event-based continuous ingestion. For S3, provide an SQS queue URL. For GCS, provide a Pub/Sub subscription (e.g. projects/{project}/subscriptions/{name}). When provided, files are ingested based on event notifications rather than lexicographical order. Only applicable when isContinuous is true and authentication is not public.",
            "nullable": true,
            "type": "string",
            "example": "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue"
          },
          "authentication": {
            "description": "Authentication method. IAM_USER is for S3, GCS, and DigitalOcean Spaces. IAM_ROLE is for S3 only. SERVICE_ACCOUNT is for GCS only. CONNECTION_STRING is for Azure Blob Storage. PUBLIC uses no authentication.",
            "nullable": true,
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER",
              "CONNECTION_STRING",
              "SERVICE_ACCOUNT"
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
              "azureblobstorage",
              "cloudflarer2",
              "ovhobjectstorage"
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
              "TabSeparated",
              "TabSeparatedWithNames",
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
            "description": "Queue URL for event-based continuous ingestion. For S3, provide an SQS queue URL. For GCS, provide a Pub/Sub subscription (e.g. projects/{project}/subscriptions/{name}). When provided, files are ingested based on event notifications rather than lexicographical order. Only applicable when isContinuous is true and authentication is not public.",
            "nullable": true,
            "type": "string",
            "example": "https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue"
          },
          "authentication": {
            "description": "Authentication method. IAM_USER is for S3, GCS, and DigitalOcean Spaces. IAM_ROLE is for S3 only. SERVICE_ACCOUNT is for GCS only. CONNECTION_STRING is for Azure Blob Storage. PUBLIC uses no authentication.",
            "nullable": true,
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER",
              "CONNECTION_STRING",
              "SERVICE_ACCOUNT"
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
          },
          "serviceAccountKey": {
            "description": "Base64-encoded GCP service account JSON key. Required when authentication is SERVICE_ACCOUNT.",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "ClickPipePatchObjectStorageSource": {
        "properties": {
          "authentication": {
            "description": "Authentication method. IAM_USER is for S3, GCS, and DigitalOcean Spaces. IAM_ROLE is for S3 only. SERVICE_ACCOUNT is for GCS only. CONNECTION_STRING is for Azure Blob Storage. PUBLIC uses no authentication.",
            "nullable": true,
            "type": "string",
            "enum": [
              "IAM_ROLE",
              "IAM_USER",
              "CONNECTION_STRING",
              "SERVICE_ACCOUNT"
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
          },
          "serviceAccountKey": {
            "description": "Base64-encoded GCP service account JSON key. Required when authentication is SERVICE_ACCOUNT.",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "ClickPipePostgresPipeSettings": {
        "properties": {
          "syncIntervalSeconds": {
            "description": "Interval in seconds to sync data from Postgres during CDC replication.",
            "type": "integer",
            "minimum": 1,
            "example": 60
          },
          "pullBatchSize": {
            "description": "Number of rows to pull in each batch during CDC replication.",
            "type": "integer",
            "minimum": 1,
            "example": 1000
          },
          "publicationName": {
            "description": "PostgreSQL publication name to use for CDC replication. If not provided, ClickPipes will create one automatically.",
            "type": "string",
            "example": "clickpipes_publication"
          },
          "replicationMode": {
            "description": "Replication mode: \"cdc\" (change data capture with initial snapshot), \"snapshot\" (one-time snapshot only), or \"cdc_only\" (CDC without initial snapshot).",
            "type": "string",
            "enum": [
              "cdc",
              "snapshot",
              "cdc_only"
            ],
            "example": "cdc"
          },
          "replicationSlotName": {
            "description": "PostgreSQL replication slot name. Only valid for \"cdc_only\" mode. For \"cdc\" mode, ClickPipes creates the slot automatically.",
            "type": "string",
            "example": "clickpipes_slot"
          },
          "allowNullableColumns": {
            "description": "Preserve nullability from Postgres in the destination ClickHouse table. When true, columns without NOT NULL constraints are created as Nullable(...). When false, all columns are non-nullable and NULL values are replaced with the default value for the type. Note: Nullable types have performance overhead in ClickHouse.",
            "type": "boolean",
            "example": false
          },
          "initialLoadParallelism": {
            "description": "Number of parallel workers to use per table in the initial snapshot phase.",
            "type": "integer",
            "minimum": 1,
            "example": 1
          },
          "snapshotNumRowsPerPartition": {
            "description": "Number of rows per partition during the snapshot phase.",
            "type": "integer",
            "minimum": 1000,
            "example": 100000
          },
          "snapshotNumberOfParallelTables": {
            "description": "Number of tables to snapshot in parallel during the initial load phase.",
            "type": "integer",
            "minimum": 1,
            "example": 1
          },
          "enableFailoverSlots": {
            "description": "Enable failover support for the replication slot on PG17 and newer. Only applicable when ClickPipes creates the replication slot (i.e., replicationSlotName is NOT provided).",
            "type": "boolean",
            "example": false
          },
          "deleteOnMerge": {
            "description": "Enable hard delete behavior in ReplacingMergeTree for PostgreSQL DELETE operations.",
            "type": "boolean",
            "example": false
          }
        }
      },
      "ClickPipePatchPostgresPipeSettings": {
        "properties": {
          "syncIntervalSeconds": {
            "description": "Interval in seconds to sync data from Postgres during CDC replication.",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "example": 60
          },
          "pullBatchSize": {
            "description": "Number of rows to pull in each batch during CDC replication.",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "example": 1000
          },
          "deleteOnMerge": {
            "description": "Enable hard delete behavior in ReplacingMergeTree for PostgreSQL DELETE operations.",
            "nullable": true,
            "type": "boolean",
            "example": false
          }
        }
      },
      "ClickPipePostgresPipeTableMapping": {
        "properties": {
          "sourceSchemaName": {
            "description": "PostgreSQL source schema name.",
            "type": "string",
            "example": "public"
          },
          "sourceTable": {
            "description": "PostgreSQL source table name.",
            "type": "string",
            "example": "users"
          },
          "targetTable": {
            "description": "ClickHouse target table name, optionally prefixed with schema name (e.g., \"my_schema_my_table\"). The table will be created automatically if it does not exist. For snapshot mode, the target table must be empty.",
            "type": "string",
            "example": "public_users"
          },
          "excludedColumns": {
            "type": "array",
            "description": "List of column names to exclude from replication. Column names must be unique within this list.",
            "items": {
              "type": "string"
            }
          },
          "useCustomSortingKey": {
            "description": "Whether to use a custom sorting key. If true, sortingKeys must be provided. If false or omitted, the default sorting key is the PostgreSQL primary key.",
            "type": "boolean",
            "example": false
          },
          "sortingKeys": {
            "type": "array",
            "description": "Ordered list of column names to use as the sorting (ORDER BY) key in ClickHouse. Only used when useCustomSortingKey is true. Column names must be unique within this list.",
            "items": {
              "type": "string"
            }
          },
          "tableEngine": {
            "description": "ClickHouse table engine: \"ReplacingMergeTree\" (handles updates/deletes), \"MergeTree\" (append-only), or \"Null\" (forward data to materialized views without storing it).",
            "type": "string",
            "enum": [
              "MergeTree",
              "ReplacingMergeTree",
              "Null"
            ],
            "example": "ReplacingMergeTree"
          },
          "partitionKey": {
            "description": "Custom partitioning column used for parallel snapshotting. Only beneficial for PostgreSQL 13 (no benefit for PG14+, which supports indexed ctid scans). Must be an indexed column of type: `smallint`, `integer`, `bigint`, `timestamp without time zone`, or `timestamp with time zone`. Unrelated to ClickHouse partitioning.",
            "type": "string",
            "example": "id"
          }
        }
      },
      "ClickPipePatchPostgresPipeRemoveTableMapping": {
        "properties": {
          "sourceSchemaName": {
            "description": "PostgreSQL source schema name.",
            "nullable": true,
            "type": "string",
            "example": "public"
          },
          "sourceTable": {
            "description": "PostgreSQL source table name.",
            "nullable": true,
            "type": "string",
            "example": "users"
          },
          "targetTable": {
            "description": "ClickHouse target table name, optionally prefixed with schema name (e.g., \"my_schema_my_table\"). The table will be created automatically if it does not exist. For snapshot mode, the target table must be empty.",
            "nullable": true,
            "type": "string",
            "example": "public_users"
          },
          "tableEngine": {
            "description": "ClickHouse table engine: \"ReplacingMergeTree\" (handles updates/deletes), \"MergeTree\" (append-only), or \"Null\" (forward data to materialized views without storing it).",
            "nullable": true,
            "type": "string",
            "enum": [
              "MergeTree",
              "ReplacingMergeTree",
              "Null"
            ],
            "example": "ReplacingMergeTree"
          },
          "partitionKey": {
            "description": "Custom partitioning column used for parallel snapshotting. Only beneficial for PostgreSQL 13 (no benefit for PG14+, which supports indexed ctid scans). Must be an indexed column of type: `smallint`, `integer`, `bigint`, `timestamp without time zone`, or `timestamp with time zone`. Unrelated to ClickHouse partitioning.",
            "nullable": true,
            "type": "string",
            "example": "id"
          }
        }
      },
      "ClickPipePostgresSource": {
        "properties": {
          "host": {
            "description": "PostgreSQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
            "type": "string",
            "format": "hostname",
            "example": "my-postgres-server.example.com"
          },
          "port": {
            "description": "PostgreSQL server port.",
            "type": "integer",
            "minimum": 1,
            "maximum": 65535,
            "example": 5432
          },
          "database": {
            "description": "PostgreSQL database name to replicate from.",
            "type": "string",
            "example": "production_db"
          },
          "authentication": {
            "description": "Authentication method for Postgres connection.",
            "type": "string",
            "enum": [
              "basic",
              "IAM_ROLE"
            ],
            "example": "IAM_ROLE"
          },
          "iamRole": {
            "description": "IAM role ARN for IAM authentication (required for IAM_ROLE authentication).",
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyApplicationRole"
          },
          "tlsHost": {
            "description": "TLS/SSL host for secure connections.",
            "type": "string",
            "example": "my-postgres-server.example.com"
          },
          "caCertificate": {
            "description": "PEM encoded CA certificate to validate the Postgres server certificate.",
            "type": "string",
            "example": "-----BEGIN CERTIFICATE-----\n..."
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipePostgresPipeSettings"
          },
          "tableMappings": {
            "type": "array",
            "description": "List of table mappings defining which PostgreSQL tables to replicate and how they map to ClickHouse tables.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePostgresPipeTableMapping"
            }
          }
        }
      },
      "ClickPipeMutatePostgresSource": {
        "properties": {
          "credentials": {
            "$ref": "#/components/schemas/PLAIN"
          },
          "host": {
            "description": "PostgreSQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
            "type": "string",
            "format": "hostname",
            "example": "my-postgres-server.example.com"
          },
          "port": {
            "description": "PostgreSQL server port.",
            "type": "integer",
            "minimum": 1,
            "maximum": 65535,
            "example": 5432
          },
          "database": {
            "description": "PostgreSQL database name to replicate from.",
            "type": "string",
            "example": "production_db"
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipePostgresPipeSettings"
          },
          "authentication": {
            "description": "Authentication method for Postgres connection.",
            "type": "string",
            "enum": [
              "basic",
              "IAM_ROLE"
            ],
            "example": "IAM_ROLE"
          },
          "iamRole": {
            "description": "IAM role ARN for IAM authentication (required for IAM_ROLE authentication).",
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyApplicationRole"
          },
          "tlsHost": {
            "description": "TLS/SSL host for secure connections.",
            "type": "string",
            "example": "my-postgres-server.example.com"
          },
          "caCertificate": {
            "description": "PEM encoded CA certificate to validate the Postgres server certificate.",
            "type": "string",
            "example": "-----BEGIN CERTIFICATE-----\n..."
          },
          "tableMappings": {
            "type": "array",
            "description": "List of table mappings defining which PostgreSQL tables to replicate and how they map to ClickHouse tables.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePostgresPipeTableMapping"
            }
          }
        }
      },
      "ClickPipePatchPostgresSource": {
        "properties": {
          "credentials": {
            "$ref": "#/components/schemas/PLAIN"
          },
          "host": {
            "description": "PostgreSQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
            "nullable": true,
            "type": "string",
            "format": "hostname",
            "example": "my-postgres-server.example.com"
          },
          "port": {
            "description": "PostgreSQL server port.",
            "nullable": true,
            "type": "integer",
            "minimum": 1,
            "maximum": 65535,
            "example": 5432
          },
          "database": {
            "description": "PostgreSQL database name to replicate from.",
            "nullable": true,
            "type": "string",
            "example": "production_db"
          },
          "authentication": {
            "description": "Authentication method for Postgres connection.",
            "nullable": true,
            "type": "string",
            "enum": [
              "basic",
              "IAM_ROLE"
            ],
            "example": "IAM_ROLE"
          },
          "iamRole": {
            "description": "IAM role ARN for IAM authentication (required for IAM_ROLE authentication).",
            "nullable": true,
            "type": "string",
            "example": "arn:aws:iam::123456789012:role/MyApplicationRole"
          },
          "tlsHost": {
            "description": "TLS/SSL host for secure connections.",
            "nullable": true,
            "type": "string",
            "example": "my-postgres-server.example.com"
          },
          "caCertificate": {
            "description": "PEM encoded CA certificate to validate the Postgres server certificate.",
            "nullable": true,
            "type": "string",
            "example": "-----BEGIN CERTIFICATE-----\n..."
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipePatchPostgresPipeSettings"
          },
          "tableMappingsToAdd": {
            "type": "array",
            "description": "Table mappings to add to the pipe. Can be an empty array if no tables are being added.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePostgresPipeTableMapping"
            }
          },
          "tableMappingsToRemove": {
            "type": "array",
            "description": "Table mappings to remove from the pipe. Only sourceSchemaName, sourceTable, and targetTable are required for removal.",
            "items": {
              "$ref": "#/components/schemas/ClickPipePatchPostgresPipeRemoveTableMapping"
            }
          }
        }
      },
      "ClickPipeBigQueryPipeSettings": {
        "properties": {
          "replicationMode": {
            "description": "Replication mode. BigQuery only supports snapshot mode.",
            "type": "string",
            "enum": [
              "snapshot"
            ]
          },
          "allowNullableColumns": {
            "description": "Allow nullable columns in the destination table.",
            "type": "boolean"
          },
          "initialLoadParallelism": {
            "description": "Number of parallel workers during initial load.",
            "type": "number"
          },
          "snapshotNumRowsPerPartition": {
            "description": "Number of rows to snapshot per partition.",
            "type": "number"
          },
          "snapshotNumberOfParallelTables": {
            "description": "Number of parallel tables to snapshot.",
            "type": "number"
          }
        }
      },
      "ClickPipeBigQueryPipeTableMapping": {
        "properties": {
          "sourceDatasetName": {
            "description": "Source BigQuery dataset name.",
            "type": "string"
          },
          "sourceTable": {
            "description": "Source table name.",
            "type": "string"
          },
          "targetTable": {
            "description": "Target ClickHouse table name.",
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
      "ClickPipeBigQuerySource": {
        "properties": {
          "snapshotStagingPath": {
            "description": "GCS bucket path for staging snapshot data (e.g., gs://my-bucket/staging/). Data will be automatically cleaned up after initial load.",
            "type": "string"
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipeBigQueryPipeSettings"
          },
          "tableMappings": {
            "type": "array",
            "description": "Table mappings for BigQuery pipe.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeBigQueryPipeTableMapping"
            }
          }
        }
      },
      "ClickPipeMutateBigQuerySource": {
        "properties": {
          "snapshotStagingPath": {
            "description": "GCS bucket path for staging snapshot data (e.g., gs://my-bucket/staging/). Data will be automatically cleaned up after initial load.",
            "type": "string"
          },
          "settings": {
            "$ref": "#/components/schemas/ClickPipeBigQueryPipeSettings"
          },
          "tableMappings": {
            "type": "array",
            "description": "Table mappings for BigQuery pipe.",
            "items": {
              "$ref": "#/components/schemas/ClickPipeBigQueryPipeTableMapping"
            }
          },
          "credentials": {
            "$ref": "#/components/schemas/ServiceAccount"
          }
        }
      },
      "ClickPipeScaling": {
        "properties": {
          "replicas": {
            "description": "Desired number of replicas. Only for scalable pipes.",
            "type": "integer",
            "minimum": 1,
            "maximum": 40
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
          },
          "bigquery": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeBigQuerySource"
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
            "type": "string",
            "example": "my_postgres_pipe"
          },
          "state": {
            "description": "Current lifecycle state of the ClickPipe. For database pipes: \"Provisioning\" (initial setup), \"Setup\" (configuring replication), \"Snapshot\" (initial data load), \"Running\" (actively replicating), \"Pausing\" (transitioning to paused state), \"Paused\" (temporarily paused), \"Modifying\" (applying configuration updates), \"Resync\" (swapping resync tables with original tables), \"Failed\" (error occurred), \"Unknown\". For streaming/object storage pipes (Kafka, Kinesis, S3): \"Unknown\" (initial state), \"Provisioning\" (setting up resources), \"Running\" (actively ingesting data), \"Stopping\" (transitioning to stopped state), \"Stopped\" (manually stopped, can be restarted), \"Completed\" (batch ingestion finished for object storage), \"Failed\" (error occurred, pipe stopped), \"InternalError\" (internal system error).",
            "type": "string",
            "enum": [
              "Unknown",
              "Provisioning",
              "Running",
              "Stopping",
              "Stopped",
              "Failed",
              "Completed",
              "InternalError",
              "Setup",
              "Snapshot",
              "Paused",
              "Pausing",
              "Modifying",
              "Resync"
            ],
            "example": "Running"
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
            "description": "Creation timestamp of the ClickPipe in ISO 8601 format.",
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "description": "Last update timestamp of the ClickPipe in ISO 8601 format.",
            "type": "string",
            "format": "date-time"
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
          "bigquery": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickPipeMutateBigQuerySource"
              }
            ],
            "nullable": true
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
      "ResourceTagsV1": {
        "properties": {
          "key": {
            "description": "Tag key. Must be alphanumeric with dashes, underscores and dots.",
            "type": "string"
          },
          "value": {
            "description": "Tag value. Must be alphanumeric with dashes, underscores and dots.",
            "nullable": true,
            "type": "string"
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
            ]
          },
          "state": {
            "description": "Current state of the service.",
            "type": "string",
            "enum": [
              "starting",
              "stopping",
              "terminating",
              "softdeleting",
              "awaking",
              "partially_running",
              "provisioning",
              "running",
              "stopped",
              "terminated",
              "softdeleted",
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
            "description": "DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
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
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
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
            "maximum": 236,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum total memory of each replica during auto-scaling in Gb.  Must be a multiple of 4 and lower than or equal to 120* for non paid services or 236* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region. ",
            "type": "number",
            "minimum": 8,
            "maximum": 236,
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
              "v1-highmem-xl"
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
          },
          "tags": {
            "type": "array",
            "description": "Tags associated with the service.",
            "items": {
              "$ref": "#/components/schemas/ResourceTagsV1"
            }
          },
          "enableCoreDumps": {
            "description": "True if the service's underline infra is enabled for collecting core dumps. This is an experimental feature",
            "type": "boolean"
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
      "InstanceTagsPatch": {
        "properties": {
          "add": {
            "type": "array",
            "description": "Elements to add. Executed after \"remove\" part is processed.",
            "items": {
              "$ref": "#/components/schemas/ResourceTagsV1"
            }
          },
          "remove": {
            "type": "array",
            "description": "Elements to remove. Executed before \"add\" part is processed.",
            "items": {
              "$ref": "#/components/schemas/ResourceTagsV1"
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
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
          },
          "displayName": {
            "description": "Human readable name for infrastructure",
            "type": "string"
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
          },
          "enableCoreDumps": {
            "description": "Whether crash reports (core dumps) collection is enabled for services in the organization. When disabled at the organization level, individual services cannot enable crash reports.",
            "type": "boolean"
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
            ]
          }
        }
      },
      "OrganizationPrivateEndpointsPatch": {
        "properties": {
          "add": {
            "type": "array",
            "description": "DEPRECATED. Elements to add. Executed after \"remove\" part is processed. Please use the `Update Service Basic Details` endpoint with the `privateEndpointIds` field instead to modify the private endpoints.",
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
      "RBACPolicyTags": {
        "properties": {
          "grants": {
            "type": "array",
            "description": "Optional list of database grants (e.g., database names)",
            "items": {
              "type": "string"
            }
          },
          "roleV2": {
            "description": "Optional SQL console role type",
            "type": "string",
            "enum": [
              "sql-console-readonly",
              "sql-console-admin"
            ]
          }
        }
      },
      "RBACPolicy": {
        "properties": {
          "id": {
            "description": "Unique policy identifier",
            "type": "string"
          },
          "roleId": {
            "description": "ID of the role this policy belongs to",
            "type": "string"
          },
          "tenantId": {
            "description": "Tenant resource ID (e.g., organization/uuid)",
            "type": "string"
          },
          "allowDeny": {
            "description": "Whether this policy allows or denies access",
            "type": "string",
            "enum": [
              "ALLOW",
              "DENY"
            ]
          },
          "permissions": {
            "type": "array",
            "description": "List of permissions granted or denied by this policy",
            "items": {
              "type": "string"
            }
          },
          "resources": {
            "type": "array",
            "description": "List of resource IDs this policy applies to (e.g., instance/uuid, instance/*)",
            "items": {
              "type": "string"
            }
          },
          "tags": {
            "$ref": "#/components/schemas/RBACPolicyTags"
          }
        }
      },
      "RBACRole": {
        "properties": {
          "id": {
            "description": "Unique role identifier",
            "type": "string"
          },
          "tenantId": {
            "description": "Tenant resource ID (e.g., organization/uuid)",
            "type": "string"
          },
          "ownerId": {
            "description": "Owner resource ID (e.g., organization/uuid)",
            "type": "string"
          },
          "name": {
            "description": "Name of the role",
            "type": "string"
          },
          "type": {
            "description": "Whether this is a system role or a custom role",
            "type": "string",
            "enum": [
              "system",
              "custom"
            ]
          },
          "actors": {
            "type": "array",
            "description": "List of actor resource IDs assigned to this role (e.g., user/uuid, apiKey/uuid)",
            "items": {
              "type": "string"
            }
          },
          "policies": {
            "type": "array",
            "description": "List of policies associated with this role",
            "items": {
              "$ref": "#/components/schemas/RBACPolicy"
            }
          },
          "createdAt": {
            "description": "Timestamp when the role was created. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "description": "Timestamp when the role was last updated. ISO-8601.",
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "RBACPolicyCreateRequest": {
        "properties": {
          "allowDeny": {
            "description": "Whether this policy allows or denies access",
            "type": "string",
            "enum": [
              "ALLOW",
              "DENY"
            ]
          },
          "permissions": {
            "type": "array",
            "description": "List of permissions to grant or deny (e.g., [\"control-plane:organization:view\"])",
            "items": {
              "type": "string"
            }
          },
          "resources": {
            "type": "array",
            "description": "List of resource IDs this policy applies to (e.g., [\"instance/uuid\", \"instance/*\"])",
            "items": {
              "type": "string"
            }
          },
          "tags": {
            "$ref": "#/components/schemas/RBACPolicyTags"
          }
        }
      },
      "RoleCreateRequest": {
        "properties": {
          "name": {
            "description": "Name of the role",
            "type": "string"
          },
          "actors": {
            "type": "array",
            "description": "List of actor resource IDs to assign to this role (e.g., [\"user/uuid\", \"apiKey/uuid\"])",
            "items": {
              "type": "string"
            }
          },
          "policies": {
            "type": "array",
            "description": "List of policies to create for this role",
            "items": {
              "$ref": "#/components/schemas/RBACPolicyCreateRequest"
            }
          }
        }
      },
      "RoleUpdateRequest": {
        "properties": {
          "name": {
            "description": "New name for the role",
            "type": "string"
          },
          "actors": {
            "type": "array",
            "description": "New list of actor resource IDs (replaces existing actors)",
            "items": {
              "type": "string"
            }
          },
          "policies": {
            "type": "array",
            "description": "New list of policies (replaces existing policies)",
            "items": {
              "$ref": "#/components/schemas/RBACPolicyCreateRequest"
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
          },
          "targetKeyId": {
            "description": "For 'openapi_key_update' activities: the ID of the API key that was updated.",
            "type": "string"
          },
          "keyUpdateType": {
            "description": "For 'openapi_key_update' activities: the type of update that was performed.",
            "type": "string",
            "enum": [
              "created",
              "deleted",
              "name-changed",
              "role-changed",
              "state-changed",
              "date-changed",
              "ip-access-list-changed",
              "org-role-changed",
              "default-service-role-changed",
              "service-role-changed",
              "roles-v2-changed"
            ]
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
      "ClickStackAlertSilenced": {
        "properties": {
          "by": {
            "description": "User ID who silenced the alert.",
            "nullable": true,
            "type": "string"
          },
          "at": {
            "description": "Silence start timestamp.",
            "type": "string"
          },
          "until": {
            "description": "Silence end timestamp.",
            "type": "string"
          }
        }
      },
      "ClickStackAlertChannelEmail": {
        "properties": {
          "type": {
            "description": "Channel type.",
            "type": "string",
            "enum": [
              "webhook",
              "email"
            ]
          },
          "emailRecipients": {
            "type": "array",
            "description": "Email recipients for email alerts.",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "type",
          "emailRecipients"
        ]
      },
      "ClickStackAlertChannelWebhook": {
        "properties": {
          "type": {
            "description": "Channel type.",
            "type": "string",
            "enum": [
              "webhook",
              "email"
            ]
          },
          "webhookId": {
            "description": "Webhook destination ID.",
            "type": "string"
          },
          "webhookService": {
            "description": "Webhook service type (e.g., slack_api).",
            "nullable": true,
            "type": "string"
          },
          "slackChannelId": {
            "description": "Slack channel ID for Slack webhooks.",
            "nullable": true,
            "type": "string"
          },
          "severity": {
            "description": "Severity label used by PagerDuty API webhooks.",
            "nullable": true,
            "type": "string",
            "enum": [
              "critical",
              "error",
              "warning",
              "info"
            ]
          }
        },
        "required": [
          "type",
          "webhookId"
        ]
      },
      "ClickStackAlertChannel": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/ClickStackAlertChannelEmail"
          },
          {
            "$ref": "#/components/schemas/ClickStackAlertChannelWebhook"
          }
        ]
      },
      "ClickStackAlert": {
        "properties": {
          "dashboardId": {
            "description": "Dashboard ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "tileId": {
            "description": "Tile ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "savedSearchId": {
            "description": "Saved search ID for saved_search alerts.",
            "nullable": true,
            "type": "string"
          },
          "groupBy": {
            "description": "Group-by key for saved search alerts.",
            "nullable": true,
            "type": "string"
          },
          "threshold": {
            "description": "Threshold value for triggering the alert.",
            "type": "number"
          },
          "interval": {
            "description": "Evaluation interval.",
            "type": "string",
            "enum": [
              "1m",
              "5m",
              "15m",
              "30m",
              "1h",
              "6h",
              "12h",
              "1d"
            ]
          },
          "source": {
            "description": "Alert source type.",
            "type": "string",
            "enum": [
              "saved_search",
              "tile"
            ]
          },
          "thresholdType": {
            "description": "Threshold comparison direction.",
            "type": "string",
            "enum": [
              "above",
              "below"
            ]
          },
          "channel": {
            "$ref": "#/components/schemas/ClickStackAlertChannel"
          },
          "name": {
            "description": "Human-friendly alert name.",
            "nullable": true,
            "type": "string"
          },
          "message": {
            "description": "Alert message template.",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "ClickStackAlertResponse": {
        "properties": {
          "dashboardId": {
            "description": "Dashboard ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "tileId": {
            "description": "Tile ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "savedSearchId": {
            "description": "Saved search ID for saved_search alerts.",
            "nullable": true,
            "type": "string"
          },
          "groupBy": {
            "description": "Group-by key for saved search alerts.",
            "nullable": true,
            "type": "string"
          },
          "threshold": {
            "description": "Threshold value for triggering the alert.",
            "type": "number"
          },
          "interval": {
            "description": "Evaluation interval.",
            "type": "string",
            "enum": [
              "1m",
              "5m",
              "15m",
              "30m",
              "1h",
              "6h",
              "12h",
              "1d"
            ]
          },
          "source": {
            "description": "Alert source type.",
            "type": "string",
            "enum": [
              "saved_search",
              "tile"
            ]
          },
          "thresholdType": {
            "description": "Threshold comparison direction.",
            "type": "string",
            "enum": [
              "above",
              "below"
            ]
          },
          "channel": {
            "$ref": "#/components/schemas/ClickStackAlertChannel"
          },
          "name": {
            "description": "Human-friendly alert name.",
            "nullable": true,
            "type": "string"
          },
          "message": {
            "description": "Alert message template.",
            "nullable": true,
            "type": "string"
          },
          "id": {
            "description": "Unique alert identifier.",
            "type": "string"
          },
          "state": {
            "description": "Current alert state.",
            "type": "string",
            "enum": [
              "ALERT",
              "OK",
              "INSUFFICIENT_DATA",
              "DISABLED"
            ]
          },
          "teamId": {
            "description": "Team identifier.",
            "type": "string"
          },
          "silenced": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/ClickStackAlertSilenced"
              }
            ],
            "nullable": true
          },
          "createdAt": {
            "description": "Creation timestamp.",
            "nullable": true,
            "type": "string"
          },
          "updatedAt": {
            "description": "Last update timestamp.",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "ClickStackCreateAlertRequest": {
        "properties": {
          "dashboardId": {
            "description": "Dashboard ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "tileId": {
            "description": "Tile ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "savedSearchId": {
            "description": "Saved search ID for saved_search alerts.",
            "nullable": true,
            "type": "string"
          },
          "groupBy": {
            "description": "Group-by key for saved search alerts.",
            "nullable": true,
            "type": "string"
          },
          "threshold": {
            "description": "Threshold value for triggering the alert.",
            "type": "number"
          },
          "interval": {
            "description": "Evaluation interval.",
            "type": "string",
            "enum": [
              "1m",
              "5m",
              "15m",
              "30m",
              "1h",
              "6h",
              "12h",
              "1d"
            ]
          },
          "source": {
            "description": "Alert source type.",
            "type": "string",
            "enum": [
              "saved_search",
              "tile"
            ]
          },
          "thresholdType": {
            "description": "Threshold comparison direction.",
            "type": "string",
            "enum": [
              "above",
              "below"
            ]
          },
          "channel": {
            "$ref": "#/components/schemas/ClickStackAlertChannel"
          },
          "name": {
            "description": "Human-friendly alert name.",
            "nullable": true,
            "type": "string"
          },
          "message": {
            "description": "Alert message template.",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "ClickStackUpdateAlertRequest": {
        "properties": {
          "dashboardId": {
            "description": "Dashboard ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "tileId": {
            "description": "Tile ID for tile-based alerts.",
            "nullable": true,
            "type": "string"
          },
          "savedSearchId": {
            "description": "Saved search ID for saved_search alerts.",
            "nullable": true,
            "type": "string"
          },
          "groupBy": {
            "description": "Group-by key for saved search alerts.",
            "nullable": true,
            "type": "string"
          },
          "threshold": {
            "description": "Threshold value for triggering the alert.",
            "type": "number"
          },
          "interval": {
            "description": "Evaluation interval.",
            "type": "string",
            "enum": [
              "1m",
              "5m",
              "15m",
              "30m",
              "1h",
              "6h",
              "12h",
              "1d"
            ]
          },
          "source": {
            "description": "Alert source type.",
            "type": "string",
            "enum": [
              "saved_search",
              "tile"
            ]
          },
          "thresholdType": {
            "description": "Threshold comparison direction.",
            "type": "string",
            "enum": [
              "above",
              "below"
            ]
          },
          "channel": {
            "$ref": "#/components/schemas/ClickStackAlertChannel"
          },
          "name": {
            "description": "Human-friendly alert name.",
            "nullable": true,
            "type": "string"
          },
          "message": {
            "description": "Alert message template.",
            "nullable": true,
            "type": "string"
          }
        }
      },
      "ClickStackNumberFormat": {
        "properties": {
          "output": {
            "description": "Output format type (currency, percent, byte, time, number).",
            "type": "string",
            "enum": [
              "currency",
              "percent",
              "byte",
              "time",
              "number"
            ]
          },
          "mantissa": {
            "description": "Number of decimal places.",
            "type": "integer"
          },
          "thousandSeparated": {
            "description": "Whether to use thousand separators.",
            "type": "boolean"
          },
          "average": {
            "description": "Whether to show as average.",
            "type": "boolean"
          },
          "decimalBytes": {
            "description": "Use decimal bytes (1000) vs binary bytes (1024).",
            "type": "boolean"
          },
          "factor": {
            "description": "Multiplication factor.",
            "type": "number"
          },
          "currencySymbol": {
            "description": "Currency symbol for currency format.",
            "type": "string"
          },
          "unit": {
            "description": "Custom unit label.",
            "type": "string"
          }
        }
      },
      "ClickStackTimeChartSeries": {
        "properties": {
          "type": {
            "description": "",
            "type": "string",
            "enum": [
              "time"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query",
            "type": "string"
          },
          "aggFn": {
            "description": "Aggregation function to apply to the field or metric value",
            "type": "string",
            "enum": [
              "avg",
              "count",
              "count_distinct",
              "last_value",
              "max",
              "min",
              "quantile",
              "sum",
              "any",
              "none"
            ]
          },
          "level": {
            "description": "Percentile level for quantile aggregations (e.g., 0.95 for p95)",
            "type": "number"
          },
          "field": {
            "description": "Field/property name to aggregate (required for most aggregation functions except count)",
            "type": "string"
          },
          "alias": {
            "description": "Display name for the series in the chart",
            "type": "string"
          },
          "where": {
            "description": "Filter query for the data (syntax depends on whereLanguage)",
            "type": "string"
          },
          "whereLanguage": {
            "description": "Query language for the where clause",
            "type": "string",
            "enum": [
              "sql",
              "lucene"
            ]
          },
          "groupBy": {
            "type": "array",
            "description": "Fields to group results by (creates separate series for each group)",
            "items": {
              "type": "string"
            }
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          },
          "metricDataType": {
            "description": "Metric data type for metrics data sources.",
            "type": "string",
            "enum": [
              "sum",
              "gauge",
              "histogram",
              "summary",
              "exponential histogram"
            ]
          },
          "metricName": {
            "description": "Metric name for metrics data sources",
            "type": "string"
          },
          "displayType": {
            "description": "Visual representation type for the time series",
            "type": "string",
            "enum": [
              "stacked_bar",
              "line"
            ]
          }
        },
        "required": [
          "type",
          "sourceId",
          "aggFn",
          "where",
          "groupBy"
        ]
      },
      "ClickStackTableChartSeries": {
        "properties": {
          "type": {
            "description": "",
            "type": "string",
            "enum": [
              "table"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query",
            "type": "string"
          },
          "aggFn": {
            "description": "Aggregation function to apply to the field or metric value",
            "type": "string",
            "enum": [
              "avg",
              "count",
              "count_distinct",
              "last_value",
              "max",
              "min",
              "quantile",
              "sum",
              "any",
              "none"
            ]
          },
          "level": {
            "description": "Percentile level for quantile aggregations (e.g., 0.95 for p95)",
            "type": "number"
          },
          "field": {
            "description": "",
            "type": "string"
          },
          "alias": {
            "description": "",
            "type": "string"
          },
          "where": {
            "description": "",
            "type": "string"
          },
          "whereLanguage": {
            "description": "Query language for the where clause.",
            "type": "string",
            "enum": [
              "sql",
              "lucene"
            ]
          },
          "groupBy": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string"
            }
          },
          "sortOrder": {
            "description": "Sort order for table rows",
            "type": "string",
            "enum": [
              "desc",
              "asc"
            ]
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          },
          "metricDataType": {
            "description": "Metric data type for metrics data sources",
            "type": "string",
            "enum": [
              "sum",
              "gauge",
              "histogram",
              "summary",
              "exponential histogram"
            ]
          },
          "metricName": {
            "description": "Metric name for metrics data sources",
            "type": "string"
          }
        },
        "required": [
          "type",
          "sourceId",
          "aggFn",
          "where",
          "groupBy"
        ]
      },
      "ClickStackNumberChartSeries": {
        "properties": {
          "type": {
            "description": "",
            "type": "string",
            "enum": [
              "number"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query",
            "type": "string"
          },
          "aggFn": {
            "description": "Aggregation function to apply to the field or metric value",
            "type": "string",
            "enum": [
              "avg",
              "count",
              "count_distinct",
              "last_value",
              "max",
              "min",
              "quantile",
              "sum",
              "any",
              "none"
            ]
          },
          "level": {
            "description": "Percentile level for quantile aggregations (e.g., 0.95 for p95)",
            "type": "number"
          },
          "field": {
            "description": "",
            "type": "string"
          },
          "alias": {
            "description": "",
            "type": "string"
          },
          "where": {
            "description": "",
            "type": "string"
          },
          "whereLanguage": {
            "description": "Query language for the where clause.",
            "type": "string",
            "enum": [
              "sql",
              "lucene"
            ]
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          },
          "metricDataType": {
            "description": "Metric data type for metrics data sources.",
            "type": "string",
            "enum": [
              "sum",
              "gauge",
              "histogram",
              "summary",
              "exponential histogram"
            ]
          },
          "metricName": {
            "description": "",
            "type": "string"
          }
        },
        "required": [
          "type",
          "sourceId",
          "aggFn",
          "where"
        ]
      },
      "ClickStackSearchChartSeries": {
        "properties": {
          "type": {
            "description": "",
            "type": "string",
            "enum": [
              "search"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query",
            "type": "string"
          },
          "fields": {
            "type": "array",
            "description": "List of field names to display in the search results table",
            "items": {
              "type": "string"
            }
          },
          "where": {
            "description": "Filter query for the data (syntax depends on whereLanguage)",
            "type": "string"
          },
          "whereLanguage": {
            "description": "Query language for the where clause",
            "type": "string",
            "enum": [
              "sql",
              "lucene"
            ]
          }
        },
        "required": [
          "type",
          "sourceId",
          "fields",
          "where"
        ]
      },
      "ClickStackMarkdownChartSeries": {
        "properties": {
          "type": {
            "description": "",
            "type": "string",
            "enum": [
              "markdown"
            ]
          },
          "content": {
            "description": "",
            "type": "string"
          }
        },
        "required": [
          "type",
          "content"
        ]
      },
      "ClickStackDashboardChartSeries": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/ClickStackTimeChartSeries"
          },
          {
            "$ref": "#/components/schemas/ClickStackTableChartSeries"
          },
          {
            "$ref": "#/components/schemas/ClickStackNumberChartSeries"
          },
          {
            "$ref": "#/components/schemas/ClickStackSearchChartSeries"
          },
          {
            "$ref": "#/components/schemas/ClickStackMarkdownChartSeries"
          }
        ]
      },
      "ClickStackSelectItem": {
        "properties": {
          "aggFn": {
            "description": "Aggregation function to apply. \"count\" does not require a valueExpression; \"quantile\" requires a level field indicating the desired percentile (e.g., 0.95).",
            "type": "string",
            "enum": [
              "avg",
              "count",
              "count_distinct",
              "last_value",
              "max",
              "min",
              "quantile",
              "sum",
              "any",
              "none"
            ]
          },
          "valueExpression": {
            "description": "Expression for the column or value to aggregate. Must be omitted when aggFn is \"count\"; required for all other aggFn values.",
            "type": "string"
          },
          "alias": {
            "description": "Display alias for this select item in chart legends.",
            "type": "string"
          },
          "level": {
            "description": "Percentile level; only valid when aggFn is \"quantile\".",
            "type": "number",
            "enum": [
              "0.5",
              "0.9",
              "0.95",
              "0.99"
            ]
          },
          "where": {
            "description": "SQL or Lucene filter condition applied before aggregation.",
            "type": "string"
          },
          "whereLanguage": {
            "description": "Query language for the where clause.",
            "type": "string",
            "enum": [
              "sql",
              "lucene"
            ]
          },
          "metricName": {
            "description": "Name of the metric to aggregate; only applicable when the source is a metrics source.",
            "type": "string"
          },
          "metricType": {
            "description": "Metric type; only applicable when the source is a metrics source.",
            "type": "string",
            "enum": [
              "sum",
              "gauge",
              "histogram",
              "summary",
              "exponential histogram"
            ]
          },
          "periodAggFn": {
            "description": "Optional period aggregation function for Gauge metrics (e.g., compute the delta over the period).",
            "type": "string",
            "enum": [
              "delta"
            ]
          }
        },
        "required": [
          "aggFn"
        ]
      },
      "ClickStackLineChartConfig": {
        "properties": {
          "displayType": {
            "description": "",
            "type": "string",
            "enum": [
              "line"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query.",
            "type": "string"
          },
          "select": {
            "type": "array",
            "description": "One or more aggregated values to plot. When asRatio is true, exactly two select items are required.",
            "items": {
              "$ref": "#/components/schemas/ClickStackSelectItem"
            }
          },
          "groupBy": {
            "description": "Field expression to group results by (creates separate lines per group value).",
            "type": "string"
          },
          "asRatio": {
            "description": "Plot select[0] / select[1] as a ratio. Requires exactly two select items.",
            "type": "boolean"
          },
          "alignDateRangeToGranularity": {
            "description": "Expand date range boundaries to the query granularity interval.",
            "type": "boolean"
          },
          "fillNulls": {
            "description": "Fill missing time buckets with zero instead of leaving gaps.",
            "type": "boolean"
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          },
          "compareToPreviousPeriod": {
            "description": "Overlay the equivalent previous time period for comparison.",
            "type": "boolean"
          }
        },
        "required": [
          "displayType",
          "sourceId",
          "select"
        ]
      },
      "ClickStackBarChartConfig": {
        "properties": {
          "displayType": {
            "description": "",
            "type": "string",
            "enum": [
              "stacked_bar"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query.",
            "type": "string"
          },
          "select": {
            "type": "array",
            "description": "One or more aggregated values to plot. When asRatio is true, exactly two select items are required.",
            "items": {
              "$ref": "#/components/schemas/ClickStackSelectItem"
            }
          },
          "groupBy": {
            "description": "Field expression to group results by (creates separate bars segments per group value).",
            "type": "string"
          },
          "asRatio": {
            "description": "Plot select[0] / select[1] as a ratio. Requires exactly two select items.",
            "type": "boolean"
          },
          "alignDateRangeToGranularity": {
            "description": "Align the date range boundaries to the query granularity interval.",
            "type": "boolean"
          },
          "fillNulls": {
            "description": "Fill missing time buckets with zero instead of leaving gaps.",
            "type": "boolean"
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          }
        },
        "required": [
          "displayType",
          "sourceId",
          "select"
        ]
      },
      "ClickStackTableChartConfig": {
        "properties": {
          "displayType": {
            "description": "",
            "type": "string",
            "enum": [
              "table"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query.",
            "type": "string"
          },
          "select": {
            "type": "array",
            "description": "One or more aggregated values to display as table columns. When asRatio is true, exactly two select items are required.",
            "items": {
              "$ref": "#/components/schemas/ClickStackSelectItem"
            }
          },
          "groupBy": {
            "description": "Field expression to group results by (one row per group value).",
            "type": "string"
          },
          "having": {
            "description": "Post-aggregation SQL HAVING condition.",
            "type": "string"
          },
          "orderBy": {
            "description": "SQL ORDER BY expression for sorting table rows.",
            "type": "string"
          },
          "asRatio": {
            "description": "Display select[0] / select[1] as a ratio. Requires exactly two select items.",
            "type": "boolean"
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          }
        },
        "required": [
          "displayType",
          "sourceId",
          "select"
        ]
      },
      "ClickStackNumberChartConfig": {
        "properties": {
          "displayType": {
            "description": "",
            "type": "string",
            "enum": [
              "number"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query.",
            "type": "string"
          },
          "select": {
            "type": "array",
            "description": "Exactly one aggregated value to display as a single number.",
            "items": {
              "$ref": "#/components/schemas/ClickStackSelectItem"
            }
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          }
        },
        "required": [
          "displayType",
          "sourceId",
          "select"
        ]
      },
      "ClickStackPieChartConfig": {
        "properties": {
          "displayType": {
            "description": "",
            "type": "string",
            "enum": [
              "pie"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query.",
            "type": "string"
          },
          "select": {
            "type": "array",
            "description": "Exactly one aggregated value used to size each pie slice.",
            "items": {
              "$ref": "#/components/schemas/ClickStackSelectItem"
            }
          },
          "groupBy": {
            "description": "Field expression to group results by (one slice per group value).",
            "type": "string"
          },
          "numberFormat": {
            "$ref": "#/components/schemas/ClickStackNumberFormat"
          }
        },
        "required": [
          "displayType",
          "sourceId",
          "select"
        ]
      },
      "ClickStackSearchChartConfig": {
        "properties": {
          "displayType": {
            "description": "",
            "type": "string",
            "enum": [
              "search"
            ]
          },
          "sourceId": {
            "description": "ID of the data source to query.",
            "type": "string"
          },
          "select": {
            "description": "Comma-separated list of expressions to display.",
            "type": "string"
          },
          "where": {
            "description": "Filter condition for the search (syntax depends on whereLanguage).",
            "type": "string"
          },
          "whereLanguage": {
            "description": "Query language for the where clause.",
            "type": "string",
            "enum": [
              "sql",
              "lucene"
            ]
          }
        },
        "required": [
          "displayType",
          "sourceId",
          "select",
          "whereLanguage"
        ]
      },
      "ClickStackMarkdownChartConfig": {
        "properties": {
          "displayType": {
            "description": "",
            "type": "string",
            "enum": [
              "markdown"
            ]
          },
          "markdown": {
            "description": "Markdown content to render inside the tile.",
            "type": "string"
          }
        },
        "required": [
          "displayType"
        ]
      },
      "ClickStackTileConfig": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/ClickStackLineChartConfig"
          },
          {
            "$ref": "#/components/schemas/ClickStackBarChartConfig"
          },
          {
            "$ref": "#/components/schemas/ClickStackTableChartConfig"
          },
          {
            "$ref": "#/components/schemas/ClickStackNumberChartConfig"
          },
          {
            "$ref": "#/components/schemas/ClickStackPieChartConfig"
          },
          {
            "$ref": "#/components/schemas/ClickStackSearchChartConfig"
          },
          {
            "$ref": "#/components/schemas/ClickStackMarkdownChartConfig"
          }
        ]
      },
      "ClickStackTileBase": {
        "properties": {
          "name": {
            "description": "Display name for the tile",
            "type": "string"
          },
          "x": {
            "description": "Horizontal position in the grid (0-based)",
            "type": "integer"
          },
          "y": {
            "description": "Vertical position in the grid (0-based)",
            "type": "integer"
          },
          "w": {
            "description": "Width in grid units",
            "type": "integer"
          },
          "h": {
            "description": "Height in grid units",
            "type": "integer"
          },
          "config": {
            "$ref": "#/components/schemas/ClickStackTileConfig"
          }
        },
        "required": [
          "name",
          "x",
          "y",
          "w",
          "h"
        ]
      },
      "ClickStackTileOutput": {
        "properties": {
          "name": {
            "description": "Display name for the tile",
            "type": "string"
          },
          "x": {
            "description": "Horizontal position in the grid (0-based)",
            "type": "integer"
          },
          "y": {
            "description": "Vertical position in the grid (0-based)",
            "type": "integer"
          },
          "w": {
            "description": "Width in grid units",
            "type": "integer"
          },
          "h": {
            "description": "Height in grid units",
            "type": "integer"
          },
          "config": {
            "$ref": "#/components/schemas/ClickStackTileConfig"
          },
          "id": {
            "description": "",
            "type": "string"
          }
        },
        "required": [
          "name",
          "x",
          "y",
          "w",
          "h",
          "id"
        ]
      },
      "ClickStackTileInput": {
        "properties": {
          "name": {
            "description": "Display name for the tile",
            "type": "string"
          },
          "x": {
            "description": "Horizontal position in the grid (0-based)",
            "type": "integer"
          },
          "y": {
            "description": "Vertical position in the grid (0-based)",
            "type": "integer"
          },
          "w": {
            "description": "Width in grid units",
            "type": "integer"
          },
          "h": {
            "description": "Height in grid units",
            "type": "integer"
          },
          "config": {
            "$ref": "#/components/schemas/ClickStackTileConfig"
          },
          "id": {
            "description": "Optional tile ID. Omit to generate a new ID.",
            "type": "string"
          },
          "asRatio": {
            "description": "Display two series as a ratio (series[0] / series[1]). Only applicable when providing \"series\". Deprecated in favor of \"config.asRatio\".",
            "type": "boolean",
            "deprecated": true
          },
          "series": {
            "type": "array",
            "description": "Data series to display in this tile (all must be the same type). Deprecated; use \"config\" instead.",
            "items": {
              "$ref": "#/components/schemas/ClickStackDashboardChartSeries"
            },
            "deprecated": true
          }
        },
        "required": [
          "name",
          "x",
          "y",
          "w",
          "h"
        ]
      },
      "ClickStackFilterInput": {
        "properties": {
          "type": {
            "description": "",
            "type": "string",
            "enum": [
              "QUERY_EXPRESSION"
            ]
          },
          "name": {
            "description": "Display name for the dashboard filter key",
            "type": "string"
          },
          "expression": {
            "description": "Key expression used when applying this dashboard filter key",
            "type": "string"
          },
          "sourceId": {
            "description": "Source ID this dashboard filter key applies to",
            "type": "string"
          },
          "sourceMetricType": {
            "description": "Metric type when source is metrics",
            "type": "string",
            "enum": [
              "sum",
              "gauge",
              "histogram",
              "summary",
              "exponential histogram"
            ]
          }
        },
        "required": [
          "type",
          "name",
          "expression",
          "sourceId"
        ]
      },
      "ClickStackFilter": {
        "properties": {
          "type": {
            "description": "",
            "type": "string",
            "enum": [
              "QUERY_EXPRESSION"
            ]
          },
          "name": {
            "description": "Display name for the dashboard filter key",
            "type": "string"
          },
          "expression": {
            "description": "Key expression used when applying this dashboard filter key",
            "type": "string"
          },
          "sourceId": {
            "description": "Source ID this dashboard filter key applies to",
            "type": "string"
          },
          "sourceMetricType": {
            "description": "Metric type when source is metrics",
            "type": "string",
            "enum": [
              "sum",
              "gauge",
              "histogram",
              "summary",
              "exponential histogram"
            ]
          },
          "id": {
            "description": "Unique dashboard filter key ID",
            "type": "string"
          }
        },
        "required": [
          "type",
          "name",
          "expression",
          "sourceId",
          "id"
        ]
      },
      "ClickStackDashboard": {
        "properties": {
          "id": {
            "description": "Dashboard ID",
            "type": "string"
          },
          "name": {
            "description": "Dashboard name",
            "type": "string"
          },
          "tiles": {
            "type": "array",
            "description": "List of tiles/charts in the dashboard",
            "items": {
              "$ref": "#/components/schemas/ClickStackTileOutput"
            }
          },
          "tags": {
            "type": "array",
            "description": "Tags for organizing and filtering dashboards",
            "items": {
              "type": "string"
            }
          },
          "filters": {
            "type": "array",
            "description": "Dashboard filter keys added to the dashboard and applied to all tiles",
            "items": {
              "$ref": "#/components/schemas/ClickStackFilter"
            }
          }
        }
      },
      "ClickStackCreateDashboardRequest": {
        "properties": {
          "name": {
            "description": "",
            "type": "string"
          },
          "tiles": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/components/schemas/ClickStackTileInput"
            }
          },
          "tags": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string"
            }
          },
          "filters": {
            "type": "array",
            "description": "Dashboard filter keys to add to the dashboard and apply across all tiles",
            "items": {
              "$ref": "#/components/schemas/ClickStackFilterInput"
            }
          }
        },
        "required": [
          "name",
          "tiles"
        ]
      },
      "ClickStackUpdateDashboardRequest": {
        "properties": {
          "name": {
            "description": "",
            "type": "string"
          },
          "tiles": {
            "type": "array",
            "description": "Full list of tiles for the dashboard. Existing tiles are matched by ID; tiles with an ID that does not match an existing tile will be assigned a new generated ID.",
            "items": {
              "$ref": "#/components/schemas/ClickStackTileInput"
            }
          },
          "tags": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string"
            }
          },
          "filters": {
            "type": "array",
            "description": "Dashboard filter keys on the dashboard, applied across all tiles",
            "items": {
              "$ref": "#/components/schemas/ClickStackFilter"
            }
          }
        },
        "required": [
          "name",
          "tiles"
        ]
      },
      "ClickStackDashboardResponse": {
        "properties": {
          "id": {
            "description": "Dashboard ID",
            "type": "string"
          },
          "name": {
            "description": "Dashboard name",
            "type": "string"
          },
          "tiles": {
            "type": "array",
            "description": "List of tiles/charts in the dashboard",
            "items": {
              "$ref": "#/components/schemas/ClickStackTileOutput"
            }
          },
          "tags": {
            "type": "array",
            "description": "Tags for organizing and filtering dashboards",
            "items": {
              "type": "string"
            }
          },
          "filters": {
            "type": "array",
            "description": "Dashboard filter keys added to the dashboard and applied to all tiles",
            "items": {
              "$ref": "#/components/schemas/ClickStackFilter"
            }
          }
        }
      },
      "ClickStackQuerySetting": {
        "properties": {
          "setting": {
            "description": "ClickHouse setting name",
            "type": "string"
          },
          "value": {
            "description": "Setting value",
            "type": "string"
          }
        },
        "required": [
          "setting",
          "value"
        ]
      },
      "ClickStackSourceFrom": {
        "properties": {
          "databaseName": {
            "description": "ClickHouse database name",
            "type": "string"
          },
          "tableName": {
            "description": "ClickHouse table name",
            "type": "string"
          }
        },
        "required": [
          "databaseName",
          "tableName"
        ]
      },
      "ClickStackMetricSourceFrom": {
        "properties": {
          "databaseName": {
            "description": "ClickHouse database name",
            "type": "string"
          },
          "tableName": {
            "description": "ClickHouse table name",
            "nullable": true,
            "type": "string"
          }
        },
        "required": [
          "databaseName"
        ]
      },
      "ClickStackMetricTables": {
        "properties": {
          "gauge": {
            "description": "Table containing gauge metrics data",
            "type": "string"
          },
          "histogram": {
            "description": "Table containing histogram metrics data",
            "type": "string"
          },
          "sum": {
            "description": "Table containing sum metrics data",
            "type": "string"
          },
          "summary": {
            "description": "Table containing summary metrics data. Note - not yet fully supported by HyperDX",
            "type": "string"
          },
          "exponential histogram": {
            "description": "Table containing exponential histogram metrics data. Note - not yet fully supported by HyperDX",
            "type": "string"
          }
        }
      },
      "ClickStackHighlightedAttributeExpression": {
        "properties": {
          "sqlExpression": {
            "description": "SQL expression for the attribute",
            "type": "string"
          },
          "luceneExpression": {
            "description": "An optional, Lucene version of the sqlExpression expression. If provided, it is used when searching for this attribute value.",
            "nullable": true,
            "type": "string"
          },
          "alias": {
            "description": "Optional alias for the attribute",
            "nullable": true,
            "type": "string"
          }
        },
        "required": [
          "sqlExpression"
        ]
      },
      "ClickStackAggregatedColumn": {
        "properties": {
          "sourceColumn": {
            "description": "Source column name",
            "nullable": true,
            "type": "string"
          },
          "aggFn": {
            "description": "Aggregation function (e.g., count, sum, avg)",
            "type": "string"
          },
          "mvColumn": {
            "description": "Materialized view column name",
            "type": "string"
          }
        },
        "required": [
          "aggFn",
          "mvColumn"
        ]
      },
      "ClickStackMaterializedView": {
        "properties": {
          "databaseName": {
            "description": "Database name for the materialized view",
            "type": "string"
          },
          "tableName": {
            "description": "Table name for the materialized view",
            "type": "string"
          },
          "dimensionColumns": {
            "description": "Columns which are not pre-aggregated in the materialized view and can be used for filtering and grouping.",
            "type": "string"
          },
          "minGranularity": {
            "description": "The granularity of the timestamp column",
            "type": "string",
            "enum": [
              "1s",
              "15s",
              "30s",
              "1m",
              "5m",
              "15m",
              "30m",
              "1h",
              "2h",
              "6h",
              "12h",
              "1d",
              "2d",
              "7d",
              "30d"
            ]
          },
          "minDate": {
            "description": "(Optional) The earliest date and time for which the materialized view contains data. If not provided, then HyperDX will assume that the materialized view contains data for all dates for which the source table contains data.",
            "nullable": true,
            "type": "string"
          },
          "timestampColumn": {
            "description": "Timestamp column name",
            "type": "string"
          },
          "aggregatedColumns": {
            "type": "array",
            "description": "Columns which are pre-aggregated by the materialized view",
            "items": {
              "$ref": "#/components/schemas/ClickStackAggregatedColumn"
            }
          }
        },
        "required": [
          "databaseName",
          "tableName",
          "dimensionColumns",
          "minGranularity",
          "timestampColumn",
          "aggregatedColumns"
        ]
      },
      "ClickStackLogSource": {
        "properties": {
          "id": {
            "description": "",
            "type": "string"
          },
          "name": {
            "description": "",
            "type": "string"
          },
          "kind": {
            "description": "",
            "type": "string",
            "enum": [
              "log"
            ]
          },
          "connection": {
            "description": "",
            "type": "string"
          },
          "from": {
            "$ref": "#/components/schemas/ClickStackSourceFrom"
          },
          "querySettings": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/components/schemas/ClickStackQuerySetting"
            }
          },
          "defaultTableSelectExpression": {
            "description": "Default columns selected in search results (this can be customized per search later)",
            "type": "string"
          },
          "timestampValueExpression": {
            "description": "DateTime column or expression that is part of your table's primary key.",
            "type": "string"
          },
          "serviceNameExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "severityTextExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "bodyExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "eventAttributesExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "resourceAttributesExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "displayedTimestampValueExpression": {
            "description": "This DateTime column is used to display and order search results.",
            "nullable": true,
            "type": "string"
          },
          "metricSourceId": {
            "description": "HyperDX Source for metrics associated with logs. Optional",
            "nullable": true,
            "type": "string"
          },
          "traceSourceId": {
            "description": "HyperDX Source for traces associated with logs. Optional",
            "nullable": true,
            "type": "string"
          },
          "traceIdExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "spanIdExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "implicitColumnExpression": {
            "description": "Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log.",
            "nullable": true,
            "type": "string"
          },
          "highlightedTraceAttributeExpressions": {
            "type": "array",
            "description": "Expressions defining trace-level attributes which are displayed in the trace view for the selected trace.",
            "items": {
              "$ref": "#/components/schemas/ClickStackHighlightedAttributeExpression"
            }
          },
          "highlightedRowAttributeExpressions": {
            "type": "array",
            "description": "Expressions defining row-level attributes which are displayed in the row side panel for the selected row.",
            "items": {
              "$ref": "#/components/schemas/ClickStackHighlightedAttributeExpression"
            }
          },
          "materializedViews": {
            "type": "array",
            "description": "Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries.",
            "items": {
              "$ref": "#/components/schemas/ClickStackMaterializedView"
            }
          }
        },
        "required": [
          "id",
          "name",
          "kind",
          "connection",
          "from",
          "defaultTableSelectExpression",
          "timestampValueExpression"
        ]
      },
      "ClickStackTraceSource": {
        "properties": {
          "id": {
            "description": "",
            "type": "string"
          },
          "name": {
            "description": "",
            "type": "string"
          },
          "kind": {
            "description": "",
            "type": "string",
            "enum": [
              "trace"
            ]
          },
          "connection": {
            "description": "",
            "type": "string"
          },
          "from": {
            "$ref": "#/components/schemas/ClickStackSourceFrom"
          },
          "querySettings": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/components/schemas/ClickStackQuerySetting"
            }
          },
          "defaultTableSelectExpression": {
            "description": "Default columns selected in search results (this can be customized per search later)",
            "nullable": true,
            "type": "string"
          },
          "timestampValueExpression": {
            "description": "DateTime column or expression defines the start of the span",
            "type": "string"
          },
          "durationExpression": {
            "description": "",
            "type": "string"
          },
          "durationPrecision": {
            "description": "",
            "type": "integer"
          },
          "traceIdExpression": {
            "description": "",
            "type": "string"
          },
          "spanIdExpression": {
            "description": "",
            "type": "string"
          },
          "parentSpanIdExpression": {
            "description": "",
            "type": "string"
          },
          "spanNameExpression": {
            "description": "",
            "type": "string"
          },
          "spanKindExpression": {
            "description": "",
            "type": "string"
          },
          "logSourceId": {
            "description": "HyperDX Source for logs associated with traces. Optional",
            "nullable": true,
            "type": "string"
          },
          "sessionSourceId": {
            "description": "HyperDX Source for sessions associated with traces. Optional",
            "nullable": true,
            "type": "string"
          },
          "metricSourceId": {
            "description": "HyperDX Source for metrics associated with traces. Optional",
            "nullable": true,
            "type": "string"
          },
          "statusCodeExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "statusMessageExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "serviceNameExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "resourceAttributesExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "eventAttributesExpression": {
            "description": "",
            "nullable": true,
            "type": "string"
          },
          "spanEventsValueExpression": {
            "description": "Expression to extract span events. Used to capture events associated with spans. Expected to be Nested ( Timestamp DateTime64(9), Name LowCardinality(String), Attributes Map(LowCardinality(String), String)",
            "nullable": true,
            "type": "string"
          },
          "implicitColumnExpression": {
            "description": "Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log.",
            "nullable": true,
            "type": "string"
          },
          "highlightedTraceAttributeExpressions": {
            "type": "array",
            "description": "Expressions defining trace-level attributes which are displayed in the trace view for the selected trace.",
            "items": {
              "$ref": "#/components/schemas/ClickStackHighlightedAttributeExpression"
            }
          },
          "highlightedRowAttributeExpressions": {
            "type": "array",
            "description": "Expressions defining row-level attributes which are displayed in the row side panel for the selected row",
            "items": {
              "$ref": "#/components/schemas/ClickStackHighlightedAttributeExpression"
            }
          },
          "materializedViews": {
            "type": "array",
            "description": "Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries.",
            "items": {
              "$ref": "#/components/schemas/ClickStackMaterializedView"
            }
          }
        },
        "required": [
          "id",
          "name",
          "kind",
          "connection",
          "from",
          "timestampValueExpression",
          "durationExpression",
          "durationPrecision",
          "traceIdExpression",
          "spanIdExpression",
          "parentSpanIdExpression",
          "spanNameExpression",
          "spanKindExpression"
        ]
      },
      "ClickStackMetricSource": {
        "properties": {
          "id": {
            "description": "",
            "type": "string"
          },
          "name": {
            "description": "",
            "type": "string"
          },
          "kind": {
            "description": "",
            "type": "string",
            "enum": [
              "metric"
            ]
          },
          "connection": {
            "description": "",
            "type": "string"
          },
          "from": {
            "$ref": "#/components/schemas/ClickStackMetricSourceFrom"
          },
          "querySettings": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/components/schemas/ClickStackQuerySetting"
            }
          },
          "metricTables": {
            "$ref": "#/components/schemas/ClickStackMetricTables"
          },
          "timestampValueExpression": {
            "description": "DateTime column or expression that is part of your table's primary key.",
            "type": "string"
          },
          "resourceAttributesExpression": {
            "description": "Column containing resource attributes for metrics",
            "type": "string"
          },
          "logSourceId": {
            "description": "HyperDX Source for logs associated with metrics. Optional",
            "nullable": true,
            "type": "string"
          }
        },
        "required": [
          "id",
          "name",
          "kind",
          "connection",
          "from",
          "metricTables",
          "timestampValueExpression",
          "resourceAttributesExpression"
        ]
      },
      "ClickStackSessionSource": {
        "properties": {
          "id": {
            "description": "",
            "type": "string"
          },
          "name": {
            "description": "",
            "type": "string"
          },
          "kind": {
            "description": "",
            "type": "string",
            "enum": [
              "session"
            ]
          },
          "connection": {
            "description": "",
            "type": "string"
          },
          "from": {
            "$ref": "#/components/schemas/ClickStackSourceFrom"
          },
          "querySettings": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/components/schemas/ClickStackQuerySetting"
            }
          },
          "timestampValueExpression": {
            "description": "DateTime column or expression that is part of your table's primary key.",
            "nullable": true,
            "type": "string"
          },
          "traceSourceId": {
            "description": "HyperDX Source for traces associated with sessions.",
            "type": "string"
          }
        },
        "required": [
          "id",
          "name",
          "kind",
          "connection",
          "from",
          "traceSourceId"
        ]
      },
      "ClickStackSource": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/ClickStackLogSource"
          },
          {
            "$ref": "#/components/schemas/ClickStackTraceSource"
          },
          {
            "$ref": "#/components/schemas/ClickStackMetricSource"
          },
          {
            "$ref": "#/components/schemas/ClickStackSessionSource"
          }
        ]
      },
      "AssignedRole": {
        "properties": {
          "roleId": {
            "description": "Unique identifier of the role",
            "type": "string",
            "format": "uuid"
          },
          "roleName": {
            "description": "Human-readable name of the role",
            "type": "string"
          },
          "roleType": {
            "description": "Type of role: system (predefined) or custom (organization-defined)",
            "type": "string",
            "enum": [
              "system",
              "custom"
            ]
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
            "description": "DEPRECATED. Use `assignedRoles` instead. Role of the member in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ],
            "deprecated": true
          },
          "joinedAt": {
            "description": "Timestamp the member joined the organization. ISO-8601.",
            "type": "string",
            "format": "date-time"
          },
          "assignedRoles": {
            "type": "array",
            "description": "Custom roles and System roles assigned to this member",
            "items": {
              "$ref": "#/components/schemas/AssignedRole"
            }
          }
        }
      },
      "Invitation": {
        "properties": {
          "role": {
            "description": "DEPRECATED. Use `assignedRoles` instead. Role of the invited user in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect the role assignment that will be applied.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ],
            "deprecated": true
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
          },
          "assignedRoles": {
            "type": "array",
            "description": "Custom roles and System roles that will be assigned to the user when they accept the invitation",
            "items": {
              "$ref": "#/components/schemas/AssignedRole"
            }
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
            "description": "DEPRECATED. Use `assignedRoles` instead. List of roles assigned to the key. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments.",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "developer",
                "query_endpoints"
              ]
            },
            "deprecated": true
          },
          "assignedRoles": {
            "type": "array",
            "description": "Custom roles and System roles assigned to this API key",
            "items": {
              "$ref": "#/components/schemas/AssignedRole"
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
          },
          "enableCoreDumps": {
            "description": "Whether crash reports (core dumps) collection is enabled for services in the organization. When disabled at the organization level, individual services cannot enable crash reports.",
            "type": "boolean"
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
            ]
          },
          "tier": {
            "description": "DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
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
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
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
            "maximum": 236,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum total memory of each replica during auto-scaling in Gb.  Must be a multiple of 4 and lower than or equal to 120* for non paid services or 236* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region. ",
            "type": "number",
            "minimum": 8,
            "maximum": 236,
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
            "description": "DEPRECATED. To associate the service with private endpoints, first create the service, then use the `Update Service Basic Details` endpoint with the `privateEndpointIds` field to modify private endpoints.",
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
              "v1-highmem-xl"
            ]
          },
          "complianceType": {
            "description": "Type of regulatory compliance for service.",
            "type": "string",
            "enum": [
              "hipaa",
              "pci"
            ]
          },
          "tags": {
            "type": "array",
            "description": "Tags associated with the service.",
            "items": {
              "$ref": "#/components/schemas/ResourceTagsV1"
            }
          },
          "enableCoreDumps": {
            "description": "Enables the underlying infra for collecting core dumps. Default is enabled.",
            "type": "boolean"
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
          },
          "tags": {
            "type": "array",
            "description": "Tags associated with the service.",
            "items": {
              "$ref": "#/components/schemas/InstanceTagsPatch"
            }
          },
          "enableCoreDumps": {
            "description": "If true, the underlying infra is enabled for collecting core dumps.",
            "type": "boolean"
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
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
            ]
          },
          "state": {
            "description": "Current state of the service.",
            "type": "string",
            "enum": [
              "starting",
              "stopping",
              "terminating",
              "softdeleting",
              "awaking",
              "partially_running",
              "provisioning",
              "running",
              "stopped",
              "terminated",
              "softdeleted",
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
            "description": "DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
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
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24.",
            "type": "number",
            "minimum": 24,
            "maximum": 1068,
            "multipleOf": 12,
            "example": 48,
            "deprecated": true
          },
          "maxTotalMemoryGb": {
            "description": "DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services.",
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
            "maximum": 236,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum auto-scaling memory in Gb for a single replica . Available only for 'production' services. Must be a multiple of 4 and lower than or equal to 120 for non paid services or 236 for paid services.",
            "type": "number",
            "minimum": 8,
            "maximum": 236,
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
              "v1-highmem-xl"
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
          },
          "tags": {
            "type": "array",
            "description": "Tags associated with the service.",
            "items": {
              "$ref": "#/components/schemas/ResourceTagsV1"
            }
          },
          "enableCoreDumps": {
            "description": "True if the service's underline infra is enabled for collecting core dumps. This is an experimental feature",
            "type": "boolean"
          }
        }
      },
      "ServiceReplicaScalingPatchRequest": {
        "properties": {
          "minReplicaMemoryGb": {
            "description": "Minimum auto-scaling memory in Gb for a single replica. Available only for 'production' services. Must be a multiple of 4 and greater than or equal to 8.",
            "type": "number",
            "minimum": 8,
            "maximum": 236,
            "multipleOf": 4,
            "example": 16
          },
          "maxReplicaMemoryGb": {
            "description": "Maximum auto-scaling memory in Gb for a single replica . Available only for 'production' services. Must be a multiple of 4 and lower than or equal to 120 for non paid services or 236 for paid services.",
            "type": "number",
            "minimum": 8,
            "maximum": 236,
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
            "description": "DEPRECATED. Use `assignedRoleIds` instead. List of roles assigned to the key. Contains at least 1 element.",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "developer",
                "query_endpoints"
              ]
            },
            "deprecated": true
          },
          "assignedRoleIds": {
            "type": "array",
            "description": "Array of role UUIDs to assign to the API key",
            "items": {
              "type": "string",
              "format": "uuid"
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
            "description": "DEPRECATED. Use `assignedRoleIds` instead. List of roles assigned to the key.",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "developer",
                "query_endpoints"
              ]
            },
            "deprecated": true
          },
          "assignedRoleIds": {
            "type": "array",
            "description": "Array of role UUIDs to assign to the API key",
            "items": {
              "type": "string",
              "format": "uuid"
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
            "description": "DEPRECATED. Use `assignedRoleIds` instead. Role of the member in the organization.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ],
            "deprecated": true
          },
          "assignedRoleIds": {
            "type": "array",
            "description": "List of role IDs to assign to the member",
            "items": {
              "type": "string"
            }
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
            "description": "DEPRECATED. Use `assignedRoleIds` instead. Role to assign to the invited user in the organization.",
            "type": "string",
            "enum": [
              "admin",
              "developer"
            ],
            "deprecated": true
          },
          "assignedRoleIds": {
            "type": "array",
            "description": "List of role IDs to assign to the invited user when they accept the invitation",
            "items": {
              "type": "string"
            }
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
            "maximum": 40
          },
          "concurrency": {
            "description": "Number of concurrency to scale to. Use to scale S3 pipes.",
            "nullable": true,
            "type": "integer",
            "minimum": 0,
            "maximum": 34,
            "deprecated": true
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
              "ap-northeast-2",
              "ap-south-1",
              "ap-southeast-1",
              "ap-southeast-2",
              "eu-central-1",
              "eu-west-1",
              "eu-west-2",
              "il-central-1",
              "me-central-1",
              "us-east-1",
              "us-east-2",
              "us-west-2",
              "us-east1",
              "us-central1",
              "europe-west4",
              "asia-southeast1",
              "asia-northeast1",
              "eastus",
              "eastus2",
              "westus3",
              "germanywestcentral",
              "centralus"
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
          },
          "displayName": {
            "description": "Human readable name for infrastructure",
            "type": "string"
          }
        }
      },
      "ByocInfrastructurePatchRequest": {
        "properties": {
          "displayName": {
            "description": "Human readable name for infrastructure object",
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
      "name": "Role Management"
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
    },
    {
      "name": "ClickStack"
    }
  ],
  "x-tagGroups": [
    {
      "name": "Organization",
      "tags": [
        "Organization",
        "Billing",
        "User management",
        "Role Management"
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
    },
    {
      "name": "ClickStack",
      "tags": [
        "ClickStack"
      ]
    }
  ]
} as const;