import * as Express from 'express'
import ReceiptModel from './receipt'
import { Receipt } from './constants'

const ReceiptsRouter: Express.Router = Express.Router()

ReceiptsRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    const foundRecords = await ReceiptModel.find({})
    return foundRecords.length
        ? res.status(200).json(foundRecords)
        : res.status(404).send("No records found")
})

ReceiptsRouter.get('/month/:month', async (req: Express.Request, res: Express.Response) => {
    const { month } = req.params
    const foundRecords = await ReceiptModel.find({ month })
    return foundRecords.length
        ? res.status(200).json(foundRecords)
        : res.status(404).send("No records found")
})

ReceiptsRouter.get('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const { id } = req.params
        const response = await ReceiptModel.findById(id)
        res.json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})

ReceiptsRouter.get('/people/:person', async (req: Express.Request, res: Express.Response) => {
    try {
        const { person } = req.params
        const response = await ReceiptModel.find({ submittedBy: person })
        res.json(response)
    } catch (e) {
        res.status(400).json(e)
    }
})

ReceiptsRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const data: Receipt = req.body.data
        const newReceiptModel = new ReceiptModel(data)
        const response = await newReceiptModel.save()
        res.json({ id: response._id })
    } catch(e) {
        res.status(400).json(e)
    }
})  

ReceiptsRouter.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const { id } = req.params
        const response = await ReceiptModel.findByIdAndDelete(id)
        res.json({ id: response._id })
    } catch (e) {
        res.status(400).json(e)
    }
})


export default ReceiptsRouter
