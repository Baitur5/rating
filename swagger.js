
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: 'localhost:3000',
    // schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./node_modules/auth_sessions_practice/index.js', './node_modules/auth_sessions_practice/models/User.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
