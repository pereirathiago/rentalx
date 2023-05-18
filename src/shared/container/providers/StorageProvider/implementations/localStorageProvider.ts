import fs from "fs"
import { resolve } from "path"
import { IStorageProvider } from "../IStorageProvider";
import upload from "@config/upload"

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    )

    return file
  }
  delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file)
    try {
      
    }
  }

}