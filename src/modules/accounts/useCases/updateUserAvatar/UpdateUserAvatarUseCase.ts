
// adicionar coluna avatar na tabela de users
// refatorar usuario com coluna avatar
// configurar upload do multer
// criar regra de negocio do upload
// criar controller

import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { deleteFile } from "../../../../utils/file"

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    user.avatar = avatar_file

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }