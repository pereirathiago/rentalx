import { Request, Response } from "express";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";
import { container } from "tsyringe";

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)
    const rentals = await listRentalsByUserUseCase.execute(id)
    return res.json(rentals)
  }
}

export { ListRentalsByUserController }