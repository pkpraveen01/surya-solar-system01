// middleware/adminAuth.js
module.exports = (req, res, next) => {
  const token = req.cookies.adminToken;

  if (token === "verified") {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
};
