import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Cars } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Cars[] = []
  async create({ brand, category_id, daily_rate, description, fine_amount, name, license_place }: ICreateCarDTO): Promise<void> {
    const car = new Cars()

    Object.assign(car, { brand, category_id, daily_rate, description, fine_amount, name, license_place })

    this.cars.push(car)
  }

}

export { CarsRepositoryInMemory }