import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController{
    constructor(private createCateoryUseCase: CreateCategoryUseCase) {}

    handle(req: Request, res: Response): Response {
        const { name, description } = req.body
    
        this.createCateoryUseCase.execute({ name, description })
    
        return res.status(201).send()
    }

}

export { CreateCategoryController }