import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'

import { BookEdit } from './BookEdit.jsx'

const { Link } = ReactRouterDOM


const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())




    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }



    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => {
                    const removedBook = prevBooks.find(book => book.id === bookId)
                    showSuccessMsg(`Book ${removedBook.title} has been successfully removed!`)
                    return prevBooks.filter(book => book.id !== bookId)
                })
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }



    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <button>
                <Link to="/bookIndex/edit">Add New Book</Link>
            </button>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}