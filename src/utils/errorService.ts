export class AppError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number = 500) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'AppError';
    };
};
  
export function handleError(error: unknown): AppError {
    if (error instanceof Error) {
      return new AppError(`Internal server error: ${error.message}`);
    }
    return new AppError('Unknown error occurred');
  }