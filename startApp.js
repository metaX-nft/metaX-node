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

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use("/", usersRouter);
app.use("/", taskRouter);


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
      consumerKey: "06SWJNXD7APY8izpj2npKEVWQ",
      consumerSecret: "2KBJuv1clb9PSuYD87yuJhszefmNvoOpH0pixhH4joCgKNBSaC",
      callbackURL: "http://3.27.65.65:3000/auth/twitter/callback",
    },
    async function (token, tokenSecret, profile, done) {
      const ffpId = await insert(profile.id, profile.displayName, profile.photos[0].value);
      return done(null, { ...profile, ffpId: ffpId.toString() });
    }
  )
);

app.get("/api/v2/user/login", function (req, res, next) {
  req.session.referrer = req.url;
  passport.authenticate("twitter")(req, res, next);
});

app.get("/auth/twitter/success", function (req, res, next) {
  res.json({ success: true });
});

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  async function (req, res) {
    res.redirect("/auth/twitter/success");
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
