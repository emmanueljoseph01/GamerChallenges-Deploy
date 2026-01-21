import { StatusCodes } from 'http-status-codes';
export function errorHandler(err, _req, res, ) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: err.message,
      details: err.stack
  });
  
}