require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swagger = require("./swagger");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const TwitterStrategy = require("passport-twitter").Strategy;
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require('cors');
const usersRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const twitterRouter = require("./routers/twitter");

const app = express();
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
app.use(express.json());
app.use("/", usersRouter);
app.use("/", taskRouter);
app.use("/", twitterRouter);


app.use(
    session({
        secret: "metx_session_384dw",
        resave: false,
        saveUninitialized: true,
        maxAge: 86400000,
        cookie: {secure: false, sameSite: "Lax"},
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: "6UlhQoiD8PNixSO5Lz27GPvg9",
            consumerSecret: "CdBI2p3ppqCspM1NLGk7JcDd7ikAnG1Txf9QqHrPamSMNXkN8c",
            callbackURL: "http://54.253.4.207:3000/auth/twitter/callback",
        },
        async function (token, tokenSecret, profile, done) {
            console.log(profile,token, tokenSecret)
            const ffpId = await insert(token, tokenSecret, profile.id, profile.displayName, profile.photos[0].value);
            return done(null, {...profile, ffpId: ffpId.toString()});
        }
    )
);

// app.get("", function (req, res, next) {
//   req.session.referrer = req.url;
//   passport.authenticate("/api/v1/user/logintwitter")(req, res, next);
// });

app.get("/", (req, res) => {
    res.send('<a href="/auth/twitter">Login with Twitter</a>');
});

app.get(
    "/auth/twitter",
    passport.authenticate("twitter")
);

app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {failureRedirect: "/login"}),
    async function (req, res) {
        const twId = req.user.id;
        res.redirect(`http://www.metax-nft.com/?twId=${twId}`);
        console.log("session: ", req.session);
    }
);

const FFP_PORT = process.env.FFP_PORT;
app.listen(FFP_PORT, () => {
    console.log("Server is running on port 3000");
});

async function insert(token, tokenSecret, twId, twName, avatarUrl) {
    const existingUser = await prisma.user.findFirst({
        where: {
            twId: twId,
        },
    });
    let user;
    // 如果不存在相同 twId 的用户，则创建新用户
    if (!existingUser) {
        const newUser = await prisma.user.create({
            data: {
                token,
                tokenSecret,
                twId,
                twName,
                avatarUrl,
            },
        });
        user = newUser
        console.log('New user created:', newUser);
    } else {
        user = existingUser
        console.log('User with the same twId already exists:', existingUser);
    }
    return user.id;
}
