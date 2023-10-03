"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_1 = __importDefault(require("postgres"));
var sql = (0, postgres_1.default)({
    host: 'localhost',
    port: 5432,
    database: 'seatplandb',
    username: 'postgres',
    password: '_testpassword123', // Password of database user
}); // will use psql environment variables
exports.default = sql;
