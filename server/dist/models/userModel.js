"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/userModel.ts
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'co-admin', 'superadmin'], default: 'client' },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
