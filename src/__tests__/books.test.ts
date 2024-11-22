import request from 'supertest';
import app from '../index'; // Ensure this is the correct import
import { resetDatabase } from './setupTestDB'; // Import from setupTestDB

describe('Books API', () => {
  let createdBookId: number;

  const newBook = {
    title: 'Test Book',
    author: 'Test Author',
    publishedDate: '2023-11-21',
    isbn: '978-3-16-148410-0', // Valid ISBN format
    pages: 200,
    language: 'English',
  };

  const updatedBook = {
    title: 'Updated Test Book',
    author: 'Updated Test Author',
    publishedDate: '2023-12-01',
    isbn: '978-1-4028-9462-6', // Valid ISBN format
    pages: 250,
    language: 'French',
  };

  // Reset the database before and after all tests
  beforeAll(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
  });

  it('should retrieve an empty list of books initially', async () => {
    const response = await request(app).get('/books');
    console.log('Books List:', response.body); // Debugging output
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Ensure the database is clean
  });

  it('should create a new book', async () => {
    const response = await request(app).post('/books').send(newBook);
    console.log('Response from POST /books:', response.body); // Debugging output
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdBookId = response.body.id;
    expect(typeof createdBookId).toBe('number'); // Ensure ID is valid
  });

  it('should retrieve the created book by ID', async () => {
    const response = await request(app).get(`/books/${createdBookId}`);
    console.log('Response from GET /books/:id:', response.body); // Debugging output
    expect(response.status).toBe(200); // Ensure successful retrieval
    expect(response.body).toHaveProperty('id', createdBookId);
    expect(response.body.title).toBe(newBook.title);
  });

  it('should update the created book', async () => {
    const response = await request(app)
      .put(`/books/${createdBookId}`)
      .send(updatedBook);
    console.log('Response from PUT /books/:id:', response.body); // Debugging output
    expect(response.status).toBe(200); // Ensure successful update
    expect(response.body.title).toBe(updatedBook.title);
    expect(response.body.author).toBe(updatedBook.author);
  });

  it('should delete the created book', async () => {
    const response = await request(app).delete(`/books/${createdBookId}`);
    console.log('Response from DELETE /books/:id:', response.body); // Debugging output
    expect(response.status).toBe(204); // Ensure successful deletion
  });

  it('should return 404 for retrieving a deleted book', async () => {
    const response = await request(app).get(`/books/${createdBookId}`);
    console.log('Response from GET /books/:id (deleted):', response.body); // Debugging output
    expect(response.status).toBe(404); // Ensure book is not found
  });
});
