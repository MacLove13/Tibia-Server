"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByUUID = exports.GetByID = exports.RemoveAllItemTemplates = exports.ItemTemplate = exports.serverItemTemplates = void 0;
exports.serverItemTemplates = Array();
class ItemTemplate {
    toJSON() {
        return {
            uuid: this.uuid,
            name: this.name,
            type: this.type,
            image: this.image
        };
    }
    constructor(data) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.name = data.name;
        this.type = data.type;
        this.description = data.description;
        this.minLevel = data.min_level;
        this.vocation = data.vocation;
        this.twoHands = data.two_hands;
        this.attack = data.attack;
        this.weight = data.weight;
        this.mergeable = data.mergeable;
        this.healHP = data.heal_hp;
        this.image = data.image;
        this.defense = data.defense;
        this.slots = data.slots;
        exports.serverItemTemplates.push(this);
    }
}
exports.ItemTemplate = ItemTemplate;
function RemoveAllItemTemplates() {
    exports.serverItemTemplates = Array();
}
exports.RemoveAllItemTemplates = RemoveAllItemTemplates;
function GetByID(id) {
    return exports.serverItemTemplates.find(item => item.id == id);
}
exports.GetByID = GetByID;
function GetByUUID(uuid) {
    return exports.serverItemTemplates.find(item => item.uuid == uuid);
}
exports.GetByUUID = GetByUUID;
//# sourceMappingURL=index.js.map