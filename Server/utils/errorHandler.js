// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
    console.error(`Error occurred: ${err.message}`, err);  // Logs detailed error for debugging

    let statusCode = err.statusCode || 500;  // Default to 500 if not provided
    let errorMessage = err.message || 'Internal Server Error';

    // Custom error messages based on the type of error
    if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 400;
        errorMessage = 'Duplicate entry error: the data already exists.';
    } else if (err.code === 'ECONNREFUSED') {
        statusCode = 500;
        errorMessage = 'Database connection was refused.';
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = 'Input validation failed. ' + err.message;
    } else if (err.name === 'EncryptionError') {
        statusCode = 500;
        errorMessage = 'Error encrypting data. ' + err.message;
    }

    // Send the error response
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: errorMessage,
        details: err.details || null,  // Optional additional details
    });
};

module.exports = errorHandler;
