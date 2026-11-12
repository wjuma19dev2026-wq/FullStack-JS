import mongoose from 'mongoose'

export const connectToDatabase = () => {
  return mongoose.connect(`${process.env.MONGO_URI}`)
}
