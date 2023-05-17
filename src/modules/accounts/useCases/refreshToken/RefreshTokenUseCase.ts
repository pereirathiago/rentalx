import auth from "@config/auth"
import { IUserTokenReposiory } from "@modules/accounts/repositories/IUserTokenRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokenReposiory,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute(token: string) {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
    const user_id = sub
    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token)
    if (!userToken) {
      throw new AppError("Refresh token does not exists")
    }

    await this.userTokensRepository.deleteById(userToken.id)
    const expires_date = this.dateProvider.addDays(auth.expires_refrash_token_day)
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    await this.userTokensRepository.create({ expires_date, refresh_token, user_id })

    return refresh_token

  }
}

export { RefreshTokenUseCase }