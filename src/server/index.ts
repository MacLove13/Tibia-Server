import { server } from '../server';
import * as ServerLoop from '@server/loop';

import * as Database from '@database/connection';
import * as Map from '@game/map/load';
import * as ItemTemplate from '@game/item_template/load';

export async function Start() {
  console.log('Start server');
  await Database.init();
  await Map.init();
  await ItemTemplate.Init();

  ServerLoop.Init();

  server.listen(2137, () => {
    console.log('WebSocket server running on port 2137.');
  });
}

import '@game/item/backpack';
