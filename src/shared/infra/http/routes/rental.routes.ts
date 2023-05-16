import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'

const rentalRoutes = Router()

const createRentalUseCase = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalByUserController = new ListRentalsByUserController()

rentalRoutes.post("/", ensureAuthenticated, createRentalUseCase.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get("/user", ensureAuthenticated, listRentalByUserController.handle)

export { rentalRoutes }