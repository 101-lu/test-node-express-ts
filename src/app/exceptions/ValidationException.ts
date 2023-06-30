import { Exception } from "./Exception"

/**
 * NotFoundException
 */
export class ValidationException extends Exception {
  constructor(error: any) {
    super(error, 400)
  }
}
