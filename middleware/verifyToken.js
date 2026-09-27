const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: { message: "No header or wrong format." },
      statusCode: 401,
    });
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    //store the decoded contents of the token
    decoded = jwt.verify(token, process.env.JWT_SECRET); // if the token is valid and unexpired, this returns the original payload directly and synchronously
  } catch {
    return res.status(401).json({
      error: { message: "Invalid or expired token." },
      statusCode: 401,
    });
  };

  //JWTs are encoded JSON text and converting to JSON turns an ObjectId into its plain string representation. So after jwt.verify() decoded.tenantId is a plain string but req.tenant._id is still an ObjectId object
  if (decoded.tenantId !== req.tenant._id.toString()) {
    return res.status(401).json({
         error: { message: "Token does not match this tenant." },
        statusCode: 401,
    })
  } else {
    req.userId = decoded.userId;

    next();
  }

};

module.exports = verifyToken;