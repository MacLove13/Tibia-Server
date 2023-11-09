import { Player } from '@game/player';
import * as Model from '@models/character';

Player.prototype.Save = function (): void {
  console.log('Saving character')
  Model.Character.update({
    level: this.syncData.Level,
    experience: this.syncData.CurrentExp,
    health: this.syncData.HP,
    max_health: this.syncData.MaxHP,
    position: this.syncData.Position,
    equipments: this.syncData.equipments
  }, {
    where: {
      uuid: this.syncData.UUID
    }
  }).then(result => {
    console.log("Character saved");
  }).catch(err => {
    console.error('Erro ao atualizar:', err);
  });
}
