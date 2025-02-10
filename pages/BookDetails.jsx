import { bookService } from '../services/book.service.js'

const { useEffect, useState } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {
    const [book, setBook] = useState(null)
    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.getById(selectedBookId)
            .then(book => {
                setBook(book)
            })
    }
    if (!book) return 'Loading...'
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>Price: {book.listPrice.amount}</h2>
            <h2>Book ID: {book.id}</h2>
            <img src={`../BooksImages/1.jpg`} />
            <button onClick={() => onSetSelectedBookId(null)}>Back</button>

        </section>
    )
}