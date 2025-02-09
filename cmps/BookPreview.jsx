
export function BookPreview({ book }) {
    console.log(book)
    return (
        
        <section className="book-preview">
            <h2>{book.title}</h2>
            <h3>Price: {book.listPrice.amount}</h3>
            <img src={`../BooksImages/1.jpg`} />
        </section>
    )    

}