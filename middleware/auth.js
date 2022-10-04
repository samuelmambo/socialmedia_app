const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)return res.sendStatus(401);

    jwt.verify(token,"snippet_SecretKEY", (err,user) => {
        if(err) return res.semdStatus(403);
        req.user = user;
        next();
    });
}
function generateAcessToken(username){
    return jwt.sign ({ data: username}, "Snippet_SecretKey", {
        expiresIn: "2h"
    });
}
 module.exports ={
    authenticateToken,
    generateAcessToken 
 }