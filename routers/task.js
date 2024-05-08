const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const client = require("../util/auth");

/**
 * @swagger
 * /api/v2/task/list:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Returns all tasks
 */
router.get("/api/v1/task/list", async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        console.error("Error querying tasks:", error);
        res.status(500).send("Error querying tasks");
    }
});

/**
 * @swagger
 * /api/v1/task/check:
 *   get:
 *     summary: Check if a user follows another user
 *     parameters:
 *       - in: query
 *         name: user
 *         required: true
 *         description: The username of the application user
 *         schema:
 *           type: string
 *       - in: query
 *         name: targetAccount
 *         required: true
 *         description: The username of the task target user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns whether the first user follows the second user
 *       500:
 *         description: Internal server error
 */
router.get("/api/v1/task/check", async (req, res) => {
    try {
        // Get user and target account from query parameters
        const { user, targetAccount } = req.query;

        const isFollowing = await isTaskCompleted(user, targetAccount);

        if (isFollowing) {
            res.json("Task Completed");
        } else {
            res.json("Task Not Completed");
        }
    } catch (error) {
        console.error("Error checking if user A is following user B:", error);
        res.status(500).send("Error checking if user A is following user B");
    }
});

async function isTaskCompleted(user, targetAccount) {

    try {
        const response = await client.get('friends/ids', { screen_name: user });
        const followingIds = response.ids;
        return followingIds.includes(targetAccount);
    } catch (error) {
        console.error("Error checking if user A is following user B:", error);
        throw error;
    }
}

module.exports = router;
