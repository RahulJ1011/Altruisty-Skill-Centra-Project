import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MONGO_URI } from './utils/constants.js';
import http from 'http';
import { Server as socketIO } from 'socket.io';
import socketRouter from './routes/socketRouter.js';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = 5000;

const allowedOrigins = [
  'https://altruisty.site',
  'https://altruisty-company-website.vercel.app',
  'http://localhost:3000'
];

export const userSocketMap = new Map();

const server = http.createServer(app);

const io = new socketIO(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

socketRouter(io);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.json());
app.use('/api', router);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error:', error);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
