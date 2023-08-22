//  middleware for handling Route Not Found


const handleRouteNotFound = (req, res, next) => {
    const error = new Error("Route Not Found");
    error.status = 404;
    next(error);
  };
  
  // Error handling middleware
  const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
  
    console.error(error);
  
    res.status(status).json({ error: message });
  };
  
  module.exports = { handleRouteNotFound, errorHandler };