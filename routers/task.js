const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/v2/task/list:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Returns all tasks
 */
router.get("/api/v2/task/list", async (req, res) => {
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
 * /api/v2/task/check:
 *   get:
 *     summary: Check if a task is completed
 *     parameters:
 *       - in: query
 *         name: task_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the task to check
 *     responses:
 *       200:
 *         description: Returns whether the task is completed or not
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The status message indicating if the task is completed or not
 */
router.get("/api/v2/task/check", async (req, res) => {
    try {
        const { task_id } = req.query; // Extract task_id from the request query parameters

        // Query the user table to check if the task with task_id is completed
        const user = await prisma.user.findUnique({
            where: {
                task_id: parseInt(task_id) // Assuming task_id is stored in the user table
            }
        });

        if (user && user.completed) {
            res.json({ message: "Task is completed" });
        } else {
            res.json({ message: "Task is not completed" });
        }
    } catch (error) {
        console.error("Error querying tasks:", error);
        res.status(500).send("Error querying tasks");
    }
});


module.exports = router;
