const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET_KEY="ghfñlhvrhg765";

 function createAccessToken(user){
    const payload={
        id:user._id,
        name:user.name,
        lastName:user.lastName,
        email:user.email,
        tokenCreationDate:moment().unix(),
        tokenExpirationDate:moment().add(3,"hours").unix(),

    }

    return jwt.encode(payload, SECRET_KEY);
}

function createRefreshToken(user){
    const payload={
        id:user._id,
        tokenExpirationDate: moment().add(30,"days").unix()
    }
    return jwt.encode(payload,SECRET_KEY);
}

function decodeToken(token){
    return jwt.decode(token, SECRET_KEY,true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeToken
}