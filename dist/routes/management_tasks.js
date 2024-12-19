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
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
const express_1 = require("express");
dotenv.config();
const pool = new pg_1.Pool({
    user: "postgres.xajgqatmlarqhwqairwn",
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    password: "Sandbox*12345",
    database: "postgres",
    port: 6543
});
const router = (0, express_1.Router)();
// Create
router.post('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title_task, description, deadline, is_completed, created, updated } = req.body;
        const query = `INSERT INTO tasks(title_task, desription, deadline is_completed, created,updated)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING * `;
        const values = [title_task, description, deadline, is_completed, created, updated];
        const result = yield pool.query(query, values);
        res.json({ status: 'success', data: result.rows[0] });
    }
    catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
}));
// get all reqords
router.get('api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * from tasks');
        res.json({ status: 'success', data: result.rows });
    }
    catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
}));
exports.default = router;
