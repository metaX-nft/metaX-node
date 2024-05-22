const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: "api",
    version: '2',
    extension: false,
    consumer_key: "6UlhQoiD8PNixSO5Lz27GPvg9",
    consumer_secret: "CdBI2p3ppqCspM1NLGk7JcDd7ikAnG1Txf9QqHrPamSMNXkN8c",
    access_token_key: "767369479760248833-cpZXwqapnXXTNOEfwi73jWjzgxTj9y1",
    access_token_secret: "XiUHErB9CCkGRUIVMCdwCwMNke8Fz79iiS7veIvZjuB4D",
    bearer_token: "AAAAAAAAAAAAAAAAAAAAAOoGtwEAAAAAFZkBagjanLnPQPiw4tUog%2Bl8gmU%3DPxYtzTsqUEIdZjJdOvE6AxCBe8eNzHId2C8mrJhct5I4eIdSMQ"
});


module.exports = client;