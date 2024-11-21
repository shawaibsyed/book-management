# **Book Management API**

## **Overview**
The Book Management API is a RESTful service built using **Node.js**, **Express**, and **TypeScript**. It provides CRUD operations for managing a collection of books in a PostgreSQL database, using **Prisma ORM** for database interaction. The project includes features like validation, error handling, and Swagger API documentation.

---

## **Features**
- **CRUD Operations**:
  - `GET /books`: Retrieve all books.
  - `GET /books/:id`: Retrieve a specific book by ID.
  - `POST /books`: Add a new book.
  - `PUT /books/:id`: Update an existing book.
  - `DELETE /books/:id`: Delete a book by ID.
- **Input Validation**: Ensures request payloads conform to required formats.
- **Error Handling**: Comprehensive error responses for invalid requests.
- **Swagger Documentation**: Interactive API documentation available at `/api-docs`.
- **Unit Tests**: Ensures API functionality with test coverage.

---

## **Technologies Used**
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **TypeScript**: Typed superset of JavaScript for type safety.
- **Prisma ORM**: Database interaction with PostgreSQL.
- **PostgreSQL**: Relational database management system.
- **Jest**: Testing framework.
- **Swagger**: API documentation.
- **ESLint & Prettier**: Code quality and formatting tools.

---

## **Setup and Installation**

### **Prerequisites**
- **Node.js** (version 16+)
- **npm** or **yarn**
- **PostgreSQL** (local instance or cloud-hosted)
- **Git** (optional)

---

### **1. Clone the Repository**
```bash
git clone https://github.com/shawaibsyed/book-management.git
cd book-management
