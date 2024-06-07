import { Router } from "express";
import { bookController } from "../controller/book.controller";

let controller = new bookController()

let book_router = Router()

book_router.post('/create', controller.createBook)
book_router.get('/all-books', controller.fetchAll)
book_router.get('/book_id', controller.fetchSingleBook)

export default book_router