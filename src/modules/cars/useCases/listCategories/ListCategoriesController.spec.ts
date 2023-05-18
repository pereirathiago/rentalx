import { app } from "@shared/infra/http/app"
import request from "supertest"
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm"
import { hash } from "bcrypt"
import { v4 as uuidv4 } from 'uuid'

let connection: Connection

describe("List category controller", () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
    const id = uuidv4()
    const password = await hash('admin', 8)
    await connection.query(
      `INSERT INTO USERS(id,name,email,password,"isAdmin", created_at,driver_license) values('${id}', 'admin','admin@rentlx.com.br','${password}',true,'now()','XXXXX')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should ber able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentlx.com.br",
      password: "admin"
    })

    const { refresh_token } = responseToken.body


    await request(app).post("/categories").send({
      name: "Category SuperTest",
      description: "Category supertest"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })

    const response = await request(app).get("/categories")

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty("id")
  })
}) 