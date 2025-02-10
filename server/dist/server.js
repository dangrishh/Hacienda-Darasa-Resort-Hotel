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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const CostumerRoutes_1 = __importDefault(require("./routes/CostumerRoutes"));
const GuestRoutes_1 = __importDefault(require("./routes/GuestRoutes"));
const AdminRoutes_1 = __importDefault(require("./routes/AdminRoutes"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/public/uploads', express_1.default.static(path_1.default.join(__dirname, 'public', 'uploads')));
app.use('/public/files', express_1.default.static(path_1.default.join(__dirname, 'public', 'files')));
// Middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});
// Routes
app.use('/api/guest', GuestRoutes_1.default);
app.use('/api/costumer', CostumerRoutes_1.default);
app.use('/api/admin', AdminRoutes_1.default);
app.get('/', (req, res) => {
    console.log("Hello from express");
    process.stdout.write('Flushed: Hello from express\n'); // ✅ Forces immediate output
    res.send('Hello World from Express and TypeScript');
});
app.get('/welcome', (req, res) => {
    console.log("Welcome endpoint hit!");
    res.send('Hello World');
});
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'your_default_mongo_uri';
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error('Database connection error:', err);
});
