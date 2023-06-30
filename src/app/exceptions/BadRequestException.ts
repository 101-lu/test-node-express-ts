import { Exception } from "./Exception"

/**
 * BadRequestException
 */
export class BadRequestException extends Exception {
  constructor(error: any) {
    super(error, 400)
  }
}
