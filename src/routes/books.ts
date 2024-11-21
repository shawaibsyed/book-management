import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateBody } from '../middleware/validate';
import { CreateBookDto } from '../dto/CreateBookDto';
import { UpdateBookDto } from '../dto/UpdateBookDto';
import { validateIdParam } from '../middleware/validateIdParam';
import { validateQuery } from '../middleware/validateQuery';
import { HttpError } from '../utils/HttpError';

const prisma = new PrismaClient();
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the book
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           description: Author of the book
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: Publication date of the book
 *         isbn:
 *           type: string
 *           description: ISBN number of the book
 *         pages:
 *           type: integer
 *           description: Number of pages in the book
 *         language:
 *           type: string
 *           description: Language of the book
 *       required:
 *         - title
 *         - author
 *         - publishedDate
 *         - isbn
 *         - pages
 *         - language
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

// Retrieve all books
router.get('/', validateQuery, async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const books = await prisma.book.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    next(new HttpError('Failed to fetch books', 500));
  }
});

// Retrieve a book by ID
router.get('/:id', validateIdParam, async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) {
      return next(new HttpError('Book not found', 404));
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    next(new HttpError('Failed to fetch book', 500));
  }
});

// Add a new book
router.post('/', validateBody(CreateBookDto), async (req, res, next) => {
  const { title, author, publishedDate, isbn, pages, language } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        publishedDate: new Date(publishedDate),
        isbn,
        pages,
        language,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    next(new HttpError('Failed to create book', 500));
  }
});

// Update an existing book
router.put(
  '/:id',
  validateIdParam,
  validateBody(UpdateBookDto),
  async (req, res, next) => {
    const { id } = req.params;
    const { title, author, publishedDate, isbn, pages, language } = req.body;

    try {
      const updatedBook = await prisma.book.update({
        where: { id: Number(id) },
        data: {
          title,
          author,
          publishedDate: publishedDate ? new Date(publishedDate) : undefined,
          isbn,
          pages,
          language,
        },
      });
      res.json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      next(new HttpError('Failed to update book', 500));
    }
  },
);

// Delete a book
router.delete('/:id', validateIdParam, async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    next(new HttpError('Failed to delete book', 500));
  }
});

export default router;
