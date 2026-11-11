import mongoose from 'mongoose'
import '../types/paciente.type.js'

/** @typedef { import('../types/paciente.type.js').Paciente } Paciente */
/** @typedef { import('mongoose').Model<Paciente> } PacienteModel */

/** @type { mongoose.SchemaDefinition<Paciente> } Crea un modelo de paciente */
const pacienteSchemaDefinition = {
  nombre: {
    type: String,
    required: true,
  },
  propietario: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now(),
  },
  sintoma: {
    type: String,
    required: true,
  },
  veterinario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinario',
  },
}

const pacienteSchema = new mongoose.Schema(pacienteSchemaDefinition, {
  timestamps: true,
})

/** @type { PacienteModel } */
const Paciente = mongoose.model('Paciente', pacienteSchema)

export default Paciente
