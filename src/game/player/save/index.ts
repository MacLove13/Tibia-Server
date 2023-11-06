import { Player } from '@game/player';
import { Character } from '@game/character/interface';
import { serverSocket } from '@socket/socket';
import * as GameState from '@game/state';

Player.prototype.Save = function (): void {
  /*
  const query = 'UPDATE characters SET level = $2, experience = $3, health = $4, max_health = $5, position = $6, equipments = $7 WHERE uuid = $1';
  const values = [
    this.syncData.UUID,
    this.syncData.Level,
    this.syncData.CurrentExp,
    this.syncData.HP,
    this.syncData.MaxHP,
    this.syncData.Position,
    this.syncData.equipments
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return console.error('Erro ao executar consulta de atualização', err.stack);
    }

    console.log(`Player ${this.syncData.Name} salvo com sucesso. | ${result.rowCount}`);
  });
  */
}
