import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"


const { useState } = React

export function App() {

    const [currPage, setCurrPage] = useState('home')

    function onSetPage(page) {
        setCurrPage(page)
    }

    return (
        <section className="app">

            <header className="app-header main-layout">
                <AppHeader onSetPage={onSetPage} />
            </header>

            <main className="main-layout">
                {currPage === 'home' && <Home />}
                {currPage === 'about' && <About />}
                {currPage === 'bookIndex' && <BookIndex />}
            </main>
            
        </section>
    )
}