const postVeterinarios = (req, res) => {
  res.json({ url: "Registrar veterinario" })
}

const getVeterinarios = (req, res) => {
  res.json({ url: "Desde API/VETERINARIOS" })
}

const getProfile = (req, res) => {
  res.json({ url: "Mostrando Perfil de Veterinario" })
}

const postProfile = (req, res) => {
  res.json({ url: "Desde API/VETERINARIOS/PROFILE" })
}

const login = (req, res) => {
  res.json({ url: "Desde API/VETERINARIOS/LOGIN" })
}

export { getVeterinarios, postVeterinarios, login, getProfile, postProfile }
