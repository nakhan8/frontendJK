# Book Management UI
A **React-based web application** for managing books, documents, users, and **Retrieval-Augmented Generation (RAG)** search, designed to work with the **Book Management Agent (FastAPI backend)**.

## Features
- **Authentication & Authorization**
- **Role-Based Access Control (RBAC)**
- **Books Management**
- **Authors & Genres Management**
- **Document Upload & Management**
- **RAG-Based Semantic Search**
- **Admin User & Role Management**
- **Document Ingestion Pipeline**
- **AI-Generated Summaries**

## Pages
| Route | Description |
|-----|------------|
| `/login` | User login |
| `/books` | List and manage books |
| `/add-book` | Add new book |
| `/author-genre` | Manage authors & genres |
| `/documents` | Upload and manage documents |
| `/rag` | Semantic search (RAG) |
| `/admin/users` | Admin user & role management |
| `/summary` | AI-generated summaries |
| `/ingestion` | Document ingestion status |


## Backend API Requirements
The UI expects the backend server to be running at: http://127.0.0.1:8000

### Authentication
- `POST /auth/login` – Login
- `POST /auth/logout` – Logout

### Books
- `GET /books` – List books
- `POST /books` – Add book (requires `author_id`, `genre_id`)
- `PUT /books/{id}` – Update book
- `DELETE /books/{id}` – Delete book
- `GET /books/dropdown/authors` – Authors for dropdown
- `GET /books/dropdown/genres` – Genres for dropdown

### Authors
- `GET /authors` – List authors
- `POST /authors` – Create author
- `PUT /authors/{id}` – Update author
- `DELETE /authors/{id}` – Delete author

### Genres
- `GET /genres` – List genres
- `POST /genres` – Create genre
- `PUT /genres/{id}` – Update genre
- `DELETE /genres/{id}` – Delete genre

### Documents
- `GET /documents` – List documents
- `POST /documents/upload` – Upload document
- `POST /documents/{id}/summary` – Generate document summary
- `GET /documents/{id}/download` – Download document
- `DELETE /documents/{id}` – Delete document

### RAG Search
- `POST /search?query={query}&limit=5` – Semantic search

### Users & Roles
- `GET /users` – List users
- `POST /users` – Create user
- `PUT /users/{id}` – Update user
- `DELETE /users/{id}` – Delete user
- `GET /roles` – List roles

### Ingestion
- `GET /ingestion/status/{id}` – Get ingestion status
- `GET /ingestion/today-count` – Documents processed today
- `POST /ingestion/trigger/{id}` – Trigger ingestion

## Installation
### Prerequisites
- Node.js 18+
- npm or yarn
- Backend running on `http://127.0.0.1:8000`

### Setup
- git clone <repository-url>
- cd book-mgmt-ui
- npm install

### Development Server
- Run Development server: npm start
- Application would be available at: http://localhost:3000

### Docker Deployment
- Build Image
- docker build -t book-mgmt-ui .

### Run Container
- docker run -p 3000:80 book-mgmt-ui
- Open: http://localhost:3000

### Dependencies
  - React 18
  - React Router DOM
  - Axios – API communication
  - React Data Table Component
  - Modern CSS (responsive design)

### Mock Data Fallback
The UI includes mock data fallbacks for all major API calls. This allows the application to remain usable when the backend is unavailable or under development.

### Project Structure
src/
─ auth/           # Authentication logic & guards 
─ pages/          # Page-level components
─ components/     # Reusable UI components
─ api/            # Axios config & API calls
─ index.css       # Global styles

### Notes
   - This UI is backend-agnostic as long as required APIs are implemented.
   - Designed for scalability, admin workflows, and AI-powered search.
   - Works seamlessly with the FastAPI Book Management Agent.