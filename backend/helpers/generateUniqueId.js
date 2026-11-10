import { randomUUID } from 'node:crypto'

export const generateUniqueId = () => {
  return randomUUID()
}
