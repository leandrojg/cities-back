const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
};

module.exports = { catchAsync, errorHandler };
