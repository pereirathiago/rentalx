import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private specifation: Specification[]

    constructor() {
        this.specifation = []
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification()

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        })

        this.specifation.push(specification)
    }

    findByName(name: string): Specification {
        const specifation = this.specifation.find((specification) => specifation.name === name)
        return specifation
    }

}

export { SpecificationRepository }