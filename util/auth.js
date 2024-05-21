const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: "api",
    version: '2',
    extension: false,
    consumer_key: "JJfymSagEPPujpcDt61ubZRqh",
    consumer_secret: "hXhB1903Bo7cU7BPlpU1B8bQDaWbiuxR14djLCqcpNZjUfIjtA",
    access_token_key: "767369479760248833-x711tV6cTnIIUyUvbAusCrVKRCVx8GT",
    access_token_secret: "4XbodEceGpuWsXlgHis0OWUCoxJBNihhNpPVnUfePuDgD",
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAOoGtwEAAAAAFZkBagjanLnPQPiw4tUog%2Bl8gmU%3DPxYtzTsqUEIdZjJdOvE6AxCBe8eNzHId2C8mrJhct5I4eIdSMQ"
});


module.exports = client;