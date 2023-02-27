const errorMiddleware = (error, _req, res, _next) => {
  const { status, message } = error;
  res.status(status || 500).json({ message });
};

class HttpException extends Error {
  status;

  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  errorMiddleware,
  HttpException,
};