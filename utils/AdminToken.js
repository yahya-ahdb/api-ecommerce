const jwt = require("jsonwebtoken")

exports.verifyAdmin = async(req , res, next)=>{
    const Authorization = req.headers.authorization;
    if (Authorization) {
      const token = Authorization.split(" ")[1]
      jwt.verify(token, process.env.SEC_JWT, (err, decodedToken) => {
        if (err) return res.status(401).send({message: "Token is not valid!"});
        req.user = decodedToken;
        // next();
        if (decodedToken.isAdmin) {
          req.user =decodedToken
          next();
        } else {
          return res.status(403).send({message :"You are not authorized!"});
        }
      });
    }
}