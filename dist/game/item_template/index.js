"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByName = exports.GetByUUID = exports.GetByID = exports.RemoveAllItemTemplates = exports.ItemTemplate = exports.serverItemTemplates = void 0;
const Str = __importStar(require("@utils/string"));
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
function GetByName(name) {
    let closestMatch = null;
    let smallestDistance = Infinity;
    exports.serverItemTemplates.forEach(item => {
        if (item.name.includes(name)) {
            const distance = Str.levenshteinDistance(name, item.name);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestMatch = item;
            }
        }
    });
    return closestMatch;
}
exports.GetByName = GetByName;
//# sourceMappingURL=index.js.map