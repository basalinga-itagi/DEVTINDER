const adminAuth = (req, res, next) => {
  console.log("Received a request");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

module.exports = {
    adminAuth,
};