import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500; // If the token is less than 500 characters, it is our custom token

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'secret');
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
}
};

export default auth;


