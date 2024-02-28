require('module-alias/register');

import express from 'express';
const fs = require('fs');
const path = require('path');
import * as https from 'https';
import { Request, Response } from 'express'; // Se estiver usando Express

import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs/privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
};

export const server = https.createServer(options, app);
// export const server = createServer(options, app);
import '@socket/socket';

import '@game/map/update';
import '@game/player/events/connection';
import * as Server from '@server/index';

Server.Start();

app.get('/health', (req, res) => {
  res.send('WebSocket Server is running. (HTTPS)');
});

import '@game/chat';
import '@game/admin/commands';

import './sentry';
