const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const client = require('../util/auth.js');
const {TwitterApi} = require('twitter-api-v2');


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
router.get('/api/v1/tweets/:id', async (req, res) => {

    try {
        const tweetId = req.params.id;
        const tweet = await client.get(`tweets/${tweetId}`, {
            // 你可能想要添加扩展字段来获取更多细节
            "tweet.fields": "public_metrics" // 例如，获取创建时间和作者ID
        });
        const likes = tweet.like_count;
        const retweets = tweet.retweet_count;
        const replies = tweet.reply_count;

        res.status(200).json({likes, retweets, replies});
    } catch (error) {
        console.error('Error fetching tweet data:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.post('/api/v1/tweets/postTweet', async (req, res) => {
    // const user = await prisma.user.findFirst({
    //     where: {
    //         twId: req.body.twId,
    //     },
    // });
    // if (!user){
    //     res.status(404).json({ error: '用户不存在！' });
    //     return
    // }
    const client = new TwitterApi({
        appKey: "6UlhQoiD8PNixSO5Lz27GPvg9",
        appSecret: "CdBI2p3ppqCspM1NLGk7JcDd7ikAnG1Txf9QqHrPamSMNXkN8c",
        accessToken: user.token, // User Access Token
        accessTokenSecret: user.tokenSecret // User Access Token Secret
    });
    try {
        const result = await client.v2.post('tweets', {text: 'Excited to be participating in the Chainlink hackathon with our project:meta.X! We appreciate your support and hope you have a wonderful day. Check us out at meta.X:http://www.metax-nft.com/! #ChainlinkHackathon #meta.X'}) //
        console.log('Tweet sent:', result.data);
        res.status(200).json(result.data);
    } catch
        (error) {
        console.error('Error sending tweet:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})


module.exports = router;