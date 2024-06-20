export interface IResponseMessage<T = unknown> {
  message: string;
  isError: boolean;
  isSuccess: boolean;
  statusCode?: number;
  data?: T;
}

export const responseMessage: IResponseMessage = {
  message: '',
  statusCode: 0,
  isError: false,
  isSuccess: false,
};
