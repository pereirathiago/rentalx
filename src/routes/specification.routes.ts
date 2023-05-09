import { Router } from "express"
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationRepository"
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController"

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post("/", createSpecificationController.handle)

export { specificationRoutes }