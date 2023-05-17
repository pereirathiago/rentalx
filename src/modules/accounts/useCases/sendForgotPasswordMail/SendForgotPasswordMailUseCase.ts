import { IUserTokenReposiory } from "@modules/accounts/repositories/IUserTokenRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private usersTokensRepository: IUserTokenReposiory,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}
  async execute(email: string){
    const user = await this.usersRepository.findByEmail(email)
    if(!user) {
      throw new AppError("user does not exists")
    }
    const token = uuidV4()
    const expires_date = this.dateProvider.addHours(3)
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: 
    })

  }
}

export { SendForgotPasswordMailUseCase }