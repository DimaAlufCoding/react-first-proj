import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'


const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)



    useEffect(() => {
        loadBooks()
    }, [filterBy])



    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                // console.log('cars:', cars)
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }


    function onSetSelectedBookId(bookId) {
        setSelectedBookId(bookId)

    }
    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {selectedBookId ?
                <BookDetails
                    onSetSelectedBookId={onSetSelectedBookId}
                    selectedBookId={selectedBookId}
                />
                : <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList
                        books={books}
                        onSetSelectedBookId={onSetSelectedBookId}
                        onRemoveBook={onRemoveBook}
                    />
                </React.Fragment>
            }

        </section>
    )
}