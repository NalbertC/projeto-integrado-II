declare namespace Express {
  export interface Request {
    userId: string;
    username: string;
    file?: Express.MulterS3.File;
  }
}
