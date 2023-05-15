import { app } from "@shared/infra/http/app"
import request from "supertest"

describe("Create category controller", async () => {
  it("should ber able to create a new category", async () => {
    const response = await request(app).post("/categories").send({
      name: "Category SuperTest",
      description: "Category supertest"
    })

    expect(response.status).toBe(201)
  })
}) 