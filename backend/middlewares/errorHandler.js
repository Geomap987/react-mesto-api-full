/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ message: err.message });
};
module.exports = errorHandler;
