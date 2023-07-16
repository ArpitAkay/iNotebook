const jwt = require('jsonwebtoken');
const JWT_SECRET = "somerandomstring"

const fetchusers = (req, res, next) => {
    // Get the user from the jwt token and add email to req object
    let authToken = req.header("Authorization");
    authToken = authToken.substring(7);
    if(!authToken) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }

    try {
        const data = jwt.verify(authToken, JWT_SECRET);
        req.user = data.user
        next();
    }
    catch(error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}


module.exports = fetchusers;