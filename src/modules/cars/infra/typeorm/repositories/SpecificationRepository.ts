import { Repository, getRepository } from "typeorm"
import { Specification } from "../entities/Specification"
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository"

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = await this.repository.create({
            description,
            name
        })
        
        await this.repository.save(specification)

        return specification
    }

    async findByName(name: string): Promise<Specification> {
        const specifation = await this.repository.findOne({
            name,
        })
        return specifation
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids)
        return specifications
    }
}

export { SpecificationRepository }