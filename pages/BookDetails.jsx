import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx';


const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function BookDetails() {

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)



    const params = useParams()
    console.log('params:', params)

    useEffect(() => {
        bookService.getNextBookId(params.bookId)
            .then(setNextBookId)
    }, [params.bookId])


    useEffect(() => {
        loadBook()
    }, [params.bookId])


    function loadBook(){
        bookService.getById(params.bookId)
        .then(setBook)
        .catch(err => {
            console.log('BookDetails: err in loadBook', err)
        })
    }

    if (!book) return 'Loading...'

    const {
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice,
        pageCount,
        publishedDate,

    } = book


    function getPageCount() {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200 && pageCount < 500) return 'Decent Reading'
        if (pageCount > 100 && pageCount < 200) return 'Light Reading'
    }

    function getPublishedDate() {
        const diffOfPublishedDate = new Date().getFullYear() - publishedDate
        if (diffOfPublishedDate > 10) return 'Vintage Book'
        if (diffOfPublishedDate < 1) return 'New!'
    }

    function getPriceColor() {
        if (listPrice.amount > 150) return { color: "red", padding: "5px" }

        if (listPrice.amount < 20) return { color: "green", padding: "5px" }
    }


    return (
        <section className="book-details">
            <div className="book-details-header">
                <h1>{title}</h1>
            </div>
            {listPrice.isOnSale && <div className="book-details-on-sale">On-sale!</div>}

            <div className="book-details-info">
                <span>Book Pages : {pageCount} - ({getPageCount()})</span>
                <span>Published Date : {publishedDate} - ({getPublishedDate()})</span>
                <span style={getPriceColor()}>
                    Price: {listPrice.amount} {listPrice.currencyCode}
                </span>

                <span>Description :</span>
                <LongTxt txt={description} />

            </div>


            <div className="book-details-image">
                <img src={thumbnail} />
            </div>
            <div className="buttons">
                <button><Link to="/bookIndex">Back</Link></button>
                <button>
                    {nextBookId && <Link to={`/bookIndex/${nextBookId}`}>Next Book</Link>}
                </button>
                <button onClick={() => bookService.addReview(book.id)}>Add Review</button>
            </div>

        </section>
    )
}
