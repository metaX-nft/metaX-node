const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'API 文档'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'local'
      },
    ]
  },
  apis: ['./routers/*.js'] 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
