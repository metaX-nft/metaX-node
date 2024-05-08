const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * @swagger
 * /api/v1/tweets/{id}:
 *   get:
 *     summary: Get tweet data by ID
 *     description: Retrieve data of a tweet by its ID, including likes, retweets, and replies.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tweet to retrieve
 *     responses:
 *       200:
 *         description: Tweet data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: integer
 *                   description: The number of likes the tweet has
 *                 retweets:
 *                   type: integer
 *                   description: The number of retweets the tweet has
 *                 replies:
 *                   type: integer
 *                   description: The number of replies the tweet has
 *       500:
 *         description: Internal server error
 */
app.get('/api/v1/tweets/:id', async (req, res) => {
    try {
        const tweetId = req.params.id;
        const tweet = await client.get(`statuses/show`, { id: tweetId });
        const likes = tweet.favorite_count;
        const retweets = tweet.retweet_count;
        const replies = tweet.reply_count;

        res.status(200).json({ likes, retweets, replies });
    } catch (error) {
        console.error('Error fetching tweet data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});