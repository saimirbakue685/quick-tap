// sophisticated_code.js

/**
 * This code demonstrates a complex implementation of a book management system.
 * It features multiple classes, inheritance, data validation, and advanced search capabilities.
 */

// Utility Functions
function generateRandomID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Base Class for Books
class Book {
  constructor(title, author, publicationDate) {
    this.title = title;
    this.author = author;
    this.publicationDate = new Date(publicationDate);
    this.id = generateRandomID(6);
  }

  getInfo() {
    return `${this.title} by ${this.author}`;
  }
}

// Derived Class for Ebooks
class Ebook extends Book {
  constructor(title, author, publicationDate, format) {
    super(title, author, publicationDate);
    this.format = format;
  }

  getInfo() {
    return `${super.getInfo()} [${this.format.toUpperCase()}]`;
  }
}

// Derived Class for Audiobooks
class Audiobook extends Book {
  constructor(title, author, publicationDate, narrator) {
    super(title, author, publicationDate);
    this.narrator = narrator;
  }

  getInfo() {
    return `${super.getInfo()} (Narrated by ${this.narrator})`;
  }
}

// Catalog Class to Manage Books
class Catalog {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    if (!(book instanceof Book)) {
      throw new Error('Invalid book!');
    }

    this.books.push(book);
  }

  removeBook(book) {
    const index = this.books.indexOf(book);
    if (index > -1) {
      this.books.splice(index, 1);
    } else {
      throw new Error('Book not found!');
    }
  }

  searchByTitle(title) {
    return this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  }

  searchByAuthor(author) {
    return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  searchByPublicationDate(startDate, endDate) {
    return this.books.filter(book => {
      const publicationDate = book.publicationDate.getTime();
      const start = startDate.getTime();
      const end = endDate.getTime();
      return publicationDate >= start && publicationDate <= end;
    });
  }
}

// Example Usage
const catalog = new Catalog();

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '05/20/1925');
const ebook1 = new Ebook('To Kill a Mockingbird', 'Harper Lee', '07/11/1960', 'pdf');
const audiobook1 = new Audiobook('1984', 'George Orwell', '06/08/1949', 'Stephen Fry');

catalog.addBook(book1);
catalog.addBook(ebook1);
catalog.addBook(audiobook1);

console.log(`Total books in catalog: ${catalog.books.length}`);

const searchResults = catalog.searchByPublicationDate(new Date(1900, 0, 1), new Date());
console.log('Books published between 1900 and present:');
searchResults.forEach(book => {
  console.log(`${book.getInfo()} (${formatDate(book.publicationDate)})`);
});