import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@shared/errors/AppError"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "111111",
      expected_return_date: new Date()
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should be not able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "111111",
        expected_return_date: new Date()
      })
  
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be not able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "111111",
        expected_return_date: new Date()
      })
  
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "111111",
        expected_return_date: new Date()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})