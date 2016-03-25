const Promise = require('bluebird');
const twitter = require('twitter');
const EventEmitter = require('events').EventEmitter;
const events = new EventEmitter();
events.emit = Promise.promisify(events.emit);

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
      _this.TwitterClient.stream('user', function (stream) {
        _this.TwitterClient.get('application/rate_limit_status', function (error, data, response) {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });

        stream.on('data', function (data) {
          if (data.direct_message && data.direct_message.sender.id === 4531940473) {
            events.emit('answer', data.direct_message.text)
            .then(function (data) {
              console.log(data);
            });
          } else {
            events.emit('answer', 'An error acurred');
          }
        });

        stream.on('error', function (error) {
          console.log(error);
        });

        stream.on('disconnect', function (disconnectMessage) {
          stream.start();
        });
      });
    });
  };

  this.send = function (question) {
    return new Promise(function (resolve) {
      _this.TwitterClient; //TODO
    });
  };

  this.onAnswer = function (cb) {
    return events.on('answer', cb);
  };
}

module.exports = tay;
