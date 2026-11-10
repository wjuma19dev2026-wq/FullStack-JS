import { Router } from "express"
import {
  getProfile,
  getVeterinarios,
  login,
  postProfile,
  postVeterinarios,
} from "../controllers/veterinario.controller.js"
const router = Router()

router.get("/", getVeterinarios)

router.post("/", postVeterinarios)

router.get("/profile", getProfile)

router.post("/profile", postProfile)

router.get("/login", login)

export default router
