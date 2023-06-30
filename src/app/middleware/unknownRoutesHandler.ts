import { NotFoundException } from "../exceptions/NotFoundException"

/**
 * unknownRoutesHandler
 */
export const unknownRoutesHandler = () => {
  throw new NotFoundException(`resource not found`)
}
