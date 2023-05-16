import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'

const rentalRoutes = Router()

const createRentalUseCase = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalRoutes.post("/", ensureAuthenticated, createRentalUseCase.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)

export { rentalRoutes }