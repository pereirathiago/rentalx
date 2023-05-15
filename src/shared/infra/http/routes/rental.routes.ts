import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'

const rentalRoutes = Router()

const createRentalUseCase = new CreateRentalController()

rentalRoutes.post("/", ensureAuthenticated, createRentalUseCase.handle)

export { rentalRoutes }