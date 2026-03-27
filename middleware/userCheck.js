import jwt from 'jsonwebtoken';




export const userCheck = (req, res, next) => {
  // const token = req.headers.authorization;
  const token = req.cookies?.jwt;

  // console.log(req.cookies);


  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }


}


export const adminCheck = (req, res, next) => {
  if (req.userRole !== "admin") return res.status(403).json({ message: "Forbidden" });
  next();
}