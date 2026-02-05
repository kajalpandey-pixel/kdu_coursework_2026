import { useMemo, useState } from 'react'
import './App.css'
import {
  fetchBooksFromData,
  getAvailableBooks,
  getGenres,
  searchBooks,
} from './services/libraryService'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<'All' | string>('All')
  const [minRating, setMinRating] = useState(0)

  const allBooks = fetchBooksFromData()
  const genres = getGenres()

  const filteredBooks = useMemo(() => {
    // Start from search results or full list
    let result = searchQuery ? searchBooks(searchQuery) : allBooks

    if (selectedGenre !== 'All') {
      result = result.filter((book) => book.genre === selectedGenre)
    }

    if (minRating > 0) {
      result = result.filter((book) => book.rating >= minRating)
    }

    return result
  }, [searchQuery, selectedGenre, minRating, allBooks])

  const availableCount = getAvailableBooks().length
  const averageRating =
    allBooks.reduce((sum, book) => sum + book.rating, 0) / allBooks.length

  return (
    <div className="app">
      <header className="header">
        <h1>Book Library Management</h1>
        <p>This is Library Management System , you can filter books .</p>
      </header>

      <section className="controls">
        <input
          className="input"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="input"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value={0}>All Ratings</option>
          <option value={3.5}>3.5+</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>
      </section>

      <section className="stats">
        <div className="stat">
          <span className="stat-label">Total Books</span>
          <span className="stat-value">{allBooks.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Available</span>
          <span className="stat-value">{availableCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Average Rating</span>
          <span className="stat-value">{averageRating.toFixed(1)}</span>
        </div>
      </section>

      <section className="list">
        {filteredBooks.length === 0 ? (
          <div className="empty">No books match your filters.</div>
        ) : (
          filteredBooks.map((book) => (
            <article
              key={book.id}
              className={`card ${book.available ? 'available' : 'unavailable'}`}
            >
              <div className="card-header">
                <h2>{book.title}</h2>
                <span className="badge">
                  {book.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <p className="author">by {book.author}</p>
              <p className="meta">
                {book.genre} • {book.year} • {book.pages} pages
              </p>
              <p className="rating">Rating: {book.rating}/5</p>
              {book.description ? (
                <p className="description">{book.description}</p>
              ) : null}
            </article>
          ))
        )}
      </section>
    </div>
  )
}

export default App
