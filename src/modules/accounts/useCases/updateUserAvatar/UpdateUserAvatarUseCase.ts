
// adicionar coluna avatar na tabela de users
// refatorar usuario com coluna avatar
// configurar upload do multer
// criar regra de negocio do upload
// criar controller

import { inject } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  user_id: string
  avatar_file: string
}


class UpdateUserAvatarUseCase {

  constructor(
    @inject("UserRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest) {
    const user = await this.usersRepository.findById(user_id)

    user.avatar = avatar_file
  
    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }