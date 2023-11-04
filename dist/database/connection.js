"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.db = void 0;
const sequelize_1 = require("sequelize");
const dbPort = Number(process.env.DB_PORT) || 5432;
const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASS || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_DATABASE || 'server';
const dbType = process.env.DB_TYPE || 'postgres';
const consoleLogs = process.env.DB_CONSOLE_LOG === 'true';
exports.db = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbType,
    port: dbPort,
    logging: consoleLogs,
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.db.authenticate();
            console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
        }
        catch (error) {
            console.error('Não foi possível conectar ao banco de dados:');
            console.error(error);
        }
    });
}
exports.init = init;
process.on('SIGTERM', () => {
    exports.db.close().then(() => {
        console.log('Conexão com o banco de dados fechada.');
        process.exit(0);
    });
});
//# sourceMappingURL=connection.js.map