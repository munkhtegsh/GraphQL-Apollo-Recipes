const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GrapQL Express middleware
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

const  {resolvers} = require('./resolvers');
const {typeDefs} = require('./schema');

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Connect to database
mongoose  
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("Error in MongoDB"));


// Initialize application
const app = express();

app.use('/graphiql', graphqlExpress({endpointURL: '/graphql'}));

// Connect schemas with GraphQL
app.use('/graphql', graphqlExpress({
  schema,
  context: {
    Recipe, 
    User
  }
}))

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`)
});