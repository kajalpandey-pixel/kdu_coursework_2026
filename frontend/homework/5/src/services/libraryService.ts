import { bookStorage } from '../data/bookStorage'
import { type Book } from '../types/book'

export const fetchBooksFromData = (): Book[] => {
  // Simple fetch from local array
  return bookStorage
}

export const searchBooks = (query: string): Book[] => {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) {
    console.log('Search results: []')
    return []
  }

  const results = bookStorage.filter(
    (book) =>
      book.title.toLowerCase().includes(trimmed) ||
      book.author.toLowerCase().includes(trimmed),
  )

  console.log('Search results:', results)
  return results
}

export const getAvailableBooks = (): Book[] => {
  return bookStorage.filter((book) => book.available)
}

export const getBooksByYearRange = (
  startYear: number,
  endYear: number,
): Book[] => {
  return bookStorage.filter(
    (book) => book.year >= startYear && book.year <= endYear,
  )
}

export const getGenres = (): Book['genre'][] => {
  return Array.from(new Set(bookStorage.map((book) => book.genre)))
}
