/**
 * Exception
 */
export class Exception implements ApiException {
  constructor(readonly error: any, readonly status: number) {}
}
export interface ApiException {
  error: any
  status: number
}
