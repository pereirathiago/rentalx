import { getConnection } from "typeorm";
import { hash } from 'bcrypt';

import { v4 as uuidv4 } from 'uuid'

import createConnection from '../index'


async function create() {
  const connection = await createConnection('localhost')

  const id = uuidv4()
  const password = await hash('admin', 8)
  await connection.query(
    `INSERT INTO USERS(id,name,email,password,"isAdmin", created_at,driver_license) values('${id}', 'admin','admin@rentlx.com.br','${password}',true,'now()','XXXXX')`
  )
}


create().then(() => { console.log('User Admin created') })