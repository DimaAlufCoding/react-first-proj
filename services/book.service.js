import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'


const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    getById,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (!filterBy) return books
            const { title, maxPrice } = filterBy
            return books.filter(book => {
                return book.title.includes(title) && book.listPrice.amount < maxPrice
            })
        })
}

function getById(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    return book._id ? storageService.put(BOOK_KEY, book) : storageService.post(BOOK_KEY, book)
}

function getEmptyBook(title = '', amount = 0) {
    return {
        title,
        listPrice: {
            amount ,
            currencyCode: 'USD',
            isOnSale: false
        },
    }
}

function getDefaultFilter() {
    return {
        title: '',
        maxPrice: Infinity
    }
}

function _createBooks(){
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Harry Potter', 20),
            _createBook('The Hobbit', 15),
            _createBook('The Lord of the Rings', 25),
            _createBook('The Alchemist', 10),
            _createBook('The Little Prince', 5),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}


function _createBook(title, amount) {
    return {
        _id: makeId(),
        title,
        listPrice: {
            amount,
            currencyCode: 'USD',
            isOnSale: false
        },
    }
}