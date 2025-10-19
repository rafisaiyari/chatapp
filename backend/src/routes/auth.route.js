import express from "express";
import { login, logout, signup, checkAuth, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

console.log("Setting up auth routes...");

try {
    router.post("/signup", signup);
    console.log("✓ /signup route registered");
} catch (e) {
    console.error("✗ Error registering /signup:", e.message);
}

try {
    router.post("/login", login);
    console.log("✓ /login route registered");
} catch (e) {
    console.error("✗ Error registering /login:", e.message);
}

try {
    router.post("/logout", logout);
    console.log("✓ /logout route registered");
} catch (e) {
    console.error("✗ Error registering /logout:", e.message);
}

try {
    router.put("/update-profile", protectRoute, updateProfile);
    console.log("✓ /update-profile route registered");
} catch (e) {
    console.error("✗ Error registering /update-profile:", e.message);
}

try {
    router.get("/check", protectRoute, checkAuth);
    console.log("✓ /check route registered");
} catch (e) {
    console.error("✗ Error registering /check:", e.message);
}

export default router;