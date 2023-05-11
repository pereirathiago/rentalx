import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
  car: Car[] = []
  async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate }: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    
    Object.assign(car, { brand, category_id, daily_rate, description, fine_amount, name, license_plate })
    
    this.car.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.car.find(car => car.license_plate === license_plate)
  }

}

export { CarsRepositoryInMemory }