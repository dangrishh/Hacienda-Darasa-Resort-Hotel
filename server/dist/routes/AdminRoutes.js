"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = require("../controllers/Admin");
const router = express_1.default.Router();
// Register Route
router.post('/register', Admin_1.registerUser);
// Login Route
router.post('/login', Admin_1.loginUser);
exports.default = router;
