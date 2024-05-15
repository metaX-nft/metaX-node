require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swagger = require("./swagger");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const TwitterStrategy = require("passport-twitter").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const usersRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const twitterRouter = require("./routers/twitter");

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use("/", usersRouter);
app.use("/", taskRouter);
app.use("/", twitterRouter);


app.use(
  session({
    secret: "metx_session_384dw",
    resave: false,
    saveUninitialized: true,
    maxAge: 86400000,
    cookie: { secure: false, sameSite: "Lax" },
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
      consumerKey: "1oVDvboKJwyNXHieNA2uHzA8y",
      consumerSecret: "nr4moro1GMw3wDniz7yyw7GTgsi74Oti7D3WfHKbUzelyGhOdk",
      callbackURL: "http://localhost:3000/auth/twitter/callback",
    },
    async function (token, tokenSecret, profile, done) {
      const ffpId = await insert(profile.id, profile.displayName, profile.photos[0].value);
      return done(null, { ...profile, ffpId: ffpId.toString() });
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
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  async function (req, res) {
    res.redirect("/api/v1/task/list");
    console.log("session: ", req.session);
  }
);

const FFP_PORT = process.env.FFP_PORT;
app.listen(FFP_PORT, () => {
  console.log("Server is running on port 3000");
});

async function insert(twId, twName, avatarUrl) {
  const user = await prisma.user.create({
    data: {
      twId: twId,
      twName: twName,
      avatarUrl: avatarUrl,
    },
  });
  return user.id;
}
