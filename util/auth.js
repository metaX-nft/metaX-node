const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: "api",
    consumer_key: "06SWJNXD7APY8izpj2npKEVWQ",
    consumer_secret: "2KBJuv1clb9PSuYD87yuJhszefmNvoOpH0pixhH4joCgKNBSaC",
    access_token_key: "1734142761706934272-USYp3uoc9H49lecMf0wziw00Pd2DYa",
    access_token_secret: "9uSWx2tT2vCwj7I5zCBznofZUA8fQSWMTLNOZLvzXHaXJ"
});


module.exports = client;