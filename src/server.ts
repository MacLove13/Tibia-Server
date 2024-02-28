import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();
export const server = createServer(app);
import '@socket/socket';

import '@game/map/update';
import '@game/player/events/connection';
import * as Server from '@server/index';

Server.Start();

app.get('/health', (req, res) => {
  res.send('WebSocket Server is running.');
});

import '@game/chat';
import '@game/admin/commands';

import './sentry';
