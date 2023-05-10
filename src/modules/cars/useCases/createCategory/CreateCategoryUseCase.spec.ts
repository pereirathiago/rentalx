import { AppError } from "../../../../shared/errors/AppError"
import { Category } from "../../infra/typeorm/entities/Category"
import { CategoriesRepositoyInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoyInMemory: CategoriesRepositoyInMemory

describe("Create category", () => {
  
  beforeEach(() => {
    categoriesRepositoyInMemory = new CategoriesRepositoyInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoyInMemory)
  })

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category desciption test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })

    const categoryCreated = await categoriesRepositoyInMemory.findByName(category.name)

    console.log(categoryCreated)

    expect(categoryCreated).toHaveProperty("id")
  })

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Category desciption test"
      }
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
      
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError)


  })
})