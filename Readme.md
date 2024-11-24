# **📚 Book-shop-app API**

Welcome to the **Book-shop-app API**! This application provides a seamless way to manage books, orders, and revenue calculations for an online Book-shop-app.

---

## **🚀 Live URL**

Visit the live application: [Book-shop-app API](https://book-shop-app-shazzadul-shakib.vercel.app)

---

## **📖 Table of Contents**

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [API Documentation](#api-documentation)

---

## **💡 About the Project**

The **Book-shop-app API** is a backend service built for managing book inventory, handle orders, and calculate total revenue.

---

## **✨ Features**

- **CRUD Operations**:

  - Add, update, delete, and fetch books.
  - Manage customer orders with validations for stock and pricing.

- **Search Functionality**:

  - Search books by title, author, or category.

- **Revenue Calculation**:

  - Calculate total revenue dynamically using MongoDB aggregation.

- **Validation and Error Handling**:

  - Comprehensive validation for inputs like price, email format, and stock availability.

- **Modern Development Practices**:
  - Modular structure for maintainability.

---

## **🛠 Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Validation**: Mongoose Schema Validations
- **Others**: TypeScript for type safety and better developer experience

---

## **⚙️ Setup and Installation**

Follow these steps to set up the application on your local machine:

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (local or cloud database)
- npm (comes with Node.js)

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Shazzadul-Shakib/Book-shop-app.git
   cd Book-shop-app

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Create a .env file in the root directory: Add the following:**

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   NODE_ENV=development
   ```

4. **Run the application:**

   ```bash
   npm run start:dev
   ```

5. **Access the API locally:**

   ```bash
   http://localhost:5000/api
   ```

## **📋 API Documentation **

### Base URL:

`https://book-shop-app-shazzadul-shakib.vercel.app`

---

### Endpoints

## **Product (Books)**

---

### **1. Create a Book**

- **Endpoint:** **`/api/products`**
- **Request Body:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 10,
  "category": "Fiction",
  "description": "A story about the American dream.",
  "quantity": 100,
  "inStock": true
}
```

- **Response:** Success message and created book details.

```jsx
{
  "message": "Book created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z",
  }
}
```

---

### **2. Get All Books**

- **Endpoint:** **`/api/products`**
- **Response:** A list of all books with details like name, author, price, category, etc.
- Query: A list of all books from the same category, you’ll take this as `/api/products?searchTerm=category` searchTerm can be `title, author, category`

```jsx
{
  "message": "Books retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 10,
      "category": "Fiction",
      "description": "A story about the American dream.",
      "quantity": 100,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z",
    },
    // ... rest data
  ]
}
```

---

### **3. Get a Specific Book**

- **Endpoint:** **`/api/products/:productId`**
- **Response:** The details of a specific book by ID.

```jsx
{
  "message": "Book retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z",
  }
}
```

---

### **4. Update a Book**

- **Endpoint:** **`/api/products/:productId`**
- **Request Body:** (Book details to update)

```json
{
  "price": 15,
  "quantity": 25
}
```

- **Response:** Success message and updated book details.

```jsx
{
  "message": "Book updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 15,  // Price updated
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 25,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z",  // Updated timestamp
  }
}
```

---

### **5. Delete a Book**

- **Endpoint:** **`/api/products/:productId`**
- **Response:** Success message confirming the book has been deleted.

```jsx
{
  "message": "Book deleted successfully",
  "status": true,
  "data": {}
}
```

---

## Orders

---

### **6. Order a Book**

- **Endpoint:** **`/api/orders`**
- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 30
}
```

- **Response:** Success message confirming the order.

```jsx
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 30,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z",
  }
}
```

---

### **7. Calculate Revenue from Orders**

- **Endpoint:** **`/api/orders/revenue`**
- **Response:** The total revenue from all orders.

```jsx
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 450  // Total revenue calculated from all orders
  }
}
```

---
