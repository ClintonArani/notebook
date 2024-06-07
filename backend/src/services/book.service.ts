import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcryptjs'
import lodash from 'lodash'
import { book } from '../interfaces/book';
import { sqlConfig } from '../config/sql.config';
import Connection from '../dbHelper/dbhelper';

export class userService{

    async registerBook(book:book){

        let book_id = v4() 

            //check if book exists
            let titleExists = (await Connection.query(`SELECT * FROM books WHERE title = '${book.title}'`)).recordset
            
            if(!lodash.isEmpty(titleExists)){       
                return {
                    error: "notebook already in database"
                }
            }

            let result = (await Connection.execute("registerBook", {id:book_id, title: book.title, content: book.content, createdAt: new Date().getTime().toString()})).rowsAffected

            if(result[0] = 1){
                return {
                    message: "Notebook created successfully"
                }
            }else{
                return {
                    error: "Unable to create Notebook"
                }
            }            

    }

    async fetchAllBooks(){
        let pool = await mssql.connect(sqlConfig)

        let result = (await pool.request().execute("getAllBooks")).recordset

        if(result.length == 0){
            return {
                message: "No Notebook at the moment"
            }
        }else{
            return {
                books: result
            }
        }
    }

    async fetchSingleBook(book_id:string){
        let book = await (await Connection.query(`SELECT * FROM books WHERE id = '${book_id}'`)).recordset

        console.log(book);
        
        if(!book[0].id){
            return {
                error: "Notebook not found"
            }
        }else{
            return {
                book: book[0]
            }
        }
    }

}