import { Response } from 'express';
import { ISendResponse } from '../interface/response';

export const SendResponse = <T>(res: Response, data: ISendResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    statusCode: data?.statusCode,
    data: data?.data,
  });
};
