import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for saving a new book
router.post('/', async(req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// Route for getting all books from the database
router.get('/', async (req, res) => {
    try{
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err){
        console.log(err);
        res.status(500).send({message : err.message});
    }
});

// Get a book from database by id
router.get('/:id', async (req, res) => {
    try{

        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (err){
        console.log(err);
        res.status(500).send({message : err.message});
    }
});

// Route for updating one book
router.put('/:id', async (req, res) => {
    try{
        
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: 'Send all required fields: title, author, publishYear'});
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).json({message: 'Book updated successfully'});

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message : err.message});
    }
});

// Route for deleting one book by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }

        return res.status(200).json({message: 'Book deleted successfully'});
    } catch (err){
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
});

export default router;