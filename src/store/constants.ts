export interface ResponseError {
  message: string;
  status: string;
  statusCode: number;
}

export interface AuthData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
