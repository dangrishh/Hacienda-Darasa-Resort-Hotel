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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerClientOrCoAdmin = exports.registerSuperadmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const registerSuperadmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, password } = req.body;
    // Ensure only Superadmin can register other Superadmins
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'superadmin') {
        res.status(403).json({ message: 'Access denied' });
        return;
    }
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            name,
            email,
            password: hashedPassword,
            role: 'superadmin',
        });
        yield newUser.save();
        res.status(201).json({ message: 'Superadmin registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerSuperadmin = registerSuperadmin;
const registerClientOrCoAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    if (!['client', 'co-admin'].includes(role)) {
        res.status(400).json({ message: 'Invalid role' });
        return;
    }
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            name,
            email,
            password: hashedPassword,
            role,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerClientOrCoAdmin = registerClientOrCoAdmin;
