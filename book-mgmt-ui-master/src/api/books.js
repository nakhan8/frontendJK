import api from "./axios";

/* =======================
   MOCK DATA (DEV MODE)
======================= */

const mockBooks = [
  { id: 1, title: "The Kite Runner", author: "Khaled Hosseini", genre: "Fiction", year_published: 2003 },
  { id: 2, title: "Life of Pi", author: "Yann Martel", genre: "Adventure", year_published: 2001 },
  { id: 3, title: "The Road", author: "Cormac McCarthy", genre: "Post-Apocalyptic", year_published: 2006 },
  { id: 4, title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", year_published: 1932 },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", year_published: 1951 },
  { id: 6, title: "Moby Dick", author: "Herman Melville", genre: "Adventure", year_published: 1851 },
  { id: 7, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", year_published: 1813 },
  { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year_published: 1937 },
  { id: 9, title: "The Book Thief", author: "Markus Zusak", genre: "Historical Fiction", year_published: 2005 },
  { id: 10, title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", year_published: 2011 }
];

const mockAuthors = [
  { id: 1, name: "Khaled Hosseini" },
  { id: 2, name: "Yann Martel" },
  { id: 3, name: "Cormac McCarthy" },
  { id: 4, name: "Aldous Huxley" },
  { id: 5, name: "J.D. Salinger" },
  { id: 6, name: "Herman Melville" },
  { id: 7, name: "Jane Austen" },
  { id: 8, name: "J.R.R. Tolkien" },
  { id: 9, name: "Markus Zusak" },
  { id: 10, name: "Yuval Noah Harari" }
];

const mockGenres = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Post-Apocalyptic" },
  { id: 4, name: "Dystopian" },
  { id: 5, name: "Romance" },
  { id: 6, name: "Fantasy" },
  { id: 7, name: "Historical Fiction" },
  { id: 8, name: "Non-Fiction" }
];

let nextId = 11;

/* =======================
   API FALLBACK HANDLER
======================= */

const handleApiError = async (apiCall, mockResponse) => {
  try {
    return await apiCall();
  } catch (error) {
    if (
      error.message === "Network Error" ||
      error.code === "ECONNREFUSED" ||
      error.response?.status >= 500
    ) {
      console.warn("Backend not available, using mock data");
      return { data: mockResponse };
    }
    throw error;
  }
};

/* =======================
   BOOK ENDPOINTS
======================= */

export const getBooks = () =>
  handleApiError(() => api.get("/books"), mockBooks);

export const getBookById = (id) =>
  handleApiError(
    () => api.get(`/books/${id}`),
    mockBooks.find((b) => b.id === Number(id))
  );

export const addBook = (data) =>
  handleApiError(() => api.post("/books", data), (() => {
    const newBook = { ...data, id: nextId++ };
    mockBooks.push(newBook);
    return newBook;
  })());

export const updateBook = (id, data) =>
  handleApiError(() => api.put(`/books/${id}`, data), (() => {
    const index = mockBooks.findIndex((b) => b.id === Number(id));
    if (index !== -1) {
      mockBooks[index] = { ...mockBooks[index], ...data };
      return mockBooks[index];
    }
    return null;
  })());

export const deleteBook = (id) =>
  handleApiError(() => api.delete(`/books/${id}`), (() => {
    const index = mockBooks.findIndex((b) => b.id === Number(id));
    if (index !== -1) {
      mockBooks.splice(index, 1);
      return { message: "Book deleted successfully" };
    }
    return null;
  })());

export const generateSummary = (id) =>
  handleApiError(
    () => api.post(`/books/${id}/generate-summary`),
    { message: "Summary generated successfully" }
  );

export const getBookSummary = (id) =>
  handleApiError(
    () => api.get(`/books/${id}/summary`),
    { summary: "This is a mock summary for the book." }
  );

/* =======================
   AUTHOR ENDPOINTS
======================= */

export const getAuthors = () =>
  handleApiError(() => api.get("/authors"), mockAuthors);

export const createAuthor = (data) =>
  handleApiError(() => api.post("/authors", data), {
    id: Date.now(),
    ...data,
  });

export const updateAuthor = (id, data) =>
  handleApiError(() => api.put(`/authors/${id}`, data), { id, ...data });

export const deleteAuthor = (id) =>
  handleApiError(() => api.delete(`/authors/${id}`), {
    message: "Author deleted successfully",
  });

export const getDropdownAuthors = () =>
  handleApiError(() => api.get("/books/dropdown/authors"), mockAuthors);

/* =======================
   GENRE ENDPOINTS
======================= */

export const getGenres = () =>
  handleApiError(() => api.get("/genres"), mockGenres);

export const createGenre = (data) =>
  handleApiError(() => api.post("/genres", data), {
    id: Date.now(),
    ...data,
  });

export const updateGenre = (id, data) =>
  handleApiError(() => api.put(`/genres/${id}`, data), { id, ...data });

export const deleteGenre = (id) =>
  handleApiError(() => api.delete(`/genres/${id}`), {
    message: "Genre deleted successfully",
  });

export const getDropdownGenres = () =>
  handleApiError(() => api.get("/books/dropdown/genres"), mockGenres);
