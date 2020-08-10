import * as Express from 'express'
import * as bodyParser from 'body-parser'
import ReceiptsRouter from './receiptsRouter'
import { connectDb } from './mongooseSetup'
require('dotenv').config()

const port: string = process.env.PORT || '3001'
const server: Express.Application = Express()

server.use(function(req, res, next) {
    // TODO: Configure
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

server.use(bodyParser.json())
server.use(Express.urlencoded({ extended: true }))

server.get('/', (req: Express.Request, res: Express.Response) => {
    res.send("howdy, let's track some receipts!")
})

server.use('/receipts', ReceiptsRouter)

connectDb().then(async () => {
    server.listen(port, () => console.log(`the server is listening on port ${port}`))
})