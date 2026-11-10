import mongoose from 'mongoose'
import argon2 from 'argon2'

const veterinarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      default: null,
      trim: true,
    },
    web: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: Date.now(),
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

veterinarioSchema.pre('save', async function (next) {
  // Solo hashear si el campo 'password' fue modificado
  if (!this.isModified('password')) next()
  // Hashear una contraseña (la sal se genera automáticamente)
  const hashedPassword = await argon2.hash(this.password)
  this.password = hashedPassword
})

const Veterinario = mongoose.model('Veterinario', veterinarioSchema)

export default Veterinario
