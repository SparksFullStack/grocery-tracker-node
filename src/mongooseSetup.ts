import * as Mongoose from 'mongoose'
require('dotenv').config()

const dbLocation = process.env.DATABASE_URL as string

const connectDb = () => {
  return Mongoose.connect(dbLocation, { useNewUrlParser: true, useUnifiedTopology: true })
}

export { connectDb }