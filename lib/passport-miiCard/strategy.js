/**
 * Module dependencies.
 */
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  ,InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The miiCard authentication strategy authenticates requests by delegating to
 * miiCard using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `consumerkey`    your miiCard application's client id
 *   - `consumerSecret` your miiCard application's client secret
 *   - `callbackURL`    URL to which miiCard will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new miiCardStrategy({
 *         consumerkey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/miiCard/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://sts.miicard.com/auth/OAuth2/Authorize';
  options.tokenURL = options.tokenURL || 'https://sts.miicard.com/auth/OAuth2/Token';
  
  OAuth2Strategy.call(this, options, verify);
  this.name = 'miicard';
  
  //this._oauth2.setAccessTokenName("oauth_token");
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from miiCard.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `miicard`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get('https://sts.miicard.com/api/v1/Claims.svc/json', accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try {

      console.log("STRATEGY MIICARD");
      console.log(body);

      var json = JSON.parse(body);
      
      var profile = { provider: 'miicard' };
      profile.id = json['Id'];
      profile.displayName = json['Name'];
      
      profile._raw = body;
      profile._json = json;
      
      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
