import { bookService } from "../services/book.service.js"
import { GoogleBooksList } from "./GoogleBooksList.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service.js"
import { debounce } from "../services/util.service.js";


const { useState, useRef, useEffect } = React
const { useNavigate } = ReactRouter

export function AddGoogleBook() {
    const [search, setSearch] = useState('')
    const [googleBookList, setGoogleBooksList] = useState([])
    console.log('googleBookList:', googleBookList)

    const navigate = useNavigate()
    const searchBooksDebounce = useRef(debounce(searchBooks, 1500))

    useEffect(() => {
        searchBooksDebounce.current(search)
    }, [search])

    function handleSearch({ target }) {
        setSearch(target.value)
    }

    function searchBooks(search) {
        bookService.getGoogleBooks(search)
            .then(books => setGoogleBooksList(books))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        searchBooks(search)
    }

    function onSave(book) {
        bookService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/bookIndex'))
    }

    return (
        <div className='book-search'>
            <div className='add-book-title'>
                <form onSubmit={onSubmitForm}>
                    <label htmlFor="add-book" className='bold-txt'>Google Search: </label>
                    <input value={search} onChange={handleSearch} type="text" name='title' placeholder='Insert book name' id="add-book" />
                    <button>Search</button>
                </form>
            </div>
            {googleBookList && <GoogleBooksList booksList={googleBookList} onSave={onSave} />}
        </div>
    )
}