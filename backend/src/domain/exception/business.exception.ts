export class BusinessException extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string = 'An error occurred in the domain.'
  ) {
    super(message);
  }
}
