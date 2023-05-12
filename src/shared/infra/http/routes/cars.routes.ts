import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableController.handle)
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

export { carsRoutes }