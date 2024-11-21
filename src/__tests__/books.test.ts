import request from 'supertest';
import app from '../index';

let createdBookId: number;

const newBook = {
  title: 'Test Book',
  author: 'John Doe',
  publishedDate: '2024-01-01T00:00:00.000Z',
  isbn: '123-4567890123',
  pages: 100,
  language: 'English',
};

const updatedBook = {
  title: 'Updated Test Book',
  author: 'Jane Doe',
};

describe('Books API', () => {
  it('should retrieve an empty list of books initially', async () => {
    const response = await request(app).get('/books');
    console.log('Books List:', response.body); // Debugging output
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new book', async () => {
    const response = await request(app).post('/books').send(newBook);
    console.log('Response from POST /books:', response.body); // Debugging output
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdBookId = response.body.id;
  });

  it('should retrieve the created book by ID', async () => {
    const response = await request(app).get(`/books/${createdBookId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdBookId);
    expect(response.body.title).toBe(newBook.title);
  });

  it('should update the created book', async () => {
    const response = await request(app)
      .put(`/books/${createdBookId}`)
      .send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedBook.title);
  });

  it('should delete the created book', async () => {
    const response = await request(app).delete(`/books/${createdBookId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for retrieving a deleted book', async () => {
    const response = await request(app).get(`/books/${createdBookId}`);
    expect(response.status).toBe(404);
  });
});
