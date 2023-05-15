import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
    )
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another open to the same user ", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "11112",
      expected_return_date: dayAdd24Hours,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1111",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"))
  })

  it("should not be able to create a new rental if there is another open to the same car ", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "1234",
      expected_return_date: dayAdd24Hours,
    })

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1234",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"))
  })

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1234bh",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"))
  })
})