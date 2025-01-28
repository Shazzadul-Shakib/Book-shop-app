export interface ISendResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}
