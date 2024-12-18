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
exports.serverSocket = void 0;
const SocketIO = __importStar(require("socket.io"));
const server_1 = require("../server");
exports.serverSocket = new SocketIO.Server(server_1.server, {
    cors: {
        origin: [
            "http://127.0.0.1:3030",
            "http://localhost:3030",
            "http://192.168.0.22:3030",
            "http://0.0.0.0:3030",
            "http://127.0.0.1:2137",
            "http://127.0.0.1:3030",
            "http://192.168.0.22:2137",
            "http://0.0.0.0:2137"
        ],
        methods: ["GET", "POST"],
        credentials: true,
    }
});
exports.serverSocket.on('connect_error', (error) => {
    console.error('Connection Error:', error);
});
// serverSocket.use((socket, next) => {
//   next(new Error('Authentication error'));
// });
console.log('Socket Initialized');
//# sourceMappingURL=socket.js.map