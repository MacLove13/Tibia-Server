"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterList = void 0;
class CharacterList {
    constructor() {
        this.moblist = new Array();
        this.plrlist = new Array();
    }
    AddNewPlayer(plr) {
        this.plrlist.push(plr);
    }
    AddNewMob(mob) {
        this.moblist.push(mob);
    }
    GetAllSyncData() {
        var result = [];
        this.moblist.forEach((val) => {
            result.push(val.GetJSON());
        });
        this.plrlist.forEach((val) => {
            result.push(val.GetJSON());
        });
        return result;
    }
    ForEach(callback) {
        this.ForEachMob(callback);
        this.ForEachPlayer(callback);
    }
    ForEachMob(callback) {
        for (var i = 0; i < this.moblist.length; i++) {
            callback(this.moblist[i]);
        }
    }
    ForEachPlayer(callback) {
        for (var i = 0; i < this.plrlist.length; i++) {
            callback(this.plrlist[i]);
        }
    }
    GetByID(ID) {
        for (var i = 0; i < this.moblist.length; i++) {
            if (this.moblist[i].GetID() === ID) {
                return this.moblist[i];
            }
        }
        for (var i = 0; i < this.plrlist.length; i++) {
            if (this.plrlist[i].GetID() === ID) {
                return this.plrlist[i];
            }
        }
        return null;
    }
    RemoveByID(ID) {
        var tmpChar;
        for (var i = 0; i < this.moblist.length; i++) {
            if (this.moblist[i].GetID() === ID) {
                tmpChar = this.moblist[i];
                this.moblist.splice(i, 1);
                return tmpChar;
            }
        }
        for (var i = 0; i < this.plrlist.length; i++) {
            if (this.plrlist[i].GetID() === ID) {
                tmpChar = this.plrlist[i];
                this.plrlist.splice(i, 1);
                return tmpChar;
            }
        }
        return null;
    }
    GetMobCount() {
        return this.moblist.length;
    }
}
exports.CharacterList = CharacterList;
//# sourceMappingURL=index.js.map