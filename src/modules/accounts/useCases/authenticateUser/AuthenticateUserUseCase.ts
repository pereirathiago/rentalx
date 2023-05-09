import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../errors/AppError"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // user existe
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new AppError("Email or password incorrect")
    }

    // senha correta
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new AppError("Email or passord incorrect")
    }

    // gerar jwt
    const token = sign({}, "8c278462dc2f486dd9697edc17eff391", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }