
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx';
import { AddReview } from '../cmps/AddReview.jsx';
import { reviewService } from "../services/review.service.js";



export function BookDetails() {
    console.log('AddReview:', AddReview)

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)




    const params = useParams()
    console.log('params:', params)

    useEffect(() => {
        bookService.getNextBookId(params.bookId)
            .then(setNextBookId)
    }, [params.bookId])


    useEffect(() => {
        loadBook()
    }, [params.bookId])


    function loadBook() {
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
    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        setIsLoadingReview(true)
        reviewService.saveReview(book.id, reviewToAdd)
            .then((review => {
                setBook(prevBook => {
                    const reviews = [review, ...prevBook.reviews]
                    return { ...prevBook, reviews }
                })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
            .finally(() => setIsLoadingReview(false))
    }
    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        reviewService.removeReview(book.id, reviewId)
            .then(() => {
                setBook(prevBook => {
                    const filteredReviews = prevBook.reviews.filter(review => review.id !== reviewId)
                    return { ...prevBook, reviews: filteredReviews }
                })
            })
            .finally(() => setIsLoadingReview(false))
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
                <LongTxt txt={description || ''} />
                <hr className='brake-line' />
                <button onClick={onToggleReviewModal}>Add Review</button>
                {isShowReviewModal && (
                    <AddReview
                        toggleReview={onToggleReviewModal}
                        onSaveReview={onSaveReview}
                    />
                )}
            </div>



            <div className="book-details-image">
                <img src={thumbnail} />
            </div>
            <div className="buttons">
                <button><Link to="/bookIndex">Back</Link></button>
                <button>
                    {nextBookId && <Link to={`/bookIndex/${nextBookId}`}>Next Book</Link>}
                </button>



            </div>

        </section>
    )
}
