import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import organization_router from './router/organization.router'
import user_router from './router/book.router'
import auth_router from './router/auth.router'

const app = express()

app.use(json())
app.use(cors())

app.use('/orgs', organization_router)
app.use('/users', user_router)
app.use('/auth', auth_router)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message: err.message
    })
})

let PORT = 5200

app.listen(5200, ()=>{
    console.log(`Server running on port ${PORT} ...`);
})