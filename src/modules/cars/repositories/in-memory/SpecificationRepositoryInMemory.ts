import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification()
    Object.assign(specification, {
      description,
      name
    })
    this.specifications.push(specification)
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    )
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specs = this.specifications.filter((spec) => ids.includes(spec.id));
    return specs;
  }

}

export { SpecificationRepositoryInMemory }