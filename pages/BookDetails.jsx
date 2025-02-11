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
            <span className="book-card-details-info">
                    { book.listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: book.listPrice.currencyCode })}
                </span>            
                <h2>Book ID: {book.id}</h2>
            <img src={`../BooksImages/1.jpg`} />
            <button onClick={() => onSetSelectedBookId(null)}>Back</button>

        </section>
    )
}