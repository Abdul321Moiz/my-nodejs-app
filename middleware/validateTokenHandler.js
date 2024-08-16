const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization; 

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized", error: err.message });
            }
            req.user = decoded.user; 
            next();
        });
    } else {
        return res.status(401).json({ message: "Authorization header is missing or not properly formatted" });
    }
});

module.exports = validateToken;
