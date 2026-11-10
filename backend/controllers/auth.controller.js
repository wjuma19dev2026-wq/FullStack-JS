import Veterinario from '../models/veterinario.model.js'

export const login = async (req, res) => {
  //- Exists Veterinario
  const { email } = req.body
  const veterinario = await Veterinario.findOne({ email })
  if (!veterinario) {
    return res.status(404).json({ message: "Veterinario dosn't exists" })
  }

  return res.json({ message: 'Auth ' })
}
