function NewCat(props) {
    return (
        <div className="add-new-cat-wrapper">
            <div className="container">
                <button className="close-btn" onClick={props.closeNewCat}>X</button>     
                <h2>Add New Expense Category</h2>
                <div>
                    <input type="text" placeholder="Add new category" onChange={(event) => {
                    props.newCat(event.target.value)
                }} />
                    <button onClick={props.createNewCat}>Add New Category</button>
                </div>
            </div>
        </div>
    )
}

export  default NewCat;