import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UserToken } from "../infra/typeorm/entities/UserToken"

interface IUserTokenReposiory {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken>
}

export { IUserTokenReposiory }