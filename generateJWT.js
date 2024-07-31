const Crypto = require('crypto');

function generateJWTKey() {
    return Crypto.randomBytes(64).toString('hex');
}

console.log(generateJWTKey());