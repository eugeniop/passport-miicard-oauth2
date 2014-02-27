# Passport-miiCard

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [miiCard](http://www.miicard.com/) using the OAuth 2.0 API.

This module lets you authenticate using miiCard in your Node.js applications.
By plugging into Passport, miiCard authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-miiCard

## Usage

#### Configure Strategy

The miiCard authentication strategy authenticates users using a miiCard account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a consumerKey, consumerSecret, and callback URL.

    passport.use(new miiCardStrategy({
        consumerKey: KEY,
        consumerSecret: SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/miicard/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ miiCardId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'miicard'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/miicard',
      passport.authenticate('miicard'));

    app.get('/auth/miicard/callback', 
      passport.authenticate('miicard', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Tests

    $ npm install --dev
    $ make test

## Credits

  - [Eugenio Pace](http://github.com/eugeniop)
  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Eugenio Pace