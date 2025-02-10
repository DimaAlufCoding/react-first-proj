const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange({ target }) {
        console.log('target:', target)
		const field = target.name
		const value = target.type === 'number' ? +target.value : target.value
		setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
	}

    const { title, amount } = filterByToEdit


    function onSubmitForm(ev) {
        ev.preventDefault();
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="book-filter">
            <h2>Filter Book</h2>

            <form onSubmit={onSubmitForm}>
                <label htmlFor="txt">Book Name</label>
                <input 
                    name="title" 
                    value={title || ''} 
                    onChange={onHandleChange} 
                    type="text" 
                    id="txt" 
                />

                <label htmlFor="num">Price</label>
                <input 
                    name="price" 
                    value={amount || ''} 
                    onChange={onHandleChange} 
                    type="number" 
                    id="num" 
                />

                <button>Submit</button>
            </form>
        </section>
    )
}
