import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

import * as Database from '@database/connection';
import * as Map from '@game/map/load';

export const app = express();
export const server = createServer(app);
import '@socket/socket';

import '@game/map/update';
import '@game/player/events/connection';

async function Initialize() {
  console.log('Start server');
  await Database.init();
  await Map.init();

  server.listen(2137, () => {
    console.log('WebSocket server running on port 2137.');
  });
}

app.get('/health', (req, res) => {
  res.send('WebSocket Server is running.');
});

import './sentry';

Initialize();
