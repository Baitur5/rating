
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Rating',
        description: 'Description',
    },
    host: 'http://66.42.79.23:3000',
    // schemes: ['http'],
};

const outputFile = './swagger.json';
// const endpointsFiles = ['./node_modules/auth_sessions_practice/index.js','./r'];
const endpointsFiles = ['./routes/teachers', './routes/universities.js', './node_modules/auth/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
