import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { AppError } from "@shared/errors/AppError"
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository"
import auth from "@config/auth"

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ") // vem no padrao Bearer token - com [, token] pegamos só oq token

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload

    req.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError("Invalid token!", 401)
  }
}