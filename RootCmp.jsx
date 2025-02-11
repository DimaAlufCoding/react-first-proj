const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM



import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"




export function App() {

    const [currPage, setCurrPage] = useState('home')

    function onSetPage(page) {
        setCurrPage(page)
    }

    return (
        <Router>
            <section className="app">

                <AppHeader onSetPage={onSetPage} />


                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/bookIndex" element={<BookIndex />} />
                    </Routes>
                </main>

            </section>
        </Router>
    )
}