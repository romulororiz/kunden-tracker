const passport = require('passport');
const User = require('./models/User');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:5000/google/callback',
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			// Use the below code with a database - No user = User will be created. User exists = Log in user
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					console.log(existingUser);
					done(null, existingUser);
				} else {
					new User({
						googleId: profile.id,
						fullName: profile.displayName,
						email: profile.emails[0].value,
						avatar: profile.photos[0].value,
					})
						.save()
						.then(user => done(null, user));
				}
			});

			// return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
