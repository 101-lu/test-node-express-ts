import { Exception } from "./Exception"

/**
 * NotFoundException
 */
export class NotFoundException extends Exception {
  constructor(error: any) {
    super(error, 404)
  }
}
