const express = require("express");

const router = express.Router();

const User = require("../models/User");

// =================================
// REGISTER USER API
// POST /api/users/register
// =================================
router.post("/register", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            role: req.body.role,
            phone: req.body.phone,
            address: req.body.address
        });

        await user.save();

        res.status(201).json({
            message: "Registration Successful",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =================================
// GET ALL USERS API
// GET /api/users
// =================================
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =================================
// DELETE USER API
// DELETE /api/users/:id
// =================================
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// =================================
// UPDATE USER STATUS API
// PATCH /api/users/:id
// =================================
router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Status updated successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
