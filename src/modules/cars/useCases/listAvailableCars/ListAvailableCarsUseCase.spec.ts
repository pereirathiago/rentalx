import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {

    const car = carsRepositoryInMemory.create({
      name: "Carro",
      description: "Teste criacao carro",
      daily_rate: 140,
      license_plate: "DEF-12345",
      fine_amount: 100,
      brand: "marca",
      category_id: "5f2d17b8-030b-4ea5-9d2e-3c4a4c53f606"
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to lest all available cars by brand", async () => {
    const car = carsRepositoryInMemory.create({
      name: "Carro",
      description: "Teste criacao carro",
      daily_rate: 140,
      license_plate: "DEF-12345",
      fine_amount: 100,
      brand: "marcatest",
      category_id: "5f2d17b8-030b-4ea5-9d2e-3c4a4c53f606"
    }) 

    const cars = await listAvailableCarsUseCase.execute({
      brand: "marcatest",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to lest all available cars by name", async () => {
    const car = carsRepositoryInMemory.create({
      name: "Carrotest",
      description: "Teste criacao carro",
      daily_rate: 140,
      license_plate: "DEF-12345",
      fine_amount: 100,
      brand: "marcatest",
      category_id: "5f2d17b8-030b-4ea5-9d2e-3c4a4c53f606"
    }) 

    const cars = await listAvailableCarsUseCase.execute({
      name: "Carrotest",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to lest all available cars by category_id", async () => {
    const car = carsRepositoryInMemory.create({
      name: "Carrotest",
      description: "Teste criacao carro",
      daily_rate: 140,
      license_plate: "DEF-12345",
      fine_amount: 100,
      brand: "marcatest",
      category_id: "caterogry_id_test"
    }) 

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "caterogry_id_test",
    })

    expect(cars).toEqual([car])
  })
})