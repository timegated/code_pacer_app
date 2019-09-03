const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

module.exports = (passport, app, session, User) =>  {
  app.use(session({  
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());  
  app.use(passport.session());
  
  passport.serializeUser((user, done) => {  
    done(null, user);
  });
  
  passport.deserializeUser((userDataFromCookie, done) => {  
    done(null, userDataFromCookie);
  });

  // Checks if a user is logged in
  const accessProtectionMiddleware = (req, res, next) => {  
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({
        message: 'must be logged in to continue',
      });
    }
  };
  
  // Set up passport strategy
  passport.use(new GoogleStrategy(  
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3002/auth/google/callback',
      scope: ['email'],
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    },
  ));


  app.get('/auth/google/callback',  
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  (req, res) => {
    console.log('wooo we authenticated, here is our user object:', req.user);
    // res.json(req.user);
    res.redirect('/');
  }
);

  app.get('/dashboard', accessProtectionMiddleware, (req, res) => {  
    res.json({
      message: 'You have accessed the protected endpoint!',
      yourUserInfo: req.user,
    });
  });

}


