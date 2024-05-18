const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created user
 *                 twId:
 *                   type: string
 *                   description: The Twitter ID of the user
 *                 pubKey:
 *                   type: string
 *                   description: The public key of the user
 *                 twName:
 *                   type: string
 *                   description: The Twitter name of the user
 *                 avatarUrl:
 *                   type: string
 *                   description: The avatar URL of the user
 *                 timeStamp:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created
 */
router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error("Error querying users:", error);
        res.status(500).send("Error querying users");
    }
});

// 新增用户接口

/**
 * @swagger
 * /users/{id}:
 *   post:
 *     summary: Update a new user
 *     description: Update a user with Twitter ID, public key, name, and avatar URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               twId:
 *                 type: string
 *                 description: The Twitter ID of the user
 *               pubKey:
 *                 type: string
 *                 description: The public key of the user
 *               twName:
 *                 type: string
 *                 description: The Twitter name of the user
 *               avatarUrl:
 *                 type: string
 *                 description: The avatar URL of the user
 *             required:
 *               - twId
 *               - twName
 *               - avatarUrl
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created user
 *                 pubKey:
 *                   type: string
 *                   description: The public key of the user
 *                 twName:
 *                   type: string
 *                   description: The Twitter name of the user
 *                 avatarUrl:
 *                   type: string
 *                   description: The avatar URL of the user
 *                 timeStamp:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/users/:id', async (req, res) => {
    console.log(req.body);
    const {pubKey, twName, avatarUrl} = req.body;
    const id = req.params.id;
    try {
        const newUser = await prisma.user.update({
            where: {id},
            data: {
                pubKey,
                twName,
                avatarUrl,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})
module.exports = router;

