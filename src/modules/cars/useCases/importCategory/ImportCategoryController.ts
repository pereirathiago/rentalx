import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from "tsyringe";

class ImportCategoryController {

	async handle(req: Request, res: Response): Promise<Response> {
		const { file } = req

		const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

		await importCategoryUseCase.exeucte(file)

		return res.status(201).send()
	}
}

export { ImportCategoryController }