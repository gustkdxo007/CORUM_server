const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { user } = require("../models");
require("dotenv").config();

// ( 2, 4 )
module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      // 여기서 저만의 인증번호를 날려줌
      async (accessToken, refreshToken, profile, done) => {
        // doen(에러, 성공, 실패)
        try {
          // 우리디비에서 회원을 저장시키기
          const getUser = await user.find({
            where: {
              contact_email: profile.emails[0].value,
              provider: "google"
            }
          });
          if (getUser) {
            done(null, getUser); // done이 성공이 된다면 serializeUser 으로 콜백으로 보냄
          } else {
            // console.log(['PROFILE-CHECK'],profile);
            const newUser = await user.create({
              userId: profile.id,
              nickname: profile.displayName,
              userImage: profile.photos[0].value,
              contact_email: profile.emails[0].value, // emails: [ { value : 'suyang@gmail.com', type: 'account' } ]
              provider: "google"
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
