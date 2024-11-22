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

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', validateQuery, async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const books = await prisma.book.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    res.json(books);
  } catch (error) {
    next(new HttpError('Failed to fetch books', 500));
  }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to retrieve
 *     responses:
 *       200:
 *         description: The book data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get('/:id', validateIdParam, async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) {
      return next(new HttpError('Book not found', 404));
    }
    res.json(book);
  } catch (error) {
    next(new HttpError('Failed to fetch book', 500));
  }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The created book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to create book
 */
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
    next(new HttpError('Failed to create book', 500));
  }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Failed to update book
 */
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
      next(new HttpError('Failed to update book', 500));
    }
  },
);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the book to delete
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       400:
 *         description: Invalid ID parameter
 *       500:
 *         description: Failed to delete book
 */
router.delete('/:id', validateIdParam, async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    next(new HttpError('Failed to delete book', 500));
  }
});

export default router;
