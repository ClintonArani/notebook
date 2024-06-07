import { Request, Response } from "express";
import { bookService} from "../services/book.service";
import { userSchema } from "../validators/book.validators";

let service = new bookService()

export class bookController {

    async createBook(req: Request, res: Response) {
        try {

            let { title, content} = req.body

            let {error} = userSchema.validate(req.body)

            if(error){
                return res.status(401).json({
                    error: error.message
                })
            }

            let result = await service.registerBook(req.body)

            return res.status(201).json(result)

        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async fetchAll(req: Request, res: Response) {
        try {
            let result = await service.fetchAllBooks()

            return res.status(201).json(result)

        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async fetchSingleUser(req:Request, res:Response){
        try {
            let {user_id} = req.params

            let response = await service.fetchSingleUser(user_id)
            
            return res.json(response)

        } catch (error) {
            return res.json({
                error
            })
        }
    }

   

}