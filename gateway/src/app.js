// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

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
            console.log(`Auth Proxying response: ${req.method} ${req.url}`);
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
