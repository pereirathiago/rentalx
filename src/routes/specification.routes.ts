import { Router } from "express"
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationRepository"
import { createSpecificationController } from "../modules/cars/useCases/createSpecification"

const specificationRoutes = Router()

specificationRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res)
})

export { specificationRoutes }