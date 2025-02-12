


export function BookPreview({ book }) {



    return (
        
        <section className="book-preview">
            <h2>{book.title}</h2>
            <h3>Price: {book.listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: book.listPrice.currencyCode })}</h3>
            <h3>Book ID : {book.id}</h3>
            <img src={book.thumbnail} />
        </section>
    )    

}