import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { userRoutes } from './routes/userRoutes';
import { verifyToken } from './middlewares/authMiddleware';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import connectDB from './db';

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

//Graphql Middleware
app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphql: true, //Enable GraphQl Playground
})
);

// Verify token for all routes under /
app.use('/', verifyToken, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});

export default app;