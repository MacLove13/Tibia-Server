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
exports.ItemTemplate = void 0;
const sequelize_1 = require("sequelize");
const Database = __importStar(require("@database/connection"));
exports.ItemTemplate = Database.db.define('item_templates', {
    uuid: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    type: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING,
    min_level: sequelize_1.DataTypes.INTEGER,
    vocation: sequelize_1.DataTypes.INTEGER,
    two_hands: sequelize_1.DataTypes.BOOLEAN,
    attack: sequelize_1.DataTypes.INTEGER,
    weight: sequelize_1.DataTypes.FLOAT,
    mergeable: sequelize_1.DataTypes.BOOLEAN,
    heal_hp: sequelize_1.DataTypes.INTEGER,
    image: sequelize_1.DataTypes.STRING,
    defense: sequelize_1.DataTypes.INTEGER,
    slots: sequelize_1.DataTypes.INTEGER,
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at',
    }
});
//# sourceMappingURL=item_template.js.map