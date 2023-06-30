import { Exception } from "./Exception"

/**
 * InternalServerException
 */
export class InternalServerException extends Exception {
  constructor(error: any) {
    super(error, 500)
  }
}
