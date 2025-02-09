import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onSelectBook, onRemoveBook }) {
    console.log('books:', books)
    return (
        <section>
            <h2>Book List</h2>
            <ul className="book-list">
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                        <button onClick={() => onSelectBook(book.id)}>Select</button>
                        <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                    </section>
                    </li>
                )}
                </ul>
        </section>
    )
}