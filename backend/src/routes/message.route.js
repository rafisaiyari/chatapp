import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

console.log("Setting up message routes...");

try {
    router.get("/users", protectRoute, getUsersForSidebar);
    console.log("✓ /users route registered");
} catch (e) {
    console.error("✗ Error registering /users:", e.message);
}

try {
    router.get("/:id", protectRoute, getMessages);
    console.log("✓ /:id route registered");
} catch (e) {
    console.error("✗ Error registering /:id:", e.message);
}

try {
    router.post("/send/:id", protectRoute, sendMessage);
    console.log("✓ /send/:id route registered");
} catch (e) {
    console.error("✗ Error registering /send/:id:", e.message);
}

export default router;