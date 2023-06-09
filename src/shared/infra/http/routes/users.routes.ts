import { Router } from "express"
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController"
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController"
import multer from "multer"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import uploadConfig from "@config/upload"
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserControlle = new ProfileUserController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle)
usersRoutes.get("/profile", ensureAuthenticated, profileUserControlle.handle)

export { usersRoutes }