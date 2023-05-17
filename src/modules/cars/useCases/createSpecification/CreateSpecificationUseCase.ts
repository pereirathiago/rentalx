import { inject, injectable } from "tsyringe"
import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository"
import { AppError } from "../../../../shared/errors/AppError"

interface IRequest {
    name: string
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationsRepository) {

    }
    
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

        if(specificationAlreadyExists){
            throw new AppError("Specification Already Exists")
        }

        await this.specificationsRepository.create({
            name,
            description,
        })
    }
}

export { CreateSpecificationUseCase }