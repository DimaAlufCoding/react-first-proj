import { bookService } from "../services/book.service.js";

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    console.log('bookToEdit:', bookToEdit)


    const { bookId } = useParams()
    console.log('bookId:', bookId)


    useEffect(() => {
        if (bookId) loadBook()
    }, [])


    function loadBook() {
        bookService.getById(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('BookDetails: err in loadBook', err)
            })
    }


    function onSubmitForm(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log('savedBook:', savedBook)
                navigate('/bookIndex')
            })
            .catch(err => console.log('err:', err))
    }


    function onHandleChange({ target }) {
        // console.log('target:', target)
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        // console.log('field:', field)
        // console.log('value:', value)
        setBookToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

    }


    const { title, price } = bookToEdit

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Book Edit' : 'Book Add '}</h1>

            <form onSubmit={onSubmitForm}>
                <label htmlFor="txt">Book Name</label>
                <input
                    name="title"
                    value={title || ''}
                    onChange={onHandleChange}
                    type="text"
                    id="txt"
                />

                <label htmlFor="amount">Price</label>
                <input
                    type="number"
                    name="price"
                    value={price || ''}
                    onChange={onHandleChange}
                    id="price"
                />
                <button>Save</button>

            </form>
        </section>
    )

}