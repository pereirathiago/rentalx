
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-mermory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { AppError } from "@shared/errors/AppError"
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-mermory/UsersTokenRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory
let dateProvider: DayjsDateProvider
let createUserUseCase: CreateUserUseCase

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@test.com",
      password: "1234",
      name: "user test"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")

  })

  it("should be able to authenticate an noexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"))
  })

  it("shold not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@test.com",
      password: "1234",
      name: "user test"
    }

    await createUserUseCase.execute(user)
    await expect(authenticateUserUseCase.execute({
        email: "user@test.com",
        password: "incorrectPassword"
      })
    ).rejects.toEqual(new AppError("Email or passord incorrect"))
  })
})