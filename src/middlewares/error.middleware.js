module.exports = (err, req, res) => {
  console.error(err);

  res.status(400).json({
    error: err.message || "Something went wrong",
  });
};
