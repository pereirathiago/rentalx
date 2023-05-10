import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_place: string
  fine_amount: number
  brand: string
  category_id: string
}

// @injectable()
class CreateCarUseCase {

  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ 
    name, 
    description, 
    daily_rate, 
    license_place, 
    fine_amount, 
    brand, 
    category_id 
  }: IRequest): Promise<void> {

    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_place)

    await this.carsRepository.create({
      name, 
      description, 
      daily_rate, 
      license_place, 
      fine_amount, 
      brand, 
      category_id 
    })
  }
}

export { CreateCarUseCase }