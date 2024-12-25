import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [releaseYear, setReleaseYear] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:8000/api/books/")
    const data = await response.json()
    // console.log(data)
    setBooks(data)
  }

  const addBook = async () => {
    const bookData = {
      title: title,
      release_year: releaseYear
    }

    try{
      const response = await fetch("http://localhost:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
      })

      const data = await response.json()
      setBooks((prev) => [...prev, data])
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <h1>Book Website</h1>
      <div>
        <input type="text" placeholder="Boook Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Release Year" onChange={(e) => setReleaseYear(e.target.value)} />
        <button onClick={addBook}>Add Book</button>
      </div>
      {books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.title} Release Year: {book.release_year}</p>
        </div>
      ))}
    </>
  )
}

export default App
