"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Route for Superadmin registration (Only accessible by Superadmin)
router.post('/register-superadmin', authMiddleware_1.verifyToken, (0, authMiddleware_1.verifyRole)(['superadmin']), authController_1.registerSuperadmin);
// Route for Client or Co-admin registration
router.post('/register', authController_1.registerClientOrCoAdmin);
exports.default = router;
