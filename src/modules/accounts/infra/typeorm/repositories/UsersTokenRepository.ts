import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO"
import { IUserTokenReposiory } from "@modules/accounts/repositories/IUserTokenRepository"
import { UserToken } from "../entities/UserToken"
import { Repository, getRepository } from "typeorm"

class UsersTokenRepository implements IUserTokenReposiory {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({refresh_token})
    return userToken
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({user_id, refresh_token})
    return usersTokens
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({ expires_date, refresh_token, user_id })
    await this.repository.save(userToken)
    return userToken
  }

}

export { UsersTokenRepository }