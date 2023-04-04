const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Replace this with your React app's domain in production
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3005;

// Store user sockets (key: userId, value: socket.id)
const userSockets = new Map();

app.use(cors());

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Authenticate the user and store their socket ID
    socket.on('authenticate', (userId) => {
        userSockets.set(userId, socket.id);
        console.log(`User authenticated: ${userId} with socket ID: ${socket.id}`);
    });

    // Handle incoming messages and broadcast to other users
    socket.on('sendMessage', (message) => {
        console.log('Received message:', message);
        // Find the recipient's socket.id and emit the message to them
        // Assuming only two users are chatting, you can adjust this logic to handle multiple users
        userSockets.forEach((recipientSocketId, userId) => {
            if (userId !== message.sender) {
                io.to(recipientSocketId).emit('newMessage', message);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        // Remove the disconnected user's socket from the userSockets Map
        const userId = [...userSockets.entries()].find(([, value]) => value === socket.id)?.[0];
        if (userId) {
            userSockets.delete(userId);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
