import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";
import { sync } from "glob";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat Service API",
      version: "0.0.0",
      description: "API Documentation for the Chat Service",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      contact: {
        name: "Amir Yari",
        email: "amirreza.yari@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000/api",
        description: "Local Development Server",
      },
    ],
  },
  apis: [
    ...sync(path.join(__dirname, "**", "*.ts")),
    ...sync(path.join(__dirname, "routes", "**", "*.ts")),
    ...sync(path.join(__dirname, "routes", "**", "*.js")),
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
