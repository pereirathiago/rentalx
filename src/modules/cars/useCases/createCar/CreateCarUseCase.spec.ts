import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"
import { AppError } from "@shared/errors/AppError"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({ 
      name: "Name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
     })

     expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "car",
      description: "car description",
      daily_rate: 100,
      license_plate:"ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    })
    await expect(createCarUseCase.execute({
        name: "car2",
        description: "car description",
        daily_rate: 100,
        license_plate:"ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
      })
    ).rejects.toEqual(new AppError("Car already exists!"))
  })

  it("should not be able to create a car with avalible true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "car available",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    })

    expect(car.available).toBe(true)
  })
})