import { bookService } from "../services/book.service";

const { useEffect, useState } = React

export function BookDetails({ }){
    const [book, setBook] = useState(null)
    useEffect(() => {
        loadBook()
    }, [])
    
    function loadBook() {
        bookService.getById(bookId)
            .then(book => {
                setBook(book)
            })
    }
    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>Price: {book.listPrice.amount}</h2>
            <h2>Book ID: {book.id}</h2>
            <img src={`../BooksImages/${book.id}.jpg`} />
        </section>
    )
}