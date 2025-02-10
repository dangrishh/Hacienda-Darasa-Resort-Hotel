"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/inquiryRoutes.ts
const express_1 = __importDefault(require("express"));
const Guest_1 = require("../controllers/Guest");
const router = express_1.default.Router();
router.post('/inquiries', Guest_1.createInquiry);
router.get('/welcome', (req, res) => {
    res.send('Hello World');
});
exports.default = router;
