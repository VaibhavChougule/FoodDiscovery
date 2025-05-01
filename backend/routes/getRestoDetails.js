import express from "express";
import { verifyAdmin } from "../services/verifyResto.js";
import { Restorent } from "../models/Restorent.models.js";

const router = express.Router();

router.post("/api/restaurantDetails", async (req, res) => {
    const token = req.body.ck;

    const { isValid, username } = verifyAdmin(token);

    if (!isValid) {
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }

    try {
        const restaurant = await Restorent.findOne({ RestoId: username });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ message: "Server error while fetching restaurant details" });
    }
});

export { router };
