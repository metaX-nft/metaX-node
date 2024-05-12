const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: "api",
    consumer_key: "1oVDvboKJwyNXHieNA2uHzA8y",
    consumer_secret: "nr4moro1GMw3wDniz7yyw7GTgsi74Oti7D3WfHKbUzelyGhOdk",
    access_token_key: "767369479760248833-yeSm00IMMgUJnwX7egeoLzp23qmhXfn",
    access_token_secret: "uglhmPN5f5YNBeEren1SCamzRsCL1Opb12zUQ3m9Dbeld"
});


module.exports = client;