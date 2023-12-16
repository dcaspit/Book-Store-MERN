import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


// Route for Save a new Book. post method to create a new resource
router.post('/', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for Get All Books from database
// .get/books is different path then .post/books
router.get('/', async (req, res) => {
    try{
        // Passing empty object to find in order
        // to get all the books from MongoDB (database).
        const books = await Book.find() 

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for Get One Books from database by id
// In order to tag parameter in route we use :
router.get('/:id', async (req, res) => {
    try{
       
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for Update a book
// put method is for updating a source
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({message: 'Book not found'});
        }
        
        return res.status(200).send({message: 'Book updated successfully'});
    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for Delete a Book
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({message: 'Book not found'});
        }
        
        return res.status(200).send({message: 'Book deleted successfully'});
    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;