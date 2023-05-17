import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO"
import { IUserTokenReposiory } from "@modules/accounts/repositories/IUserTokenRepository"
import { UserToken } from "../entities/UserToken"
import { Repository, getRepository } from "typeorm"

class UsersTokenRepository implements IUserTokenReposiory {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({ expires_date, refresh_token, user_id })
    await this.repository.save(userToken)
    return userToken
  }

}

export { UsersTokenRepository }