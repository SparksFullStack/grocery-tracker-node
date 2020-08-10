import * as Mongoose from 'mongoose'
import { Receipt, People, Month } from './constants'

const receiptSchema: Mongoose.Schema<Receipt> = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    submittedBy: {
        type: People,
        required: true
    },
    amount: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: Month,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    additionalInfo: {
        type: String,
        required: false
    }
})

const ReceiptModel = Mongoose.model('Receipt', receiptSchema)
export default ReceiptModel