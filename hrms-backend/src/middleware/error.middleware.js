const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  console.log(err);

  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;