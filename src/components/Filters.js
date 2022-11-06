function Filters(props) {

    return (
        <div>
           <select onChange={(e) => {props.setFilterName(e.target.value)}}>      
                <option value=''>Select Category</option>
                {props.categories.map((el) => {
                return(
                <option value={el.cat_name}>{el.cat_name}</option>
                )
                })}
            </select>

            <select onChange={(e) => {props.setMonthFilterName(e.target.value)}}>      
                <option value=''>Select Month</option>
                {props.monthly.map((el) => {
                return(
                <option value={el.month}>{el.month}</option>
                )
                })}
            </select>
        </div>
    )
}

export default Filters;