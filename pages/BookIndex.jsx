import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBook] = useState(null)



    useEffect(() => {
        loadBooks()
    }, [])



    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                // console.log('cars:', cars)
                setBooks(books)
            })
    }

    if (!books) return <div>Loading...</div>


    function onSelectBookId(bookId) {
        const book = books.find(book => book.id === bookId)
        setSelectedBook(book)

    }
    return (
        <section className="book-index">                
            <BookList books={books} />
        </section>
    )
}