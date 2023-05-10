import { Repository, getRepository } from "typeorm"
import { Category } from "../entities/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository"


class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>

    // private static INSTANCE: CategoriesRepository

    constructor() {
        this.repository = getRepository(Category)
    }

    // public static getInstance(): CategoriesRepository{
    //     if(!CategoriesRepository.INSTANCE){
    //         CategoriesRepository.INSTANCE = new CategoriesRepository()
    //     }
    //     return CategoriesRepository.INSTANCE
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        // const category = new Category() 

        // Object.assign(category, {
        //     name,
        //     description,
        //     created_at: new Date()
        // })

        // this.categories.push(category)

        const category = this.repository.create({
            description,
            name
        })

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        // return this.categories

        const categories = await this.repository.find()
        return categories
    }

    async findByName(name: string): Promise<Category> {
        // const category = this.categories.find((category) => category.name === name)
        // return category

        const category = await this.repository.findOne({ name })
        return category
    }
}

export { CategoriesRepository }