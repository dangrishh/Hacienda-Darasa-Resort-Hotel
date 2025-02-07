"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/inquiryRoutes.ts
const express_1 = __importDefault(require("express"));
const guest_1 = require("../controllers/guest");
const router = express_1.default.Router();
router.post('/inquiries', guest_1.createInquiry);
exports.default = router;
