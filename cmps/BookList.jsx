import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onSetSelectedBookId, onRemoveBook }) {

    return (
        <section>
            <h2>Book List</h2>
            <ul className="book-list">
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button onClick={() => onSetSelectedBookId(book.id)}>Select</button>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}