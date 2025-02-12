// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import fetch from 'node-fetch';

const app = express();

//GraphQl Schema
const schema = buildSchema(`
    type User {
        id: ID!
        userName: String
        password: String
        name: String
        email: String
        age: Int
    }
    type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }
`);

//Resolvers
const root = {
    getUser: async ({ id }) => {
        const response = await fetch(`http://${process.env.NODE_ENV != 'production' ? 'localhost' : 'user-service'}:4002/graphql`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: `{ getUser(id: "${id}") {id userName name email}}` })
        });
        const data = await response.json();
        return data.data.getUser;
    }
}

//Attach GraphQl Middleware
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphql: true
}));

// Connect to Redis in order to use RedisStore for rate limiting
// Note that the host is set to "localhost" when running in development mode
// and to "redis" when running in production mode, so that the container can find the Redis service
const redisClient = createClient({
    socket: {
        host: process.env.NODE_ENV != 'production' ? 'localhost' : 'redis',
        port: 6379
    }
});
redisClient.connect().catch(console.error);

const limiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args), // Connect Redis with rate limiter
    }),
    windowMs: 1 * 50 * 1000, // 15 minutes window
    max: 10, // Limit each IP to 10 requests per windowMs
    // message: "Too many requests, please try again later.", // Message sent when rate limit is exceeded
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler: (req, res, next) => {
        console.warn(`Rate limit exceeded for IP ${req.headers["x-forwarded-for"] || req.ip} at ${new Date().toISOString()}`);
        res.status(429).json({ error: "Too many requests, try again later." });
    }
});

app.use(limiter);

// Proxy middleware for /auth endpoint
app.use('/auth', createProxyMiddleware({
    target: `http://${process.env.NODE_ENV != 'production' ? 'localhost' : 'auth-service'}:4001`, // Target server for auth service
    changeOrigin: true, // Change the origin of the host header to the target URL
    pathRewrite: {
        '^/auth': '' // Remove /auth prefix when forwarding to the target
    },
    on: {
        // Handle proxy request events
        proxyReq: (proxyReq, req, res) => {
            console.log(`Auth Proxying request: ${req.method} ${req.url}`);
        },
        // Handle proxy response events
        proxyRes: (proxyRes, req, res) => {
            console.log(`Auth Proxying response: ${req.method} ${req.url} ${res.statusCode}`);
        },
        // Handle proxy error events
        error: (err, req, res) => {
            console.error('Error in auth proxy:', err);
            res.status(500).send('Something went wrong with the proxy!');
        },
    },
}));

// Proxy middleware for /user endpoint
app.use('/user', createProxyMiddleware({
    target: `http://${process.env.NODE_ENV != 'production' ? 'localhost' : 'user-service'}:4002`, // Target server for user service
    changeOrigin: true, // Change the origin of the host header to the target URL
    pathRewrite: {
        '^/user': '' // Remove /user prefix when forwarding to the target
    },
    on: {
        // Handle proxy request events
        proxyReq: (proxyReq, req, res) => {
            console.log(`User Proxying request: ${req.method} ${req.url}`);
        },
        // Handle proxy response events
        proxyRes: (proxyRes, req, res) => {
            console.log(`User Proxying response: ${req.method} ${req.url}`);
        },
        // Handle proxy error events
        error: (err, req, res) => {
            console.error('Error in user proxy:', err);
            res.status(500).send('Something went wrong with the proxy!');
        },
    },
}));

// Test endpoint to check if the server is running
app.get("/test", (req, res) => {
    res.send("success");
});

export default app;
