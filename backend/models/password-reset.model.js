import crypto from 'node:crypto'
import { Schema, model } from 'mongoose'

const passwordResetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Veterinario',
    required: true,
  },
  tokenHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // El documento se elimina automáticamente después de 1 hora (TTL index)
  },
  usedAt: {
    type: Date,
    default: null,
  },
})

//- Método para hashear el token (SHA-256 es suficiente y rápido para tokens aleatorios de alta entropía)
passwordResetSchema.statics.hashToken = function (token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

//- Método para comparar un token en claro con el hash almacenado
passwordResetSchema.methods.compareToken = function (token) {
  const hash = this.constructor.hashToken(token)
  return hash === this.tokenHash
}

const PasswordReset = model('PasswordReset', passwordResetSchema)

export default PasswordReset
