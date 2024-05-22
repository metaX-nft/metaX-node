const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: "api",
    version: '2',
    extension: false,
    consumer_key: "JJ9cyD5dxu1XDdmg3Lf9KJXLv",
    consumer_secret: "cPy6uW6MHLdHJ8bvAvnGL3GSwWDjDE8sDzCd2qEhRLiDtQDL4t",
    access_token_key: "767369479760248833-9VZxmTHmQZeBavJXSg2dr5BpqBiJoMs",
    access_token_secret: "UxZEZyTh1YyLfbkKbeyLDOIqZgzjL9zzdcEPz7EwjvQKG",
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAOoGtwEAAAAAFZkBagjanLnPQPiw4tUog%2Bl8gmU%3DPxYtzTsqUEIdZjJdOvE6AxCBe8eNzHId2C8mrJhct5I4eIdSMQ"
});


module.exports = client;