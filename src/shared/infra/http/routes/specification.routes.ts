import { Router } from "express"
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

// specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationRoutes }