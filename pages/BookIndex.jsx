import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'

const {useEffect, useState} = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())



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

    if(!books) return <div>Loading...</div>


    return (
        <section className="book-index">
            <h1>Book Index</h1>
            <p>Here you can find all the books you need</p>
            <BookList books={books} />
        </section>
    )
}