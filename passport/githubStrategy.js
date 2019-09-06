const GitHubStrategy = require("passport-github");
const { user } = require("../models");
require("dotenv").config();

module.exports = passport => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http:localhost:3000/auth/github/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const getUser = await user.find({
            where: {
              github_addr: profile.emails[0].value,
              provider: "github"
            }
          });
          if (getUSer) {
            done(null, getUser);
          } else {
            const newUser = await user.create({
              userId: profile.id,
              nickname: profile.displayName,
              userImage: profile.photos[0].value,
              github_addr: profile.emails[0].value,
              provider: "github"
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(error);
        }
      }
    )
  );
};
