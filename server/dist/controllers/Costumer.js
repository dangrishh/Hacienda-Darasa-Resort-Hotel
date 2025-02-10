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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CostumerUsers_1 = __importDefault(require("../models/CostumerUsers"));
// Register Controller
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, facebookName, email, contactNumber, password } = req.body;
    try {
        // Check if the user already exists
        const userExists = yield CostumerUsers_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create new user
        const newUser = new CostumerUsers_1.default({
            fullname,
            facebookName,
            email,
            contactNumber,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
});
exports.registerUser = registerUser;
// Login Controller
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = yield CostumerUsers_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        // Compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});
exports.loginUser = loginUser;
