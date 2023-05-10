import { Repository, getRepository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specification> {
        const specifation = this.repository.findOne({
            name,
        })
        return specifation
    }

}

export { SpecificationRepository }