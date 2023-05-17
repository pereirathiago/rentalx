import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError"
import { IUserTokenReposiory } from "@modules/accounts/repositories/IUserTokenRepository"
import auth from "@config/auth"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  }
  token: string,
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokenRepository: IUserTokenReposiory,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // user existe
    const user = await this.usersRepository.findByEmail(email)
    const { expires_in_token, secret_refresh_token, secret_token, expires_in_refresh_token, expires_refrash_token_day } = auth

    if(!user) {
      throw new AppError("Email or password incorrect")
    }

    // senha correta
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new AppError("Email or passord incorrect")
    }

    // gerar jwt
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refrash_token_day)

    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }