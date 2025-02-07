"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("../controllers/client");
const router = express_1.default.Router();
// Register Route
router.post('/register', client_1.registerUser);
// Login Route
router.post('/login', client_1.loginUser);
exports.default = router;
