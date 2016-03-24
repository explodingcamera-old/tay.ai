const Promise = require('bluebird');
const twitter = require('twitter');

function tay(args) {
  var _this = this;
  this.twitterKeys = {
    consumerKey: args.consumerKey,
    consumerSecret: args.consumerSecret,
    accessTokenKey: args.accessTokenKey,
    accessTokenSecret: args.accessTokenSecret,
  };
  this.connect = function () {
    this.TwitterClient = new twitter({
      consumer_key: _this.twitterKeys.consumerKey,
      consumer_secret: _this.twitterKeys.consumerSecret,
      access_token_key: _this.twitterKeys.accessTokenKey,
      access_token_secret: _this.twitterKeys.accessTokenSecret,
    });
    return new Promise(function (resolve) {
      console.log(_this.TwitterClient);
      _this.TwitterClient.get('application/rate_limit_status', function (error, data, response) {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  };

  this.ask = function (question) {

  };
}

module.exports = tay;
