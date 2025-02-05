export function AppHeader({ onSetPage }) {
    return (
        <header className="app-header main-layout">
            <h1>My App</h1>
            <nav>
                <button onClick={() => onSetPage('home')}>Home</button>
                <button onClick={() => onSetPage('about')}>About</button>
                <button onClick={() => onSetPage('bookIndex')}>Books</button>
            </nav>
        </header>
    )
}