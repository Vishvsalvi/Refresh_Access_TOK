const jwt = require('jsonwebtoken')
const User = require('../Model/userModel')
require('dotenv').config()

const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies
    if(!cookie?.refreshToken){
        return res.sendStatus(401); // Unauthorized
    }

    
    
    const token = cookie.refreshToken
    
    
    const user = await User.findOne({token}) // Find user with the refresh token
    if(!user){
        return res.status(403); // Forbidden
    }

    console.log(user)

    jwt.verify(
        token, process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || user.email !== decoded.email){ // If there is an error or the email param is tampered (doesn't match with the decoded)
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
                {email: decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '100s' }
            )

            res.json({accessToken}) // Send the access token
        }
    )

}

module.exports = { handleRefreshToken }