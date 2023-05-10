import { Entity } from "typeorm";

// @Entity()
class Cars {
  id: string
  name: string
  description: string
  daily_rate: number
  license_place: string
  fine_amount: number
  brand: string
  category_id: string
  created_at: Date
}

export { Cars }