// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Productos",
      version: "1.0.0",
      description: "Documentación de la API de productos con ReDoc y Swagger JSDoc",
    },
    servers: [
      {
        url: "http://localhost:3690/api/v1",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: [
            "name",
            "price",
            "description",
            "stock",
            "date_caducity",
            "date_buy",
            "provider",
            "price_buy",
          ],
          properties: {
            name: { type: "string", example: "Cereal Kellogg's" },
            price: { type: "number", example: 45.99 },
            description: { type: "string", example: "Cereal de maíz con miel" },
            stock: { type: "number", example: 100 },
            date_caducity: {
              type: "string",
              format: "date",
              example: "2025-12-31",
            },
            date_buy: {
              type: "string",
              format: "date",
              example: "2025-10-01",
            },
            provider: { type: "string", example: "Proveedor XYZ" },
            price_buy: { type: "number", example: 25.5 },
            image: {
              type: "string",
              example: "https://example.com/product-image.jpg",
            },
          },
        },
      },
    },
  },
  apis: ["./Routes/*.js", "./Controllers/*.js"], // rutas donde están los endpoints
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
