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
exports.createInquiry = void 0;
const Inquiry_1 = __importDefault(require("../models/Inquiry"));
const createInquiry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, contactNumber, email, fbAccount, messages } = req.body;
        const newInquiry = new Inquiry_1.default({ fullName, contactNumber, email, fbAccount, messages });
        yield newInquiry.save();
        res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
        // console.log('Inquiry submitted successfully:', newInquiry);
    }
    catch (error) {
        res.status(500).json({ message: 'Error submitting inquiry', error });
        // console.error('Error submitting inquiry:', error);
    }
});
exports.createInquiry = createInquiry;
