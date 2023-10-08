require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

exports.checkApiKey = async (req, res, next) => {
  if (!req.headers.apikey || req.headers.apikey == "") {
    return res.status(401).json({ message: "apikey headers not valid" });
  }

  const APIKEY = process.env.API_KEY;

  if (req.headers.apikey !== APIKEY) {
    return res.status(401).json({ message: "apikey headers not valid" });
  }

  next();
};
