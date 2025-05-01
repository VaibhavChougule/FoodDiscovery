import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



// Verify token and extract username
function verifyAdmin(token) {
    if (!token) {
        return { isValid: false, username: null };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return { isValid: true, username: decoded.username };
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return { isValid: false, username: null };
    }
}

export {verifyAdmin};
